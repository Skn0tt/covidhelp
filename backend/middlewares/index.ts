import { Handler } from "../handler";

export type Middleware = (next: Handler) => Handler;
