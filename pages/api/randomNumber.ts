import { RESTHandler } from "../../backend/handler";
import { authentication } from "../../backend/middlewares/authentication";

function generateRandomNumber() {
  return Math.random() * 100;
}

export default RESTHandler(authentication)({
  async get(req, res) {
    setTimeout(() => {
      res.status(200).send(generateRandomNumber());
    }, 1000);
  }
});
