import express from "express";
import bodyParser from "body-parser";
import path from "path";
import io from "socket.io";
import cors from "cors";
import { RequestHandler } from "express";
import { Dialogs, Messages, User, UploadFile } from "../controllers";
import { checkAuth, updateLastSeen } from "../middlewares";
import { loginValidation } from "../utils/validations";
import uploader from "./multer";

const createRoutes = (app, io: io.Socket) => {
  // parse application/json
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );
  app.use(checkAuth as RequestHandler);
  app.use(updateLastSeen);
  // Controller
  const UserController = new User(io);
  const DialogsController = new Dialogs(io);
  const MessagesController = new Messages(io);
  const UploadFileController = new UploadFile();
  // Routes
  app.use(express.static(path.join(__dirname + "/")));
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
  });
  // User
  app.get("/user/me", UserController.me);
  app.get("/user/find", UserController.findUsers);
  app.get("/user/:id", UserController.index);
  app.delete("/user/:id", UserController.delete);
  app.post("/user/registration", UserController.create);
  // app.get("/user/registration/verify", UserController.verify);
  app.post("/user/login", loginValidation, UserController.login);
  // Dialogs
  app.get("/dialogs", DialogsController.index);
  app.delete("/dialogs/:id", DialogsController.delete);
  app.post("/dialogs", DialogsController.create);
  // Messages
  app.get("/messages/:id", MessagesController.index);
  app.post("/messages", MessagesController.create);
  app.delete("/messages/:id", MessagesController.delete);
  // Files
  app.post("/files", uploader.single("file"), UploadFileController.create);
  app.delete("/files/:id", UploadFileController.delete);
};

export default createRoutes;
