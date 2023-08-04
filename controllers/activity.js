import Activities from "../models/ActivityModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getActivitiesCount = async (req, res) => {
	try {
		const totalCount = await Activities.count();
		res.json(totalCount);
	} catch (error) {
		console.log(error.message);
	}
};

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

export const uploadActivity = async (req, res) => {
	const { image, title, date, description } = req.body;

	if (!req.body) {
		return res.status(400).json({
			msg: "No file uploaded",
		});
	}

	try {
		const result = await cloudinary.uploader.upload(image, {
			tags: "activity_image",
		});
		console.log({ result });

		await Activities.create({
			title,
			date,
			image: result.secure_url,
			description,
		});
		res.status(201).json({
			msg: "Aktifitas berhasil ditambahkan",
		});
	} catch (error) {
		console.error(error.message);
	}
};

export const addNewActivity = async (req, res) => {
	if (!req.body) {
		return res.status(400).json({
			msg: "No data uploaded",
		});
	}

	const { title, date, image, description } = req.body;

	try {
		const resultImg = await cloudinary.uploader.upload(image, {
			tags: "activity_image",
		});

		await Activities.create({
			title,
			date,
			description,
			image: resultImg.secure_url,
		});
		res.status(201).json({
			msg: "Upload Success",
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const updateActivityById = async (req, res) => {
	const activity = await Activities.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!activity)
		return res.status(400).json({
			msg: "No data found",
		});

	const { title, date, description, image } = req.body;
	

	if (title) {
		activity.title = title;
	}
	if (date) {
		activity.date = date;
	}
	if (description) {
		activity.description = description;
	}

	if (image) {
		const result = await cloudinary.uploader.upload(image, {
			tags: "activity_image",
		});
		console.log({ result });
		activity.image = result.secure_url;
	}

	try {
		await Activities.update(
			{
				title: activity.title,
				date: activity.date,
				description: activity.description,
				image: activity.image,
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
