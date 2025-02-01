import express from "express";
import pkg from "body-parser";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import karyawanRoutes from "./routes/karyawanRoutes.js";
import indexRoutes from "./routes/index.js";
import 'dotenv/config.js';

const { json } = pkg;
const app = express();
app.use(json());

app.use('/', indexRoutes);
app.use("/auth", authRoutes);
app.use("/karyawan", karyawanRoutes);

try {
  await sequelize.authenticate();
  console.log('DB connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

sequelize.sync().then(() => {
  app.listen(process.env.SERVER_PORT, () => console.log("Server running on http://localhost:" + process.env.SERVER_PORT));
});
