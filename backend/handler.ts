import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "./middlewares";
import { compose } from "./middlewares/compose";

export type Handler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => void | Promise<void>;

export const RESTHandler = (...middlewares: Middleware[]) => (
  methodHandlers: Partial<Record<string, Handler>>
) =>
  compose(...middlewares)(async (req, res) => {
    const { method = "" } = req;
    const handler = methodHandlers[method.toLowerCase()];

    if (handler) {
      await handler(req, res);
    } else {
      res.status(404).send("Not Found");
    }
  });
