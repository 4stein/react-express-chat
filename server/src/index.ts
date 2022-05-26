import express, { Express } from "express";
import "./core/db";
import dotenv from "dotenv";
import createRoutes from "./core/routes";
// App
const app: Express = express();
// http
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
dotenv.config();
// Routes
createRoutes(app);
// Socket
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("chat message", "test-test-test");
});
// Listen
http.listen(process.env.PORT, () => {
  console.log(`Server starts on: http://localhost:${process.env.PORT}`);
});
