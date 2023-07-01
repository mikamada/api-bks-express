import Vision from "../models/visionModel.js";

export const getVision = async (req, res) => {
	try {
		const vision = await Vision.findAll();
		res.status(200).json(vision);
	} catch (error) {
		console.log(error.message);
	}
};

export const getVisionById = async (req, res) => {
	try {
		const vision = await Vision.findOne({
			where: {
				id: req.params.id,
			},
		});

		res.json(vision);
	} catch (error) {
		console.log(error.message);
	}
};

export const addVision = async (req, res) => {
	const vision = req.body.vision;

	if (vision === null)
		return res.status(400).json({
			msg: "Tidak boleh kosong",
		});

	try {
		await Vision.create({
			visi: vision,
		});
		res.status(201).json({
			msg: "Visi berhasil ditambahkan",
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const updateVision = async (req, res) => {
	const vision = Vision.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!vision)
		return res.status(400).json({
			msg: "No data found",
		});

	const visi = req.body.vision;

	try {
		await Vision.update({
			visi,
		}, {
			where: {
				id: req.params.id
			}
		});
		res.status(200).json({
			msg: "Visi berhasil di update",
		});
	} catch (error) {
		console.log(error.message);
	}
};
