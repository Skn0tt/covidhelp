import { Middleware } from ".";
import * as basic_auth from "basic-auth";
import { withAuthProvider } from "../authprovider";
import { verifyJWT } from "../jwt";
import { UserRepo } from "../db/User";
import { BCrypt } from "../BCrypt";

function getBearerToken(authorization: string): string | null {
  if (authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
}

function getBasicCredentials(
  authorization: string
): { name: string; pass: string } | null {
  return basic_auth.parse(authorization) ?? null;
}

async function checkJWT(jwt: string): Promise<string | null> {
  return verifyJWT(jwt)?.uid ?? null;
}

async function checkBasic(name: string, pass: string): Promise<string | null> {
  const user = await UserRepo.findByUsername(name);
  if (!user) {
    return null;
  }

  const { _id, passwordHash } = user;
  if (!passwordHash) {
    return null;
  }

  const isValid = await BCrypt.verify(pass, passwordHash);
  return isValid ? _id : null;
}

export const authenticate: Middleware = next => async (req, res) => {
  function forbid() {
    res.status(401).end("Please Authenticate.");
  }

  async function grant(userId: string) {
    await withAuthProvider(req, userId)(() => next(req, res));
  }

  const { authorization } = req.headers;
  if (!authorization) {
    return forbid();
  }

  let userId: string | null = null;

  const jwt = getBearerToken(authorization);
  if (!!jwt) {
    userId = await checkJWT(jwt);
  }

  const basic = getBasicCredentials(authorization);
  if (!!basic) {
    userId = await checkBasic(basic.name, basic.pass);
  }

  if (!!userId) {
    await grant(userId);
  }
};
