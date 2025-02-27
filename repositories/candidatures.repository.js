import mariadb from "mariadb";

const CandidaturesRepository = class {
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
  getCandidatures = async () => {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("SELECT * FROM candidatures");
      console.info(rows);
      return rows;
    } catch (err) {
      console.error(`Erreur dans getCandidatures du repository : ${err}`);
      throw err;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  };
  getCandidatureById = async (id_cand) => {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rowsById = await conn.query(
        `SELECT * FROM candidatures WHERE id_cand = ?`,
        [id_cand]
      );
      console.info(` info de suivi selection candidature par id`, rowsById);
      return rowsById;
    } catch (error) {
      console.error(
        `Erreur dans getCandidatureById du repository id : ${id_cand} : ${error.message}`
      );
      throw new Error(
        ` Erreur dans la fonctionnalité de getCandidatureById(id:${id_cand}) : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  };
  async createCandidature(id_miss, id_util, date_cand) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const paramCandidature = { id_miss, id_util, date_cand };
      await conn.query(
        `INSERT INTO candidatures (id_miss, id_util, dat_cand) VALUES (?,?,?)`,
        [id_miss, id_util, date_cand]
      );
      return paramCandidature;
    } catch (error) {
      console.error(
        `Erreur dans createCandidature du repository : ${error.message}`
      );
      throw new Error(
        `Erreur dans la fonctionnalité de createCandidature  : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
  async updateApplicationById(id_cand, status) {
    let conn;

    try {
      conn = await this.pool.getConnection();
      await conn.query(`UPDATE candidatures SET status = ? WHERE id_cand = ?`, [
        status,
        id_cand,
      ]);
      const paramCandidature = { id_cand, status };
      return paramCandidature;
    } catch (error) {
      console.error(
        `Erreur dans updateCandidature du repository : ${error.message}`
      );
      throw new Error(
        `Erreur dans la fonctionnalité de updateCandidature  : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
  async deleteCandidatureById(id_cand) {
    let conn;

    try {
      conn = await this.pool.getConnection();
      await conn.query(`DELETE FROM candidatures WHERE id_cand = ?`, [id_cand]);
      return " Bravo ! La suppression de la candidature a bien été effectuée";
    } catch (error) {
      console.error(
        `Navré! il y a une erreur dans cette opération de suppression de candidature du repository : ${error.message}`
      );
      throw new Error(
        `Erreur dans la fonctionnalité de suppression de candidature  : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
};
export default CandidaturesRepository;
