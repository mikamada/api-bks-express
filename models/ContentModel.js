import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Contents = db.define(
	"contents",
	{
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		freezeTableName: true,
	}
);

export default Contents;
