import MissionsRepository from "../repositories/missions.repository.js";
import ArgumentRequiredException from "../exceptions/argumentRequis.js";
// Si besoin, importe sanitizeHtml :
// import sanitizeHtml from "sanitize-html";

// ----- Classe interne Service -----
class MissionService {
  constructor() {
    this.missionsRepository = new MissionsRepository();
  }

  async getMissions() {
    return await this.missionsRepository.getMissions();
  }

  async getMissionById(id) {
    if (!id) throw new ArgumentRequiredException(400, "idMission Required");
    return await this.missionsRepository.getMissionsById(id);
  }

  async createMission(missionData) {
    // Optionnel : sanitiser la description si présente
    // if (missionData.description) {
    //   missionData.description = sanitizeHtml(missionData.description);
    // }
    return await this.missionsRepository.createMission(missionData);
  }

  async updateMission(id, missionData) {
    if (!id) throw new ArgumentRequiredException(400, "idMission Required");
    // Ici, on passe directement missionData. Adapte en fonction de la signature de updateMissionById.
    return await this.missionsRepository.updateMissionById(
      id,
      missionData.titre,
      missionData.description,
      missionData.date_debut
    );
  }

  async deleteMission(id) {
    if (!id) throw new ArgumentRequiredException(400, "idMission Required");
    return await this.missionsRepository.deleteMissionById(id);
  }
}

// ----- Classe Controller -----
class MissionController {
  constructor() {
    this.missionService = new MissionService();
    // On lie les méthodes pour préserver le contexte "this"
    this.getMissions = this.getMissions.bind(this);
    this.getMissionById = this.getMissionById.bind(this);
    this.createMission = this.createMission.bind(this);
    this.updateMissionById = this.updateMissionById.bind(this);
    this.deleteMissionById = this.deleteMissionById.bind(this);
  }

  async getMissions(req, res, next) {
    try {
      const missions = await this.missionService.getMissions();
      res.json({
        message: "Bravo! vous pouvez consulter les éléments demandés",
        missions,
      });
    } catch (error) {
      console.error("Erreur dans getMissions :", error);
      next(error);
    }
  }

  async getMissionById(req, res, next) {
    try {
      const { id } = req.params;
      const mission = await this.missionService.getMissionById(id);
      res.status(200).json({
        message: "Bravo! vous pouvez consulter l'élément demandé",
        mission,
      });
    } catch (error) {
      console.error("Erreur dans getMissionById :", error);
      next(error);
    }
  }

  async createMission(req, res, next) {
    try {
      // Optionnel : si tu veux sanitiser la description, décommente les lignes ci-dessous
      // if (req.body.description) {
      //   req.body.description = sanitizeHtml(req.body.description);
      // }
      const mission = await this.missionService.createMission(req.body);
      res.status(201).json({
        message: "Bravo! mission correctement créée",
        mission,
      });
    } catch (err) {
      console.error("Erreur dans createMission :", err);
      next(err);
    }
  }

  async updateMissionById(req, res, next) {
    try {
      const { id } = req.params;
      const missionData = req.body;
      await this.missionService.updateMission(id, missionData);
      res.status(200).json({ message: "Mission modifiée avec succès" });
    } catch (err) {
      console.error("Erreur dans updateMissionById :", err);
      next(err);
    }
  }

  async deleteMissionById(req, res, next) {
    try {
      const { id } = req.params;
      await this.missionService.deleteMission(id);
      res.status(200).json({ message: "Mission supprimée avec succès" });
    } catch (err) {
      console.error("Erreur dans deleteMissionById :", err);
      next(err);
    }
  }
}

export default MissionController;
