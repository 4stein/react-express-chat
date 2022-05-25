import express from "express";
import bcrypt from "bcrypt";
import { validationResult, Result, ValidationError } from "express-validator";

import { UserModel } from "../models";
import { createJWTToken } from "../utils";
import { IUser } from "../types";

class UserController {
  index(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    UserModel.findById(id, (err: any, user: any) => {
      if (err) {
        return res.status(404).json({
          message: "Not found",
        });
      }
      res.json(user);
    });
  }
  // getMe() {}
  create(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    };
    const user = new UserModel(postData);
    user
      .save()
      .then((obj: any) => {
        res.json(obj);
      })
      .catch((reason: any) => res.json(reason));
  }
  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    UserModel.findByIdAndRemove(id, (err: any, user: any) => {
      if (err) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.json({
        message: `User ${user.fullname} deleted`,
      });
    });
  }
  login = (req: express.Request, res: express.Response): void => {
    const postData: { email: string; password: string } = {
      email: req.body.email,
      password: req.body.password,
    };

    const errors: Result<ValidationError> = validationResult(req);
    console.log(postData.password)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      UserModel.findOne({ email: postData.email }, (err, user: IUser) => {
        if (err || !user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
        if (bcrypt.compareSync(postData.password, user.password)) {
          
          const token = createJWTToken(user);
          res.json({
            status: "success",
            token,
          });
        } else {
          res.status(403).json({
            status: "error",
            message: "Incorrect password or email",
          });
        }
      });
    }
  };
}

export default UserController;
