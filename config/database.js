import { Sequelize } from "sequelize";
import mysql2 from "mysql2"
import dotenv from "dotenv";

dotenv.config();
const db = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.USERNAME_DB,
	process.env.PASSWORD_DB,
	{
		host: process.env.HOST_DB,
		dialect: "mysql",
		dialectModule: mysql2,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	}
);

export default db;
