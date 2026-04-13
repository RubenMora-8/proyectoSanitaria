const tecsService = require("../services/tecsService.js");

const getAllTecs = async (req, res) => {
    const tecs = await tecsService.getAllTecs();
    res.status(200).json(tecs);
}

const registerTec = async (req, res) => {
    const user = req.body;

    if (!user.nombre || !user.apellidos ||
        !user.email || !user.password ||
        !user.centro || !user.tipo) {

        return res.status(400).json({
            error: "Falta alguno de los campos requeridos"
        });
    }

    const createdUser = await tecsService.registerTec(user);

    if (!createdUser) {
        return res.status(500).json({
            error: "Error en la base de datos",
            msg: "No se ha podido registrar al usuario"
        });
    }


    res.status(200).json({
        message: "Usuario creado correctamente",
        user: {
            nombre: createdUser.nombre,
            apellidos: createdUser.apellidos,
            email: createdUser.mail,
            centro: createdUser.centro,
            tipo: createdUser.tipo
        }
    });
}

module.exports = {
    getAllTecs,
    registerTec
}