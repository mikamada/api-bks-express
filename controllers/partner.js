import Partners from "../models/PartnerModel.js";
import path from "path";
import fs from "fs";

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

export const addPartner = (req, res) => {
	if (req.files === null)
		return res.status(400).json({
			msg: "No file uploaded",
		});
	const name = req.body.name;
	const file = req.files.file;
	const fileSizes = file.data.length;
	const ext = path.extname(file.name);
	const fileName = file.md5 + ext;
	const url = `${req.protocol}://${req.get("host")}/images/partner/${fileName}`;
	const allowedType = [".png", ".jpg", ".jpeg"];

	if (!allowedType.includes(ext.toLocaleLowerCase()))
		return res.status(422).json({ msg: "Invalid Image" });

	if (fileSizes > 2000000)
		return res.status(422).json({ msg: "Image must be less than 2 MB" });

	file.mv(`./public/images/partner/${fileName}`, async (error) => {
		if (error) return res.status(500).json({ msg: error.message });

		try {
			await Partners.create({ name: name, image: fileName, imageUrl: url });
			res.status(201).json({ msg: "Mitra kerja sama berhasil ditambahkan" });
		} catch (error) {
			console.log(error.message);
		}
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
	if (req.files === null) {
		fileName = Partners.image;
	} else {
		const file = req.files.file;
		const fileSizes = file.data.length;
		const ext = path.extname(file.name);
		fileName = file.md5 + ext;
		const allowedType = [".png", ".jpg", ".jpeg"];

		if (!allowedType.includes(ext.toLocaleLowerCase()))
			return res
				.status(422)
				.json({ msg: "Ekstensi gambar harus .png, .jpg, .jpeg" });

		if (fileSizes > 2000000)
			return res
				.status(422)
				.json({ msg: "Ukuran gambar max 2 MB" });

		const filePath = `./public/images/partner/${partner.image}`;
		fs.unlinkSync(filePath);

		file.mv(`./public/images/partner/${fileName}`, (error) => {
			if (error) return res.status(500).json({ msg: error.message });
		});
	}
	const name = req.body.title;
	const url = `${req.protocol}://${req.get("host")}/images/partner/${fileName}`;

	try {
		await Partners.update(
			{
				name: name,
				image: fileName,
				imageUrl: url,
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
		const filePath = `./public/images/partner/${partner.image}`;
		fs.unlinkSync(filePath);
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
