import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export let secret;

if (!secret) {
  secret = uuidv4();
}

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
