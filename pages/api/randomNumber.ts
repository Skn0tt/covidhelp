import { NextApiRequest, NextApiResponse } from "next";

function generateRandomNumber() {
  return Math.random() * 100;
}

export default (req: NextApiRequest, res: NextApiResponse<number>) => {
  setTimeout(() => {
    res.status(200).send(generateRandomNumber());
  }, 1000);

}