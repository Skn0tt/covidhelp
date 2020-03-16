import { Handler } from "../handler";
import basicAuth from "basic-auth";
import { withAuthProvider } from "../authprovider";

export const authentication = <T>(next: Handler<T>): Handler => async (
  req,
  res
) => {
  const { name, pass } = basicAuth(req) || {};
  const isAuthenticated = name === "admin" && pass === "root";

  if (isAuthenticated) {
    await withAuthProvider(req, name!!)(() => next(req, res));
  } else {
    res.status(401).send("Not Authenticated");
  }
};
