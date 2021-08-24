const mssql = require('mssql');
require('dotenv').config();

let mssqlConnection;

module.exports = class canadasql {

  constructor() { }

  config = {
    user: process.env.APP_DB_USERNAME,
    password: process.env.APP_DB_PASSWORD,
    server: process.env.APP_DB_HOST, // hostname
    database: process.env.APP_DB_NAME,  // sqldbName
    port: parseInt(process.env.APP_DB_PORT, 10),// port

    options: {
      encrypt: true
    }
  };

  async getConnection() {
    if (mssqlConnection === undefined) {
      mssqlConnection = new mssql.ConnectionPool(this.config);
    }
    return mssqlConnection;
  }

  async getProvincesAndTerritories() {
    const connection = await this.getConnection();
    const pool = await connection.connect(this.config);

    try {
      const request = await pool.request();
      const result = await request.query(`SELECT * FROM [provinces_territories];`);
      pool.close();
      return result;
    } catch (err) {
      console.log(err);
      pool.close();
    }
  }
}

