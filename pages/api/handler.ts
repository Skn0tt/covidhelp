import { NextApiRequest, NextApiResponse } from "next";

type Handler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>) => void | Promise<void>;

interface Handlers {
  get?: Handler;
  head?: Handler;
  post?: Handler;
  put?: Handler;
  delete?: Handler;
}

export const RESTHandler =
  (handlers: Handlers) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const handler = handlers[method.toLowerCase()] as Handler | undefined;
    
    if (handler) {
      await Promise.resolve(handler(req, res));
    } else {
      res.status(404).send("Not Found");
    }
  }