import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Vision = db.define(
	"vision",
	{
		visi: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

export default Vision;
