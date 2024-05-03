import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import route from "./routes/route.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
route(app);
const server = http.createServer(app);
const PORT = process.env.PORT || 6969;
server.listen(PORT, console.log(`Server is running on Port: ${PORT}`));

try {
  const env = process.env.NODE_ENV || "development";
  // await mongoose.connect(env === "development" ? process.env.DATABASE_URL_DEV : process.env.DATABASE_URL);

  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database connection established sucessfull");
} catch (e) {
  console.log(e.message);
}
