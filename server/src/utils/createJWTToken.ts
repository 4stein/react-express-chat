import jwt from "jsonwebtoken";
import { reduce } from "lodash";
import { ILoginData } from "../types";

export default (user: ILoginData) => {
  let token = jwt.sign(
    {
      data: reduce<any>(user, (result: any, value: any, key: any) => {
        if (key !== "password") {
          result[key] = value;
        }
        return result;
      }),
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: "HS256",
    }
  );

  return token;
};
