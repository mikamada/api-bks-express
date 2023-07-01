import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Profile = db.define(
	"profile",
	{
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
	}
);

export default Profile;
