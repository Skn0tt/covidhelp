import { RESTHandler } from "../../backend/handler";
import { basicAuth } from "../../backend/middlewares/basicAuth";

function generateRandomNumber() {
  return Math.random() * 100;
}

const randomAuth = basicAuth(async () => Math.random() > 0.5);

export default RESTHandler(randomAuth)({
  async get(req, res) {
    setTimeout(() => {
      res.status(200).send(generateRandomNumber());
    }, 1000);
  }
});
