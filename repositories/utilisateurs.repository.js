import mariadb from "mariadb";

const UtilisateursRepository = class {
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
  getUtilisateurs = async () => {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("SELECT * FROM utilisateurs");
      console.info(rows);
      return rows;
    } catch (err) {
      console.error(`Erreur dans getUtilisateurs du repository : ${err}`);
      throw err;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  };
  getUtilisateurById = async (id_util) => {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rowsById = await conn.query(
        `SELECT * FROM utilisateurs WHERE id_util = ?`,
        [id_util]
      );
      console.info(` info de suivi selection utilisateur par id`, rowsById[0]);
      return rowsById[0];
    } catch (error) {
      console.error(
        `Erreur dans getUtilisateurById du repository id: ${id_util} : ${error.message}`
      );
      throw new Error(
        ` Erreur dans la fonctionnalité de getUtilisateurById id:${id_util}) : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  };
  getUtilisateurByEmail = async (email) => {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rowsByEmail = await conn.query(
        `SELECT * FROM utilisateurs WHERE email = ?`,
        [email.trim()]
      );
      console.info(
        ` info de suivi selection utilisateur par id`,
        rowsByEMail[0]
      );
      return rowsByEmail.length > 0 ? rowsByEmail[0] : null;
    } catch (error) {
      console.error(
        `Erreur dans getUtilisateurByEmail du repository email: ${email} : ${error.message}`
      );
      throw Error;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  };
  async createUtilisateur(types, nom, email, mdp) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const paramUtilisateur = { types, nom, email, mdp };
      await conn.query(
        `INSERT INTO utilisateurs (types, nom, email, mdp) VALUES (?,?,?,?)`,
        [types, nom, email, mdp]
      );
      return paramUtilisateur;
    } catch (error) {
      console.error(
        `Erreur dans createUtilisateur du repository : ${error.message}`
      );
      throw new Error(
        `Erreur dans la fonctionnalité de createUtilisateur  : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
  async updateUtilisateurById(id_util, types, nom, email, mdp) {
    let conn;

    try {
      conn = await this.pool.getConnection();
      await conn.query(
        `UPDATE utilisateurs SET types = ?, nom = ?, email = ?, mdp = ? WHERE id_util = ?`,
        [id_util, types, nom, email, mdp]
      );
      const paramUtilisateur = { id_util, types, nom, email, mdp };
      return paramUtilisateur;
    } catch (error) {
      console.error(
        `Erreur dans updateUtilisateur du repository : ${error.message}`
      );
      throw new Error(
        `Erreur dans la fonctionnalité de updateUtilisateur  : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
  async deleteUtilisateurById(id_util) {
    let conn;

    try {
      conn = await this.pool.getConnection();
      await conn.query(`DELETE FROM utilisateurs WHERE id_util = ?`, [id_util]);
      return " Bravo ! La suppression de l'utilisateur a bien été effectuée";
    } catch (error) {
      console.error(
        `Navré! il y a une erreur dans cette opération de suppression de l'utilisateur du repository : ${error.message}`
      );
      throw new Error(
        `Erreur dans la fonctionnalité de suppression de l'utilisateur  : ${error.message}`
      );
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
};
export default UtilisateursRepository;
