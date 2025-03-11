import UtilisateursRepository from "../repositories/utilisateurs.repository.js";
import ExceptionUtilisateurInexistant from "../exceptions/exceptionUtilisiteurInexistant.js";

const utilisateursRepository = new UtilisateursRepository();

export const getUtilisateurs = async (req, res, next) => {
  try {
    const utilisateurs = await utilisateursRepository.getUtilisateurs();
    res.json({
      message: "Liste des utilisateurs",
      utilisateurs,
    });
  } catch (error) {
    console.error("Erreur dans getUtilisateurs :", error);
    next(error);
  }
};

export const getUtilisateurById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const utilisateur = await utilisateursRepository.getUtilisateurById(id);
    if (!utilisateur) {
      throw new ExceptionUtilisateurInexistant(404, "Utilisateur non trouvé");
    }
    res.status(200).json({
      message: "Détails de l'utilisateur",
      utilisateur,
    });
  } catch (error) {
    console.error("Erreur dans getUtilisateurById :", error);
    next(error);
  }
};
