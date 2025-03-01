import express from "express";
import {
  inscription,
  connexion,
  deconnexion,
  profil,
} from "../controllers/auth.controller.js";
import {
  authentificationByToken,
  autorisation,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/inscription", inscription);
router.post("/connexion", connexion);
router.post("/deconnexion", deconnexion);
router.get("/profil", authentificationByToken, autorisation, profil);

export default router;
