import express from "express";
import {
  createCandidature,
  deleteCandidatureById,
  getCandidatureById,
  getCandidatures,
  updateCandidatureById,
} from "../controllers/candidatures.controller.js";

const router = express.Router();

router.get("/", getCandidatures);
router.get("/:id", getCandidatureById);

router.post("/", createCandidature);
router.put("/:id", updateCandidatureById);
router.delete("/:id", deleteCandidatureById);

export default router;
