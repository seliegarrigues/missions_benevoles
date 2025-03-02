import CandidaturesRepository from "../repositories/candidatures.repository.js";

const getCandidatures = async (req, res, next) => {
  try {
    const candidaturesRepository = new CandidaturesRepository();

    const candidatures = await candidaturesRepository.getCandidatures();

    res.json({
      message: "Bravo! vous pouvez consulter les éléments demandés",
      candidatures,
    });
  } catch (error) {
    console.error("Erreur dans getCandidatures:", error);
    next(error);
  }
};

const getCandidatureById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const candidaturesRepository = new CandidaturesRepository();

    const candidatureById = await candidaturesRepository.getCandidatureById(id);

    res.status(200).json({
      message: "Bravo! voici l'élément demandé",
      candidatureById,
    });
  } catch (error) {
    console.error("Erreur dans getCandidatureById :", error);
    next(error);
  }
};

const createCandidature = async (req, res, next) => {
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
    console.error("Errreur dans createCandidature :", error);
    next(error);
  }
};

const updateCandidatureById = async (req, res, next) => {
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
    console.error("Erreur dans updateCandidatureById :", error);
    next(error);
  }
};
const deleteCandidatureById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const candidaturesRepository = new CandidaturesRepository();

    await candidaturesRepository.deleteCandidatureById(id);
    res.status(200).json({
      message: "la suppression de la candidature est correctement effectuée",
    });
  } catch (error) {
    console.error("Erreur dans deleteCandidatureById :", error);
    next(error);
  }
};
export {
  getCandidatures,
  getCandidatureById,
  createCandidature,
  updateCandidatureById,
  deleteCandidatureById,
};
