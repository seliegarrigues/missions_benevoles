import express from "express";
import {
  createCandidature,
  deleteCandidatureById,
  getCandidatureById,
  getCandidatures,
  updateCandidatureById,
} from "../controllers/candidatures.controller.js";
import { verifTypeUtilisateur } from "../middlewares/verifType.middleware.js";
import { authentificationByToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCandidatures);
router.get("/:id", getCandidatureById);

router.post("/", createCandidature);
router.put(
  "/:id",
  authentificationByToken,
  verifTypeUtilisateur(["associations"]),
  updateCandidatureById
);
router.delete("/:id", deleteCandidatureById);

export default router;
