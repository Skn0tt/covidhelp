import { RESTHandler } from "../../backend/handler";
import { authenticate } from "../../backend/middlewares/authenticate";
import { useUserID } from "../../backend/authprovider";
import { issueJWTFor } from "../../backend/jwt";

export default RESTHandler(authenticate)({
  async get(req, res) {
    const userId = useUserID(req);
    const token = issueJWTFor(userId);
    res.status(200).send(token);
  }
});
