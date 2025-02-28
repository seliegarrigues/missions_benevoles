import MissionsRepository from "../repositories/missions.repository.js";

const getMissions = async (req, res) => {
  try {
    const missionsRepository = new MissionsRepository();

    const missions = await missionsRepository.getMissions();

    res.json({
      message: "Bravo! vous pouvez consulter les éléments demandés",
      missions,
    });
  } catch (error) {
    const message = `Erreur dans getMissions du controller : ${error.message}`;
    console.error(message);

    res.status(500).json({ error: message });
  }
};

const getMissionsById = async (req, res) => {
  const { id } = req.params;

  try {
    const missionsRepository = new MissionsRepository();

    const missionsById = await missionsRepository.getMissionsById(id);

    res.status(200).json({
      message: "Bravo! vous pouvez consulter l'element demandé'",
      missionsById,
    });
  } catch (error) {
    const message = `Navré! il y a un souci dans  getMissionsByID du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};

const createMission = async (req, res) => {
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
    const message = `Navré! il y a un souci dans createMission du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};

const updateMissionById = async (req, res) => {
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
    const message = `Navré! il y a un souci dans updateMission du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};
const deleteMissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const missionsRepository = new MissionsRepository();
    const deleteMission = await missionsRepository.deleteMissionById(id);
    res.status(200).json({
      message: "la suppression de la mission est correctement effectuée",
    });
  } catch (error) {
    const message = `Navré! il y a un souci dans deleteMissionById du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};
export {
  getMissions,
  getMissionsById,
  createMission,
  updateMissionById,
  deleteMissionById,
};
