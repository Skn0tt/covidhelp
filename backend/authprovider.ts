import { NextApiRequest } from "next";

const reqs = new Map<NextApiRequest, string>();

export const withAuthProvider = (req: NextApiRequest, userId: string) => async (
  cb: () => void | Promise<void>
) => {
  reqs.set(req, userId);
  await cb();
  reqs.delete(req);
};

export function getUserID(req: NextApiRequest) {
  return reqs.get(req);
}
