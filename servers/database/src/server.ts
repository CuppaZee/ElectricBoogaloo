import { encode } from "@msgpack/msgpack";
import Fastify from "fastify";
import FastifyCors from "fastify-cors";
// @ts-expect-error
import lzwCompress from "lzwcompress";
import requirements from "./requirements";
import translations from "./translations";
import types from "./types";
import fetch from "node-fetch";
const fastify = Fastify({ logger: true });
fastify.register(FastifyCors, { 
  origin: true,
})

const db = { ...types, requirements, version: Math.floor(Math.random() * 100000) + 1 };

if (process.env.NODE_ENV !== "development") {
  fetch("http://czimg/dbr").then(i => console.log('Images:', i.ok));
  fetch("http://cuppazee-server/dbr").then(i => console.log("Server:", i.ok));
}

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

fastify.get("/translations/:lang", async function (request, reply) {
  const lang = (request.params as any).lang;
  const t = translations[lang];
  reply.send(t?.main);
  return;
})

const start = async () => {
  try {
    await fastify.listen(80, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
