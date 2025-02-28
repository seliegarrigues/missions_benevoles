import CandidaturesRepository from "../repositories/candidatures.repository.js";

const getCandidatures = async (req, res) => {
  try {
    const candidaturesRepository = new CandidaturesRepository();

    const candidatures = await candidaturesRepository.getCandidatures();

    res.json({
      message: "Bravo! vous pouvez consulter les éléments demandés",
      candidatures,
    });
  } catch (error) {
    const message = `Erreur dans getCandidatures du controller : ${error.message}`;
    console.error(message);

    res.status(500).json({ error: message });
  }
};

const getCandidatureById = async (req, res) => {
  const { id } = req.params;

  try {
    const candidaturesRepository = new CandidaturesRepository();

    const candidatureById = await candidaturesRepository.getCandidatureById(id);

    res.status(200).json({
      message: "Bravo! voici l'élément demandé",
      candidatureById,
    });
  } catch (error) {
    const message = `Navré! il y a un souci dans  getCandidatureByID du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};

const createCandidature = async (req, res) => {
  const { id_miss, id_util, date_cand } = req.body;

  try {
    const candidaturesRepository = new CandidaturesRepository();
    const paramCandidature = await candidaturesRepository.createCandidature(
      id_miss,
      id_util,
      date_cand
    );
    res.status(200).json({
      message: "Bravo! la candidature a été correctement crée",
      paramCandidature,
    });
  } catch (error) {
    const message = `Navré! il y a un souci dans createCandidature du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};

const updateCandidatureById = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const candidaturesRepository = new CandidaturesRepository();
    const updateCandidature =
      await candidaturesRepository.updateCandidatureById(id, status);
    if (updateCandidature) {
      res.status(200).json({
        message: "Bravo! la candidature a bien été mis à jour.",
      });
    }
  } catch (error) {
    const message = `Navré! il y a un souci dans updateCandidature du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};
const deleteCandidatureById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidaturesRepository = new CandidaturesRepository();
    const deleteCandidature =
      await candidaturesRepository.deleteCandidatureById(id);
    res.status(200).json({
      message: "la suppression de la candidature est correctement effectuée",
    });
  } catch (error) {
    const message = `Navré! il y a un souci dans deleteCandidatureById du controller : ${error.message}`;
    console.error(message, deleteCandidature);
    res.status(500).json({ error: message });
  }
};
export {
  getCandidatures,
  getCandidatureById,
  createCandidature,
  updateCandidatureById,
  deleteCandidatureById,
};
