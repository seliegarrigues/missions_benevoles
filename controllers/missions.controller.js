import MissionsRepository from "../repositories/missions.repository";

const getMissions = async (req, res) => {
  try {
    const missionsRepository = new MissionsRepository();

    const missions = await missionsRepository.getMissions();

    res.json(missions);
  } catch (error) {
    const mess = `Erreur dans getMissions du controller : ${error.mess}`;
    console.error(mess);

    res.status(500).json({ error: mess });
  }
};

export { getMissions };
