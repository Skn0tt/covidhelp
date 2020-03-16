import { RESTHandler } from "./handler";

function generateRandomNumber() {
  return Math.random() * 100;
}

export default RESTHandler({

  async get(req, res) {
    setTimeout(() => {
      res.status(200).send(generateRandomNumber());
    }, 1000);
  }

});
