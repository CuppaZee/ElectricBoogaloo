import { encode } from "@msgpack/msgpack";
import Fastify from "fastify";
import FastifyCors from "fastify-cors";
// @ts-expect-error
import lzwCompress from "lzwcompress";
import types from "./types";
const fastify = Fastify({ logger: true });
fastify.register(FastifyCors, { 
  origin: true,
})

const db = { ...types, version: Math.floor(Math.random() * 100000) };

fastify.get("/json/:version", async function (request, reply) {
  if (Number((request.params as any)?.version) === db.version) {
    reply.send();
    return;
  }
  reply.send({...types});
});

fastify.get("/lzw/:version", async function (request, reply) {
  if (Number((request.params as any)?.version) === db.version) {
    reply.send();
    return;
  }
  return reply.send(lzwCompress.pack(db));
});

fastify.get("/msgpack/:version", async function (request, reply) {
  if (Number((request.params as any)?.version) === db.version) {
    reply.send();
    return;
  }
  return reply.send(Buffer.from(encode(JSON.parse(JSON.stringify(db)))));
});

fastify.get("/lzwmsgpack/:version", async function (request, reply) {
  if (Number((request.params as any)?.version) === db.version) {
    reply.send();
    return;
  }
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
