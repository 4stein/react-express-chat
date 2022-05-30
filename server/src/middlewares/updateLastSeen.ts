import express from "express";
import { UserModel } from "../models";

export default (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user) {
    UserModel.updateOne(
      { _id: req.user._id },
      {
        $set: {
          last_seen: new Date(),
        },
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  next();
};
