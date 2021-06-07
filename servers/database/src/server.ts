import { encode } from "@msgpack/msgpack";
import Fastify from "fastify";
// @ts-expect-error
import lzwCompress from "lzwcompress";
import types from "./types";
const fastify = Fastify({ logger: true });

const db = { ...types };

fastify.get("/types/json", async function (request, reply) {
  return reply.send({...types});
});

fastify.get("/types/lzw", async function (request, reply) {
  return reply.send(lzwCompress.pack(db));
});

fastify.get("/types/msgpack", async function (request, reply) {
  return reply.send(Buffer.from(encode(JSON.parse(JSON.stringify(db)))));
});

fastify.get("/types/lzwmsgpack", async function (request, reply) {
  return reply.send(Buffer.from(encode(JSON.parse(lzwCompress.pack(db)))));
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
