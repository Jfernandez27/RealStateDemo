import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, //Tiempo en milisegundos que va atratar de obtener los datos antes de arrojar error
      iddle: 10000, //Tiempo para finalizar conexion
    },
    operatorAliases: false,
  }
);

export default db;
