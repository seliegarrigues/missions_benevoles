import express from "express";
import OrganizationServiceController from "../controllers/organizationServiceController.js";

const router = express.Router();
const organizationController = new OrganizationServiceController();

// Route simple pour créer une organisation avec un admin
router.post("/create", (req, res, next) => {
  organizationController.createOrganizationWithAdmin(req, res, next);
});

export default router;
