import express from "express";
import {
  inscription,
  connexion,
  deconnexion,
  profil,
} from "../controllers/auth.controller.js";
import { authSchema, utilisateurSchema } from "../validator.js";
import validate from "../validate.js";
import { authentificationByToken } from "../middlewares/auth.middleware.js";
import autorisation from "../middlewares/authorizationMiddleware.js";
import { suppressionReponseUtilisateur } from "../middlewares/reponseUtilisateurMiddleware.js";

const router = express.Router();

router.post("/inscription", validate(utilisateurSchema), (req, res, next) =>
  inscription(req, res, next)
);
router.post("/connexion", validate(authSchema), (req, res, next) =>
  connexion(req, res, next)
);
router.post("/deconnexion", authentificationByToken, (req, res, next) =>
  deconnexion(req, res, next)
);
router.get(
  "/profil",
  authentificationByToken,
  autorisation,
  suppressionReponseUtilisateur,
  (req, res, next) => profil(req, res, next)
);

export default router;
