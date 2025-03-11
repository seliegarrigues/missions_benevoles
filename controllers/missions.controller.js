import MissionsRepository from "../repositories/missions.repository.js";

class MissionServiceController {
  getMissions = async (req, res, next) => {
    try {
      const missionsRepository = new MissionsRepository();

      const missions = await missionsRepository.getMissions();

      res.json({
        message: "Bravo! vous pouvez consulter les éléments demandés",
        missions,
      });
    } catch (error) {
      console.error("Erreur dans getMissions :", error);

      next(error);
    }
  };

  getMissionsById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const missionsRepository = new MissionsRepository();

      const missionsById = await missionsRepository.getMissionsById(id);

      res.status(200).json({
        message: "Bravo! vous pouvez consulter l'element demandé'",
        missionsById,
      });
    } catch (error) {
      console.error("Erreur dans getMissionsById :", error);
      next(error);
    }
  };

  createMission = async (req, res, next) => {
    const { titre, description, id_util, date_debut } = req.body;

    try {
      const missionsRepository = new MissionsRepository();
      const paramMission = await missionsRepository.createMission(
        titre,
        description,
        id_util,
        date_debut
      );
      res.status(200).json({
        message: "Bravo! mission correctement crée",
        paramMission,
      });
    } catch (error) {
      console.error("Erreur dans createMission :", error);
      next(error);
    }
  };

  updateMissionById = async (req, res, next) => {
    const { titre, description, date_debut } = req.body;
    const { id } = req.params;

    try {
      const missionsRepository = new MissionsRepository();
      const updateMission = await missionsRepository.updateMissionById(
        id,
        titre,
        description,
        date_debut
      );
      if (updateMission) {
        res.status(200).json({
          message: "Bravo!  mis à jour de la mission effectuée",
        });
      }
    } catch (error) {
      console.error("Erreur dans updateMissionById :", error);
      next(error);
    }
  };
  deleteMissionById = async (req, res) => {
    const { id } = req.params;
    try {
      const missionsRepository = new MissionsRepository();
      await missionsRepository.deleteMissionById(id);
      res.status(200).json({
        message: "la suppression de la mission est correctement effectuée",
      });
    } catch (error) {
      console.error("Erreur dans deleteMissionById :", error);
      next(error);
    }
  };
}
export default MissionServiceController;
