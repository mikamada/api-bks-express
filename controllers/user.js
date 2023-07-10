import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUser = async (req, res) => {
	try {
		const user = await Users.findAll({
			attributes: ["id", "name", "email"],
		});
		res.json(user);
	} catch (error) {
		console.log(error.message);
	}
};

export const register = async (req, res) => {
	const { name, email, password, confPassword } = req.body;
	if (password !== confPassword) {
		return res.status(400).json({
			msg: "Password dan konfirmasi password tidak cocok",
		});
	} else if (password.length < 8) {
		return res.status(400).json({
			msg: "Panjang password harus 8 karakter!",
		});
	}

	try {
		// cek ketersediaan user berdasarkan email
		const user = await Users.findOne({ where: { email } });
		if (user) {
			return res.status(400).json({ msg: "Email sudah tersedia!" });
		}

		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);
		await Users.create({
			name,
			email,
			password: hashPassword,
		});
		res.status(201).json({ msg: "Registrasi berhasil" });
	} catch (error) {
		console.log(error.message);
	}
};

export const login = async (req, res) => {
	try {
		const user = await Users.findAll({
			where: {
				email: req.body.email,
			},
		});

		const match = await bcrypt.compare(req.body.password, user[0].password);

		if (!match)
			return res.status(400).json({
				msg: "Email atau password salah!",
			});

		const userId = user[0].id;
		const name = user[0].name;
		const email = user[0].email;

		const accessToken = jwt.sign(
			{ userId, name, email },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "10800s",
			}
		);

		res.json({ accessToken });
	} catch (error) {
		res.status(404).json({ msg: "Email atau password salah!" });
	}
};

export const deleteUser = async (req, res) => {
	const user = await Users.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!user)
		return res.status(400).json({
			msg: "No data found",
		});

	try {
		await Users.destroy({
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

export const logout = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	if (!refreshToken) return res.sendStatus(204);
	const user = await Users.findAll({
		where: {
			refresh_token: refreshToken,
		},
	});

	if (!user[0]) return res.sendStatus(204);
	const userId = user[0].id;
	await Users.update(
		{ refresh_token: null },
		{
			where: {
				id: userId,
			},
		}
	);
	res.clearCookie("refreshToken");
	return res.sendStatus(200);
};