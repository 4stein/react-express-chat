import jwt from "jsonwebtoken";

export default (token: any): any =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET || "", (err: any, decodeData) => {
      if (err || !decodeData) {
        return reject(err);
      }
      resolve(decodeData);
    });
  });
