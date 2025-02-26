import express, { Router } from "express";
import { getMissions } from "../controllers/missions.controller.js";

const router = express.Router();

router.get("/missions", getMissions);

export default router;
