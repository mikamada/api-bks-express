import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Partners = db.define(
	"partners",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mou: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ freezeTableName: true }
);

export default Partners;
