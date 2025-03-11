import express from "express";
import candidaturesController from "../controllers/candidatures.controller.js";
import { verifTypeUtilisateur } from "../middlewares/verifType.middleware.js";
import { authentificationByToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", candidaturesController.getCandidatures);
router.get("/:id", candidaturesController.getCandidatureById);

router.post("/", candidaturesController.createCandidature);
router.put(
  "/:id",
  authentificationByToken,
  verifTypeUtilisateur,
  candidaturesController.updateCandidatureById
);
router.delete("/:id", candidaturesController.deleteCandidatureById);

export default router;
