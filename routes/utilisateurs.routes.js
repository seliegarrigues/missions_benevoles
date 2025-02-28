import express from "express";
import {
  getUtilisateurs,
  getUtilisateurById,
} from "../controllers/utilisateurs.controller.js";

const router = express.Router();

router.get("/", getUtilisateurs);
router.get("/:id", getUtilisateurById);

export default router;
