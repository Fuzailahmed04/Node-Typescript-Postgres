import Fastify from "fastify";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.register(authRoutes);

const PORT = parseInt("3000", 10);
fastify.listen({ port: PORT }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server listening at http://localhost:${PORT}`);
});
