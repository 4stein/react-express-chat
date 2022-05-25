import express from "express";
import { UserModel } from "../models";

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  UserModel.updateOne(
    { _id: "628a64d604fb2cc1ea05ceca" },
    {
      $set: {
        last_seen: new Date(),
      },
    },
    (err: any) => {
      console.log(err);
    }
  );
  next();
};
