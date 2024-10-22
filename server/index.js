import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./routes/route.js";
import { initDatabaseConnection } from "./config/database.config.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
route(app);
const PORT = process.env.PORT || 6969;

initDatabaseConnection();
app.listen(PORT, console.log(`Server is running on Port: ${PORT}`));
export default app;
