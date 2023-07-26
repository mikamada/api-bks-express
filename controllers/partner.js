import Partners from "../models/PartnerModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserCount = async (req, res) => {
	try {
		const totalPartnerCount = await Partners.count();
		res.json(totalPartnerCount);
	} catch (error) {
		console.log(error.message);
	}
};

export const getPartners = async (req, res) => {
	try {
		const partner = await Partners.findAll();
		res.json(partner);
	} catch (error) {
		console.log(error.message);
	}
};

export const getPartnerById = async (req, res) => {
	const { id } = req.params;
	try {
		const partner = await Partners.findOne({
			where: { id },
		});
		res.json(partner);
	} catch (error) {
		console.log(error.message);
	}
};

export const getMouById = async (req, res) => {
	try {
		const partner = await Partners.findOne({
			where: {
				id: req.params.id,
			},
			attributes: ["mou"],
		});
		res.json(partner);
	} catch (error) {
		console.log(error.message);
	}
};

export const addNewPartner = async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ msg: "No file uploaded" });
	}

	const { name, image, mou } = req.body;

	try {
		const resultImg = await cloudinary.uploader.upload(image, {
			tags: "partner_logo",
		});
		const resultMou = await cloudinary.uploader.upload(mou, {
			tags: "mou_partner",
		});

		console.log({ resultImg, resultMou });

		await Partners.create({
			name,
			image: resultImg.secure_url,
			mou: resultMou.secure_url,
		});
		res.status(201).json({
			msg: "Mitra berhasil ditambahkan",
		});
	} catch (error) {
		console.error(error.message);
	}
};

export const updatePartnerById = async (req, res) => {
	const partner = await Partners.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!partner)
		return res.status(400).json({
			msg: "No data found",
		});

	const { image, mou, name } = req.body;
	console.log(req.body);

	try {
		if (name) {
			partner.name = name;
		}
		if (mou && partner.mou !== mou) {
			const result = await cloudinary.uploader.upload(mou, {
				tags: "partner_mou",
			});
			partner.mou = result.secure_url;
		}

		if (image && partner.image !== image) {
			const result = await cloudinary.uploader.upload(image, {
				tags: "partner_logo",
			});
			console.log({ result });
			partner.image = result.secure_url;
		}
		await Partners.update(
			{
				name: partner.name,
				mou: partner.mou,
				image: partner.image,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).json({
			msg: "Data berhasil di update",
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const deletePartner = async (req, res) => {
	const partner = await Partners.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!partner)
		return res.status(404).json({
			msg: "No data found",
		});

	try {
		await Partners.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ msg: "Deleted" });
	} catch (error) {
		console.log(error.message);
	}
};
