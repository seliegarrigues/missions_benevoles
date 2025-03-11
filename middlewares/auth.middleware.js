import jwt from "jsonwebtoken";
import "dotenv/config";
import { userService } from "../instanciation.js";

async function authentificationByToken(req, res, next) {
  const jwtToken = req.cookies.cookieToken;
  if (!jwtToken) {
    return res.status(401).json({
      message:
        "vous n'avez pas d'accès car nous ne pouvons pas vous authentifier",
    });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const user = await userService.findById(decoded.id);
    console.info("user", user);
    if (!user) {
      return res.status(401).json("authentification échouée");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json("authentication failed");
  }
}

export { authentificationByToken };
