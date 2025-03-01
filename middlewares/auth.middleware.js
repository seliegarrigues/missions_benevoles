import jwt from "jsonwebtoken";
import "dotenv/config";

export function authentificationByToken(req, res, next) {
  const jwtToken = req.cookies.cookieToken;
  if (!jwtToken) {
    return res
      .status(401)
      .json({
        message: `vous n'avez pas d'accès car nous ne pouvons pas vous authentitfé`,
      });
  }
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: `le jeton n'est pas valable` });
    req.user = user;
    next();
  });
}

export function autorisation(req, res, next) {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: `cet utilisateur n'a pas d'autorisation` });
  }
  next();
}
