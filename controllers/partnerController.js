import Partners from "../models/PartnerModel.js";

export const getAllPartner = async (req, res) => {
	try {
		const partners = await Partners.findAll();

		res.status(200).json(partners);
	} catch (error) {
		console.error("Error retrieving data:", error);
		res.status(500).json({ error: "Failed to retrieve data" });
	}
};

export const addPartner = async (req, res) => {
	const { name } = req.body;
	const { image, mou } = req.file;

	if (!name || !image || !mou) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	// get url server
	const serverUrl = `${req.protocol}://${req.get("host")}`;

	try {
		const data = await Partners.create({
			name,
			image: `${serverUrl}/${image[0].path}`,
			mou: `${serverUrl}/${mou[0].path}`,
		});

		res.status(201).json(data);
	} catch (error) {
		console.error("Error creating data:", error);
		res.status(500).json({ error: "Failed to create data" });
	}
};
