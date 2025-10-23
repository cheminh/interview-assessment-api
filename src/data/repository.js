import mssql from "mssql";
import dotlocal from "dotenv";

let mssqlConnection;
const config = dotlocal.config();

export default class canadasql {

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

  async addProvinceOrTerritory(provinceData) {
    const connection = await this.getConnection();
    const pool = await connection.connect(this.config);

    try {
      const request = await pool.request();

      // Add input parameters to prevent SQL injection
      request.input('name', mssql.VarChar(100), provinceData.name);
      request.input('postal_abbrevation', mssql.VarChar(2), provinceData.postal_abbrevation);
      request.input('capital', mssql.VarChar(100), provinceData.capital);
      request.input('population', mssql.VarChar(20), provinceData.population);

      const result = await request.query(`
        INSERT INTO [provinces_territories] (name, postal_abbrevation, capital, population)
        VALUES (@name, @postal_abbrevation, @capital, @population);
        SELECT SCOPE_IDENTITY() AS id;
      `);

      pool.close();
      return result;
    } catch (err) {
      console.log('Error adding province/territory:', err);
      pool.close();
      throw err; // Re-throw to allow caller to handle
    }
  }
}

