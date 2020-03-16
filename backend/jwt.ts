import * as jwt from "jsonwebtoken";
import { Config } from "./Config";

interface JWTPayload {
  uid: string;
}

export function issueJWTFor(userId: string): string {
  const payload: JWTPayload = {
    uid: userId
  };

  return jwt.sign(payload, Config.JWT_SECRET);
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, Config.JWT_SECRET) as JWTPayload;
  } catch (e) {
    return null;
  }
}
