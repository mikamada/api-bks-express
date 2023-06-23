import multer from "multer";
import path from "path";

// config multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let destination;
		if (file.fieldname === "image") {
			destination = "/partners/images/";
		} else if (file.fieldname === "mou") {
			destination = "/partners/mou/";
		}
		cb(null, destination);
	},
});

const checkFileExtension = (file, allowedExtensions) => {
	const fileExtension = path.extname(file.originalname).toLowerCase();
	return allowedExtensions.includes(fileExtension);
};

const checkFileSize = (file, maxSize) => {
	return file.size <= maxSize;
};

export const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const imageExtensions = [".png", ".jpg", ".jpeg"];
		const docExtensions = [".pdf", ".doc", ".docx"];
		const maxFileSize = 2 * 1024 * 1024;

		if (file.fieldname === "image") {
			if (!checkFileExtension(file, imageExtensions)) {
				return cb(
					new Error(
						"Invalid file type. Only PNG, JPG, and JPEG files are allowed."
					)
				);
			}
			if (!checkFileSize(file, maxFileSize)) {
				return cb(
					new Error(
						"File size exceeds the limit. Maximum size allowed is 2 MB."
					)
				);
			}
		}

		if (file.fieldname === "mou") {
			if (!checkFileExtension(file, docExtensions)) {
				return cb(
					new Error(
						"Invalid file type. Only PDF, DOC, and DOCX files are allowed."
					)
				);
			}
		}
		cb(null, true);
	},
});
