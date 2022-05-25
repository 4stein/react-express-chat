import express from "express";
import { IGetUserAuthInfoRequest } from "../types";
import { verifyJWTToken } from "../utils";

export default (
  req: IGetUserAuthInfoRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.path === "/user/login" || req.path === "/user/registration") {
    return next();
  }

  const token = req.headers.token;

  verifyJWTToken(token)
    .then((user: any): any => {
      req.user = user;
      next();
    })
    .catch((e): any => {
      console.log(e);
      res.status(403).json({ message: "invalid auth token provided" });
    });
};
