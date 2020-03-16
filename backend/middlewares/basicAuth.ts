import { Handler } from "../handler";
import basic_auth from "basic-auth";
import { withAuthProvider } from "../authprovider";

export const basicAuth = (
  authenticate: (name: string, pass: string) => Promise<boolean>
) => <T>(next: Handler<T>): Handler => async (req, res) => {
  const { name = "", pass = "" } = basic_auth(req) || {};
  const isAuthenticated = authenticate(name, pass);

  if (isAuthenticated) {
    await withAuthProvider(req, name!!)(() => next(req, res));
  } else {
    res.status(401).send("Not Authenticated");
  }
};
