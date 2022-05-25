import mongoose from "mongoose";
import express, { Express, RequestHandler } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {
  UserController,
  DialogsController,
  MessagesController,
} from "./controllers";
import { updateLastSeen } from "./middlewares";
import checkAuth from "./middlewares/checkAuth";
import { loginValidation } from "./utils/validations";
// App
const app: Express = express();
dotenv.config();
// parse application/json
app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth as RequestHandler);
// Controllers
const User = new UserController();
const Dialogs = new DialogsController();
const Messages = new MessagesController();
// db connect
mongoose.connect("mongodb://localhost:27017/chat");
// User
app.get("/user/:id", User.index);
app.delete("/user/:id", User.delete);
app.post("/user/registration", User.create);
app.post("/user/login", loginValidation, User.login);
// Dialogs
app.get("/dialogs", Dialogs.index);
app.delete("/dialogs/:id", Dialogs.delete);
app.post("/dialogs", Dialogs.create);
// Messages
app.get("/messages/:id", Messages.index);
app.post("/messages", Messages.create);
app.delete("/messages/:id", Messages.delete);
// Listen
app.listen(process.env.PORT, () => {
  console.log(`Server starts on: http://localhost:${process.env.PORT}`);
});
