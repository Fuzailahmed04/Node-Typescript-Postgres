import Fastify from "fastify";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
dotenv.config();
const fastify = Fastify({
  logger: true,
});
fastify.register(authRoutes);
fastify.get("/testing", async (request, reply) => {
  return { message: "Hello Sabahat" };
});
const PORT = process.env.PORT || 3000;
fastify.listen({ port: Number(PORT), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});