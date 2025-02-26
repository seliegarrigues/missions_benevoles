import mariadb from "mariadb";

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
};
export default MissionsRepository;
