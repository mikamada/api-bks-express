import { where } from "sequelize";
import Profile from "../models/ProfileModel.js";

export const getProfile = async (req, res) => {
	const profile = await Profile.findOne({
		where: {
			id: req.params.id,
		},
	});
	res.status(200).json(profile);
};

export const addProfile = async (req, res) => {
	const {content} = req.body;

	if (!content) {
		return res.status(400).json({
			msg: "Tidak boleh kosong",
		});
	}

	try {
		await Profile.create({
			content,
		});
		res.status(201).json({
			msg: "Profil berhasil ditambahkan",
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const updateProfile = async (req, res) => {
	const profileId = Profile.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!profileId)
		return res.status(400).json({
			msg: "No data found",
		});

	const {content} = req.body;

	try {
		await Profile.update({
			content,
		}, {
			where: {
				id: req.params.id
			}
		});
		res.status(200).json({
			msg: "Profile berhasil di update",
		});
	} catch (error) {
		console.log(error.message);
	}
};
