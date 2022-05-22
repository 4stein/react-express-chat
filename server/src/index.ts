import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import { UserController } from "./controllers";

const app = express();
const port = 9999;

// parse application/json
app.use(bodyParser.json());

const User = new UserController();

mongoose.connect("mongodb://localhost:27017/chat");

app.get("/user/:id", User.index);
app.delete("/user/:id", User.delete);
app.post("/user/registration", User.create);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
