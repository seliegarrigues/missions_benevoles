import express from "express";
import {
  createMission,
  deleteMissionById,
  getMissions,
  getMissionsById,
  updateMissionById,
} from "../controllers/missions.controller.js";

const router = express.Router();

router.get("/", getMissions);
router.get("/:id", getMissionsById);

router.post("/", createMission);
router.put("/:id", updateMissionById);
router.delete("/:id", deleteMissionById);

export default router;
