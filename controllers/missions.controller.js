import MissionsRepository from "../repositories/missions.repository.js";

const getMissions = async (req, res) => {
  try {
    const missionsRepository = new MissionsRepository();

    const missions = await missionsRepository.getMissions();

    res.json(`Bravo! vous pouvez consulter les éléments demandés`, {
      missions,
    });
  } catch (error) {
    const message = `Erreur dans getMissions du controller : ${error.message}`;
    console.error(message);

    res.status(500).json({ error: message });
  }
};

const getMissionsById = async (req, res) => {
  const { id_miss } = req.params;

  try {
    const missionsRepository = new MissionsRepository();

    const missionsById = await missionsRepository.getMissionsById(id_miss);

    res
      .status(200)
      .json(`Bravo! voici ce que vous avez demandé`, { missionsById });
  } catch (error) {
    const message = `Navré! il y a un souci dans  getMissionsByID du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};

const createMission = async (req, res) => {
  const { titre, description, date_debut } = req.body;

  try {
    const missionsRepository = new MissionsRepository();
    const paramMission = await missionsRepository.createMission(
      id_miss,
      titre,
      description,
      date_debut
    );
    res
      .status(200)
      .json(`Bravo! La mission a été correctement crée !`, { paramMission });
  } catch (error) {
    const message = `Navré! il y a un souci dans createMission du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};

const updateMissionById = async (req, res) => {
  const { titre, description, date_debut } = req.body;
  const { id_miss } = req.params;

  try {
    const missionsRepository = new MissionsRepository();
    const updateMission = await missionsRepository.updateMissionById(
      id_miss,
      titre,
      description,
      date_debut
    );
    if (updateMission) {
      res.status(200).json(` Bravo! la mission a été mis à jour correctement`);
    }
  } catch (error) {
    const message = `Navré! il y a un souci dans updateMission du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};
const deleteMissionById = async (req, res) => {
  const { id_miss } = req.params;
  try {
    const missionsRepository = new MissionsRepository();
    const deleteMission = await missionsRepository.deleteMissionById(id_miss);
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
