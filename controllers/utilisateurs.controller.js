import UtilisateursRepository from "../repositories/utilisateurs.repository.js";

const getUtilisateurs = async (req, res, next) => {
  try {
    const utilisateursRepository = new UtilisateursRepository();

    const utilisateurs = await utilisateursRepository.getUtilisateurs();

    res.json({
      message: "Bravo! vous pouvez consulter les éléments demandés",
      utilisateurs,
    });
  } catch (error) {
    console.error("Erreur dans getUtilisateurs :", error);

    next(error);
  }
};

const getUtilisateurById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const utilisateursRepository = new UtilisateursRepository();

    const utilisateurById = await utilisateursRepository.getUtilisateurById(id);

    res.status(200).json({
      message: "Bravo! vous pouvez consulter l'élément demandé'",
      utilisateurById,
    });
  } catch (error) {
    console.error("Erreur dans getUtilisateurById :", error);
    next(error);
  }
};

export { getUtilisateurs, getUtilisateurById };
