import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/route.js";
import cors from 'cors'
import { initDatabaseConnection } from "./config/database.config.js";
dotenv.config();

const app = express();
app.use(cors())
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "POST, GET, HEAD, UPDATE, PUT, DELETE",
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
//   );
//   next();
// });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
route(app);
const PORT = process.env.PORT || 6969;

initDatabaseConnection();
app.listen(PORT, console.log(`Server is running on Port: ${PORT}`));
export default app;
