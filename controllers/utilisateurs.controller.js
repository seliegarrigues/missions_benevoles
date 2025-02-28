import UtilisateursRepository from "../repositories/utilisateurs.repository.js";

const getUtilisateurs = async (req, res) => {
  try {
    const utilisateursRepository = new UtilisateursRepository();

    const utilisateurs = await utilisateursRepository.getUtilisateurs();

    res.json({
      message: "Bravo! vous pouvez consulter les éléments demandés",
      utilisateurs,
    });
  } catch (error) {
    const message = `Erreur dans getCandidatures du controller : ${error.message}`;
    console.error(message);

    res.status(500).json({ error: message });
  }
};

const getUtilisateurById = async (req, res) => {
  const { id } = req.params;

  try {
    const utilisateursRepository = new UtilisateursRepository();

    const utilisateurById = await utilisateursRepository.getUtilisateurById(id);

    res.status(200).json({
      message: "Bravo! vous pouvez consulter l'élément demandé'",
      utilisateurById,
    });
  } catch (error) {
    const message = `Navré! il y a un souci dans  getUtilisateurByEmail du controller : ${error.message}`;
    console.error(message);
    res.status(500).json({ error: message });
  }
};

export { getUtilisateurs, getUtilisateurById };
