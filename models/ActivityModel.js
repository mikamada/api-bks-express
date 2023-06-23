import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Activities = db.define(
	"activities",
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		imageUrl: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ freezeTableName: true }
);

export default Activities;