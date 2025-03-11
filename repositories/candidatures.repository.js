import db from "../config/db.js";

const CandidaturesRepository = class {
  getCandidatures = async () => {
    const [rows] = await db.execute("SELECT * FROM candidatures");
    console.info(rows);
    return rows;
  };
  getCandidatureById = async (id_cand) => {
    const [rows] = await db.execute(
      `SELECT c.id_cand, c.date_cand, m.titre AS mission_titre, u.nom, u.prenom FROM candidatures c 
        JOIN missions m ON c.id_miss = m.id_miss 
        JOIN utilisateurs u ON c.id_util = u.id_util WHERE c.id_cand = ?`,
      [id_cand]
    );
    console.info(` info de suivi selection candidature par id`, rows);
    if (!rows) {
      return null;
    } else return rows;
  };
  async createCandidature(candidature) {
    const { id_miss, id_util, date_cand } = candidature;

    const [result] = await db.execute(
      `INSERT INTO candidatures (id_miss, id_util, date_cand) VALUES (?,?,?) returning *`,
      [id_miss, id_util, date_cand]
    );
    return result;
  }
  async updateCandidatureById(id_cand, statut) {
    await db.execute(`UPDATE candidatures SET statut = ? WHERE id_cand = ?`, [
      statut,
      id_cand,
    ]);
  }
  async deleteCandidatureById(id_cand) {
    await db.execute(`DELETE FROM candidatures WHERE id_cand = ?`, [id_cand]);
    return " Bravo ! La suppression de la candidature a bien été effectuée";
  }

  async getCandidatureByMission(id_miss) {
    const rows = await db.execute(
      "SELECT * FROM candidatures WHERE id_miss = ?",
      [id_miss]
    );
    return rows;
  }
};
export default CandidaturesRepository;
