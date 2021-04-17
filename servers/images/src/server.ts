import Fastify from "fastify";
import FastifyStatic from "fastify-static";
const fastify = Fastify({ logger: true });
import path from "path";
import Jimp from "jimp";

fastify.register(FastifyStatic, {
  root: path.join(__dirname, "../dist"),
});

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
  const format = params.type.split(".").slice(-1)[0];

  let image;

  // Get Image Normally
  try {
    if (!type.match(/[A-Z\s]/)) {
      image = await Jimp.read(
        `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(type)}.png`
      );
    }
  } catch (e) {}

  // Get Image without Spaces
  if (!image)
    try {
      image = await Jimp.read(
        `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(
          type.toLowerCase().replace(/\s/g, "")
        )}.png`
      );
    } catch (e) {}

  // Get Image with Underscores replacing Spaces
  if (!image)
    try {
      image = await Jimp.read(
        `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(
          type.toLowerCase().replace(/\s/g, "_")
        )}.png`
      );
    } catch (e) {}

  // Get "Missing" Image
  if (!image)
    try {
      image = await Jimp.read(path.join(__dirname, "../dist/missing.png"));
    } catch (e) {}
  image?.autocrop().contain(size, size);

  reply
    .headers({
      "Cache-Control": "public, max-age=43200, s-maxage=43200",
      "Access-Control-Allow-Origin": "*",
    })
    .type(format)
    .send(await image?.getBufferAsync(`image/${format}`));
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
