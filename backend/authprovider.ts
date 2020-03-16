import { NextApiRequest } from "next";

const reqs = new Map<NextApiRequest, string>();

export const withAuthProvider = (req: NextApiRequest, userId: string) => async (
  cb: () => void | Promise<void>
) => {
  reqs.set(req, userId);
  await cb();
  reqs.delete(req);
};

export function useUserID(req: NextApiRequest) {
  const uid = reqs.get(req);

  if (!uid) {
    throw new Error("useUserID can only be used after authorization.");
  }

  return uid;
}
