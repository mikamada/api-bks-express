import Partners from "../models/PartnerModel.js";
import path from "path";
import fs from "fs";

function isFileValid(file, allowedExtensions, maxSize) {
	if (!file || !allowedExtensions || allowedExtensions.length === 0) {
		return false;
	}

	// Check file extension
	const ext = path.extname(file.name);
	if (!allowedExtensions.includes(ext.toLowerCase())) {
		return false;
	}

	// Check file size
	if (maxSize > 0 && file.size > maxSize) {
		return false;
	}

	return true;
}

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
			attributes: ["mouUrl", "mou"],
		});
		res.json(partner)
	} catch (error) {
		console.log(error.message);
	}
};

export const addPartner = (req, res) => {
	if (!req.files || !req.files.file || !req.files.mou) {
		return res.status(400).json({ msg: "No file uploaded" });
	}

	const { name } = req.body;
	const { file, mou } = req.files;

	if (!isFileValid(file, [".png", ".jpeg", ".jpg"], 2 * 1024 * 1024)) {
		return res.status(400).json({
			msg: "Invalid image file. Allowed extensions: png, jpeg, jpg. Maximum size: 2MB",
		});
	}

	const extFile = path.extname(file.name);
	const fileName = file.md5 + extFile;
	const imageUrl = `${req.protocol}://${req.get(
		"host"
	)}/partners/images/${fileName}`;

	file.mv(`./public/partners/images/${fileName}`, async (error) => {
		if (error) return res.status(500).json({ msg: error.message });

		if (!isFileValid(mou, [".docx", ".pdf", ".docs"], 0)) {
			return res
				.status(400)
				.json({ msg: "Invalid mou file. Allowed extensions: docx, pdf, docs" });
		}

		const extMou = path.extname(mou.name);
		const mouName = mou.md5 + extMou;
		const mouUrl = `${req.protocol}://${req.get(
			"host"
		)}/partners/mou/${mouName}`;

		mou.mv(`./public/partners/mou/${mouName}`, async (error) => {
			if (error) {
				console.error(error);
				return res.status(500).json({ msg: "Failed to upload mou file" });
			}

			try {
				await Partners.create({
					name,
					image: fileName,
					imageUrl,
					mou: mouName,
					mouUrl,
				});
				res.status(201).json({ msg: "Mitra kerja sama berhasil ditambahkan" });
			} catch (error) {
				console.log(error.message);
			}
		});
	});
};

export const updatePartner = async (req, res) => {
	const partner = await Partners.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!partner) return res.status(404).json({ msg: "No data found" });

	let fileName = "";
	let mouName = "";

	if (!req.files || !req.files.file || !req.files.mou) {
		fileName = partner.image;
		mouName = partner.mou;
	} else {
		const { file, mou } = req.files;

		const extFile = path.extname(file.name);
		fileName = file.md5 + extFile;

		if (!isFileValid(file, [".png", ".jpeg", ".jpg"], 2 * 1024 * 1024)) {
			return res.status(400).json({
				msg: "Invalid image file. Allowed extensions: png, jpeg, jpg. Maximum size: 2MB",
			});
		}

		const filePath = `./public/partners/images/${partner.image}`;
		fs.unlinkSync(filePath);

		file.mv(`./public/partners/images/${fileName}`, (error) => {
			if (error) return res.status(500).json({ msg: error.message });
		});

		const extMou = path.extname(mou.name);
		mouName = mou.md5 + extMou;

		if (!isFileValid(mou, [".docx", ".pdf", ".docs"], 0)) {
			return res.status(400).json({
				msg: "Invalid mou file. Allowed extensions: docx, pdf, docs",
			});
		}

		const mouPath = `./public/partners/mou/${partner.mou}`;
		fs.unlinkSync(mouPath);

		mou.mv(`./public/partners/mou/${mouName}`, async (error) => {
			if (error) {
				console.error(error);
				return res.status(500).json({ msg: "Failed to upload mou file" });
			}
		});
	}
	const { name } = req.body;
	const imageUrl = `${req.protocol}://${req.get(
		"host"
	)}/partners/images/${fileName}`;
	const mouUrl = `${req.protocol}://${req.get("host")}/partners/mou/${mouName}`;

	try {
		await Partners.update(
			{
				name: name,
				image: fileName,
				imageUrl,
				mou: mouName,
				mouUrl,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).json({ msg: "Data berhasil di update" });
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
		// const filePath = `./public/partners/images/${partner.image}`;
		// fs.unlinkSync(filePath);
		// const mouPath = `./public/partners/mou/${partner.mou}`
		// fs.unlinkSync(mouPath);
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
