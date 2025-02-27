import mariadb from "mariadb";
import "dotenv/config";

const MissionsRepository = class {
  constructor() {
    this.pool = mariadb.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      connectionLimit: 5,
    });
  }
  getMissions = async () => {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("SELECT * FROM missions");
      console.info(rows);
      return rows;
    } catch (err) {
      console.error(`Erreur dans GetMissions du repository : ${err}`);
      throw err;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  };
  getMissionsById = async (miss_id) => {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rowsById = await conn.query(
        `SELECT * FROM missions WHERE id_miss = ?`,
        [miss_id]
      );
      console.info(` info de suivi selection mission par id`, rowsById);
      return rowsById;
    } catch (error) {
      console.error(
        `Erreur dans GetMissionsById du repository id : ${miss_id} : ${error.message}`
      );
      throw new Error(
        ` Erreur dans la fonctionnalité de getMissionsById(id:${miss_id}) : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  };
  async createMission(titre, description, id_util, date_debut) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const paramMission = { titre, description, id_util, date_debut };
      await conn.query(
        `INSERT INTO missions (titre, description, id_util, date_debut) VALUES (?,?,?,?)`,
        [titre, description, id_util, date_debut]
      );
      return paramMission;
    } catch (error) {
      console.error(
        `Erreur dans createMission du repository : ${error.message}`
      );
      throw new Error(
        `Erreur dans la fonctionnalité de createMission  : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
  async updateMissionById(titre, description, date_debut) {
    let conn;

    try {
      conn = await this.pool.getConnection();
      await conn.query(
        `UPDATE missions SET titre = ?, description = ?, date_debut = ? WHERE id_miss = ?`,
        [titre, description, id_util, date_debut, id_miss]
      );
      const paramMission = { id_miss, titre, description, date_debut };
      return paramMission;
    } catch (error) {
      console.error(
        `Erreur dans updateMission du repository : ${error.message}`
      );
      throw new Error(
        `Erreur dans la fonctionnalité de updateMission  : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
  async deleteMissionById(id_miss) {
    let conn;

    try {
      conn = await this.pool.getConnection();
      await conn.query(`DELETE FROM missions WHERE id_miss = ?`, [id_miss]);
      return " Bravo ! La suppression de la mission a bien été effectuée";
    } catch (error) {
      console.error(
        `Navré! il y a une erreur dans cette opération de suppression de mission du repository : ${error.message}`
      );
      throw new Error(
        `Erreur dans la fonctionnalité de suppression de mission  : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
};
export default MissionsRepository;
