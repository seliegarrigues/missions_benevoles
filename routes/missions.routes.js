import express from "express";
import MissionServiceController from "../controllers/missions.controller.js";

const router = express.Router();
const missionServiceController = new MissionServiceController();

router.get("/", missionServiceController.getMissions);
router.get("/:id", missionServiceController.getMissionsById);

router.post("/", missionServiceController.createMission);
router.put("/:id", missionServiceController.updateMissionById);
router.delete("/:id", missionServiceController.deleteMissionById);

export default router;
