import express from "express";
import MissionController from "../controllers/missions.controller.js";

const router = express.Router();
const missionController = new MissionController();

router.get("/", missionController.getMissions);
router.get("/:id", missionController.getMissionById);

router.post("/", missionController.createMission);
router.put("/:id", missionController.updateMissionById);
router.delete("/:id", missionController.deleteMissionById);

export default router;
