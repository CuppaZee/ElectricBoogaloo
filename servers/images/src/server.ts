import Fastify from "fastify";
const fastify = Fastify({ logger: true });
import path from "path";
import sharp from "sharp";
import fetch from "node-fetch";
import { createReadStream, createWriteStream, promises, existsSync, mkdirSync } from "fs";
import types from "@cuppazee/types";

const overrideDir = path.join(__dirname, "../override");
const cacheDir = path.join(__dirname, "../cache");
const cacheHeaders = {
  "Cache-Control": "public, max-age=43200, s-maxage=43200",
  "Access-Control-Allow-Origin": "*",
};

if (!existsSync(cacheDir)) mkdirSync(cacheDir);

async function getImage(type: string) {
  const urls: string[] = [
    !type.match(/[A-Z\s]/) &&
      `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(type)}.png`,
    `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(
      type.toLowerCase().replace(/\s/g, "")
    )}.png`,
    `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(
      type.toLowerCase().replace(/\s/g, "_")
    )}.png`,
  ]
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i) as string[];
  
  try {
    await promises.access(path.join(overrideDir, type + ".png"));
    return createReadStream(path.join(overrideDir, type + ".png"));
  } catch (e) {}

  for (var url of urls) {
    const response = await fetch(url);
    if (response.ok) {
      return response.body;
    }
  }
  return null;
}

type Format = "png" | "jpeg";

fastify.get("/types/:size/:type", async function (request, reply) {
  // Parse and Validate Parameters
  const params = request.params as {
    size: string;
    type: string;
  };
  const size = Number(params.size);
  if (size > 512 || size <= 0) {
    reply.send(`Invalid Size: ${size}. Size >0, <=512`);
    return;
  }
  let type = params.type.split(".").slice(0, -1).join(".");
  type = types.getType(type)?.icon ?? type;
  const format = params.type.split(".").slice(-1)[0] as Format;
  if (format !== "jpeg" && format !== "png") {
    reply.send(`Invalid Format: ${format}. Must be jpeg or png.`);
    return;
  }

  const cacheFilePath = path.join(cacheDir, `${size.toString()}_${type}.${format}`);

  try {
    // Already Cached
    await promises.access(cacheFilePath);
    reply.headers(cacheHeaders).type(`image/${format}`).send(createReadStream(cacheFilePath));
    return;
  } catch (e) {}

  const response = await getImage(type);

  if (!response) {
    // No Image Found
    reply
      .headers(cacheHeaders)
      .type(`image/png`)
      .send(createReadStream(path.join(overrideDir, "missing.png")));
    return;
  }

  // Image Found
  const transformer = sharp().resize(size)[format]();
  const stream = response.pipe(transformer);
  stream.clone().pipe(createWriteStream(cacheFilePath));
  reply.headers(cacheHeaders).type(`image/${format}`).send(stream);
});

const start = async () => {
  try {
    await fastify.listen(80, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
