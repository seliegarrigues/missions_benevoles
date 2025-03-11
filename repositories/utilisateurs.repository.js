import db from "../config/db.js";

const UtilisateursRepository = class {
  getUtilisateurs = async () => {
    const rows = await db.execute("SELECT * FROM utilisateurs");
    console.info(rows);
    return rows;
  };
  getUtilisateurById = async (id_util) => {
    const rowsById = await db.execute(
      `SELECT * FROM utilisateurs WHERE id_util = ?`,
      [id_util]
    );
    console.info(` info de suivi selection utilisateur par id`, rowsById[0]);
    return rowsById[0];
  };

  getUtilisateurByEmail = async (email) => {
    const [rows] = await db.execute(
      `SELECT * FROM utilisateurs WHERE email = ?`,
      [email.trim()]
    );
    console.info(` info de suivi selection utilisateur par id`, rows[0]);
    if (!rows) {
      return null;
    } else return rows;
  };
  async createUtilisateur(user) {
    const { types, nom, email, mdp } = user;

    const [result] = await db.execute(
      `INSERT INTO utilisateurs (types, nom, email, mdp) VALUES (?,?,?,?) returning *`,
      [types, nom, email, mdp]
    );
    return result;
  }
  async updateUtilisateurById(id_util, types, nom, email, mdp) {
    await db.execute(
      `UPDATE utilisateurs SET types = ?, nom = ?, email = ?, mdp = ? WHERE id_util = ?`,
      [id_util, types, nom, email, mdp]
    );
    const paramUtilisateur = { id_util, types, nom, email, mdp };
    return paramUtilisateur;
  }
  async deleteUtilisateurById(id_util) {
    await db.execute(`DELETE FROM utilisateurs WHERE id_util = ?`, [id_util]);
    return " Bravo ! La suppression de l'utilisateur a bien été effectuée";
  }
};
export default UtilisateursRepository;
