import express, { Express } from "express";
import connectDB from "./core/db";
import dotenv from "dotenv";
import createRoutes from "./core/routes";
import createSocket from "./core/socket";

// App
const app: Express = express();
// http
const http = require("http").createServer(app);
// Socket
const io = createSocket(http);
dotenv.config();
// Connect DB
connectDB();
// Routes
createRoutes(app, io);

// Listen
http.listen(process.env.PORT, () => {
  console.log(`Server starts on: http://localhost:${process.env.PORT}`);
});
