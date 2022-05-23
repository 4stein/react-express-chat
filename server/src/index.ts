import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import {
  UserController,
  DialogsController,
  MessagesController,
} from "./controllers";

const app = express();
const port = 9999;

// parse application/json
app.use(bodyParser.json());
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
// Dialogs
app.get("/dialogs", Dialogs.index);
app.delete("/dialogs/:id", Dialogs.delete);
app.post("/dialogs", Dialogs.create);
// Messages
app.get("/messages/:id", Messages.index);
app.post("/messages", Messages.create);
app.delete("/messages/:id", Messages.delete);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
