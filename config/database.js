import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const db = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.USERNAME_DB,
	process.env.PASSWORD_DB,
	{
		host: process.env.HOST_DB,
		dialect: "mysql",
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	}
);

export default db;
