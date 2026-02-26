import Errors from "../libs/Error";
import { AUTH_TIMER } from "../libs/config";
import { Member } from "../libs/types/Member";
import jwt from "jsonwebtoken";
import { HttpCodes } from "../libs/Error";
import { Messages } from "../libs/Error";

class AuthService {
  constructor() {}

  public async createToken(payload: Member) {
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`;
      jwt.sign(
        payload,
        process.env.SECRET_TOKEN as string,
        {
          expiresIn: duration,
        },
        (err, token) => {
          if (err)
            reject(
              new Errors(HttpCodes.UNAUTHORIZED, Messages.TOKEN_CREATION_ERROR),
            );
          else resolve(token as string);
        },
      );
    });
  }
}

export default AuthService;
