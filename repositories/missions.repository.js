import db from "../config/db.js";
import "dotenv/config";

class MissionsRepository {
  async getMissions() {
    const rows = await db.execute("SELECT * FROM missions");
    console.info(rows);
    return rows;
  }

  getMissionsById = async (id_miss) => {
    const [rowsById] = await db.execute(
      `SELECT * FROM missions WHERE id_miss = ?`,
      [id_miss]
    );
    console.info(` info de suivi selection mission par id`, rowsById);
    if (!rowsById) {
      return null;
    } else return rowsById;
  };

  async createMission(mission) {
    const { titre, description, id_util, date_debut } = mission;

    const [result] = await db.execute(
      `INSERT INTO missions (titre, description, id_util, date_debut) VALUES (?,?,?,?)`,
      [titre, description, id_util, date_debut]
    );
    return result;
  }
  async updateMissionById(id_miss, mission) {
    const { titre, description, date_debut } = mission;

    await db.execute(
      `UPDATE missions SET titre = ?, description = ?, date_debut = ? WHERE id_miss = ?`,
      [titre, description, date_debut, id_miss]
    );
  }

  async deleteMissionById(id_miss) {
    await db.execute(`DELETE FROM missions WHERE id_miss = ?`, [id_miss]);
  }
}
export default MissionsRepository;
