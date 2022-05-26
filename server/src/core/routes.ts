import bodyParser from "body-parser";
import { RequestHandler } from "express";
import {
  DialogsController,
  MessagesController,
  UserController,
} from "../controllers";
import { checkAuth, updateLastSeen } from "../middlewares";
import { loginValidation } from "../utils/validations";

const createRoutes = (app) => {
  // parse application/json
  app.use(bodyParser.json());
  app.use(updateLastSeen);
  app.use(checkAuth as RequestHandler);

  // app.get("/", (req, res) => {
  //   res.sendFile(__dirname + "../index.html");
  // });
  // User
  app.get("/user/me", UserController.me);
  app.get("/user/:id", UserController.index);
  app.delete("/user/:id", UserController.delete);
  app.post("/user/registration", UserController.create);
  app.post("/user/login", loginValidation, UserController.login);
  // Dialogs
  app.get("/dialogs", DialogsController.index);
  app.delete("/dialogs/:id", DialogsController.delete);
  app.post("/dialogs", DialogsController.create);
  // Messages
  app.get("/messages/:id", MessagesController.index);
  app.post("/messages", MessagesController.create);
  app.delete("/messages/:id", MessagesController.delete);
};

export default createRoutes;
