import Activities from "../models/ActivityModel.js";
import path from "path";
import fs from "fs";

export const getActivities = async (req, res) => {
	try {
		const activity = await Activities.findAll();
		res.json(activity);
	} catch (error) {
		console.log(error.message);
	}
};

export const getActivityById = async (req, res) => {
	const { id } = req.params;
	try {
		const activity = await Activities.findOne({
			where: { id },
		});

		res.json(activity);
	} catch (error) {
		console.log(error.message);
	}
};

export const addActivity = async (req, res) => {
	if (req.file === null)
		return res.status(400).json({
			msg: "No file uploaded",
		});

	// const { title, date, description } = req.body;
	const title = req.body.title;
	const date = req.body.date;
	const description = req.body.description;
	const file = req.files.file;
	const fileSizes = file.data.length;
	const ext = path.extname(file.name);
	const fileName = file.md5 + ext;
	const url = `${req.protocol}://${req.get(
		"host"
	)}/images/activity/${fileName}`;

	const allowedType = [".png", ".jpg", ".jpeg"];

	if (!allowedType.includes(ext.toLocaleLowerCase()))
		return res.status(422).json({
			msg: "Invalid image",
		});

	if (fileSizes > 2000000)
		return res.status(422).json({
			msg: "Image must be less than 2 MB",
		});

	file.mv(`./public/images/activity/${fileName}`, async (error) => {
		if (error)
			return res.status(500).json({
				msg: error.message,
			});
	});

	try {
		await Activities.create({
			title,
			date,
			description,
			image: fileName,
			imageUrl: url,
		});
		res.status(201).json({
			msg: "Aktifitas berhasil ditambahkan",
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const updateActivity = async (req, res) => {
	const activity = await Activities.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!activity)
		return res.status(400).json({
			msg: "No data found",
		});

	let fileName = "";
	if (req.files === null) {
		fileName = Activities.image;
	} else {
		const file = req.files.file;
		const fileSizes = file.data.length;
		const ext = path.extname(file.name);
		fileName = file.md5 + ext;
		const allowedType = [".png", ".jpg", ".jpeg"];

		if (!allowedType.includes(ext.toLocaleLowerCase()))
			return res.status(422).json({
				msg: "Ekstensi gambar harus .png, .jpg, .jpeg",
			});

		if (fileSizes > 2000000)
			return res.status(422).json({
				msg: "Ukuran gambar max 2 MB",
			});

		const filePath = `./public/images/activity/${activity.image}`;
		fs.unlinkSync(filePath);

		file.mv(`./public/images/activity/${fileName}`, (error) => {
			if (error)
				return res.status(500).json({
					msg: error.message,
				});
		});
	}

	// const { title, date, desc } = req.body;
	const title = req.body.title;
	const date = req.body.date;
	const description = req.body.description;
	const url = `${req.protocol}://${req.get(
		"host"
	)}/images/activity/${fileName}`;

	try {
		await Activities.update({
			title,
			date,
			description,
			image: fileName,
			imageUrl: url,
		},{where:{
			id: req.params.id
		}});
		res.status(200).json({
			msg: "Data berhasil di update",
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const deleteActivity = async (req, res) => {
	const activity = await Activities.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!activity)
		return res.status(400).json({
			msg: "No data found",
		});

	try {
		const filePath = `./public/images/activity/${activity.image}`;
		fs.unlinkSync(filePath);
		await Activities.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({
			msg: "Deleted",
		});
	} catch (error) {
		console.log(error.message);
	}
};
