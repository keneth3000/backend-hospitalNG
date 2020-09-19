const { response } = require("express");

const Medico = require("../models/medicos");

const getMedico = async (req, res = response) => {
	const medicos = await Medico.find()
		.populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
        
    res.json({
        ok: true,
        medicos
    })
};

const crearMedico = async (req, res = response) => {
	const uid = req.id; //id del usuario (Token)

	const medico = new Medico({
		usuario: uid,
		...req.body,
	});

	try {
		const medicoDB = await medico.save();
		res.json({
			ok: true,
			medico: medicoDB,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};

const actualizarMedico = (req, res = response) => {
	res.json({
		ok: true,
		msg: "actualizarMedico",
	});
};

const borrarMedico = (req, res = response) => {
	res.json({
		ok: true,
		msg: "borrarMedico",
	});
};

module.exports = {
	getMedico,
	crearMedico,
	actualizarMedico,
	borrarMedico,
};