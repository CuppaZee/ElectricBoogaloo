import Fastify from "fastify";
import FastifyStatic from "fastify-static";
const fastify = Fastify({ logger: true });
import path from "path";
import sharp from "sharp";
import fetch from "node-fetch";

fastify.register(FastifyStatic, {
  root: path.join(__dirname, "../dist"),
});

async function getImage(urls: string[]) {
  for (var url of urls) {
    const response = await fetch(url);
    if (response.ok) {
      return response;
    }
  }
  return null;
}

type Format = "png" | "jpeg";

fastify.get("/types/:size/:type", async function (request, reply) {
  const params = request.params as {
    size: string;
    type: string;
  };
  const size = Number(params.size);
  if (size > 512 || size <= 0) {
    reply.send(`Invalid Size: ${size}. Size >0, <=512`);
    return;
  }
  const type = params.type.split(".").slice(0, -1).join(".");
  const format = params.type.split(".").slice(-1)[0] as Format;
  if (format !== "jpeg" && format !== "png") {
    reply.send(`Invalid Size: ${size}. Size >0, <=512`);
    return;
  }

  const urls: string[] = [
    !type.match(/[A-Z\s]/) && `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(type)}.png`,
    !type.match(/[A-Z\s]/) && `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(type.toLowerCase().replace(/\s/g, ""))}.png`,
    !type.match(/[A-Z\s]/) && `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(type.toLowerCase().replace(/\s/g, "_"))}.png`,
  ].filter(Boolean).filter((v,i,a) => a.indexOf(v) === i) as string[];

  const response = await getImage(urls);

  if (response) {
    const transformer = sharp()
      .resize(size)
      [format]();
    reply
      .headers({
        "Cache-Control": "public, max-age=43200, s-maxage=43200",
        "Access-Control-Allow-Origin": "*",
      })
      .type(`image/${format}`)
      .send(response.body.pipe(transformer));
    return;
  }

  reply.sendFile(path.join(__dirname, "../dist/missing.png"))
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
