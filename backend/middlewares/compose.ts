import { Middleware } from ".";
import { Handler } from "../handler";

export const compose = (...middlewares: Middleware[]): Middleware => (
  next: Handler
): Handler => async (req, res) => {
  if (middlewares.length === 0) {
    return next(req, res);
  }

  const [head, ...tail] = middlewares;
  const handler = head(compose(...tail)(next));
  return handler(req, res);
};
