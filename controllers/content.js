import Contents from "../models/ContentModel.js";

export const getContent = async (req, res) => {
	try {
		const content = await Contents.findAll();
		res.json(content);
	} catch (error) {
		console.log(error.message);
	}
};

export const getContentById = async (req, res) => {
	try {
		const content = await Contents.findOne({
			where: {
				id: req.params.id,
			},
		});
		res.json(content);
	} catch (error) {
		console.log(error.message);
	}
};

export const addContent = async (req, res) => {
	const { content, type } = req.body;

	if (!content || !type) {
		return res.status(400).json({
			msg: "Tidak boleh kosong",
		});
	}

	try {
		await Contents.create({
			content,
			type,
		});
		res.status(201).json({
			msg: "Konten berhasil di tambahkan",
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const updateContent = async (req, res) => {
	const contentId = Contents.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!contentId)
		return res.status(400).json({
			msg: "No data found",
		});

	const {content} = req.body;

	try {
		await Contents.update({
			content,
			type: contentId.type
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
