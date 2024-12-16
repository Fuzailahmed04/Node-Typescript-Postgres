// import { Sequelize, Op } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();
// console.log(process.env.DATABASE_NAME);

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME || "postgres",
//   process.env.DATABASE_USER || "admin",
//   process.env.DATABASE_PASS || "postgres",
//   {
//     host: "bill-payment-db",
//     dialect: "postgres",
//   }
// );

// async function connectToDB() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connected to PostgreSQL successfully!");
//   } catch (error: any) {
//     console.error(
//       "Unable to connect to the database:",
//       error.message || error.stack
//     );
//     process.exit(1);
//   }
// }

// connectToDB();

// export { sequelize, Op };
