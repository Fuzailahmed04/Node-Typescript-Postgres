import Fastify from "fastify";
import authRoutes from "./routes/authRoutes";

const fastify = Fastify({
  logger: true,
});

fastify.register(authRoutes);

fastify.get("/testing", async (request: any, reply: any) => {
  return { message: "Hello Sabahat" };
});

fastify.listen({ port: 4001, host: "0.0.0.0" }, (err: any, address: any) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});
