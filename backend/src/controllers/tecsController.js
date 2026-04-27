const tecsService = require("../services/tecsService.js");
const bcrypt = require("bcrypt");
const authService = require("../services/authService.js");


const getAllTecs = async (req, res) => {
    const tecs = await tecsService.getAllTecs();
    res.status(200).json(tecs);
}

const registerTec = async (req, res) => {
    const user = req.body;

    if (!user.nombre || !user.apellidos ||
        !user.email || !user.password ||
        !user.centro) {

        return res.status(400).json({
            error: "Falta alguno de los campos requeridos"
        });
    }

    try {
        const hashpassword = await bcrypt.hash(user.password, 10);
        user.password = hashpassword;
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
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

const loginTec = async (req, res) => {
    const user = req.body;

    if (!user.email || !user.password) {
        return res.status(400).json({
            error: "Falta alguno de los campos requeridos"
        });
    }
    const loggedTec = await tecsService.findTecMail(user.email);

    if (!loggedTec) {
        return res.status(404).json({
            error: "Usuario no registrado",
        });
    }

    const isValid = await bcrypt.compare(user.password, loggedTec.password);

    if (!isValid) {
        return res.status(400).json({
            error: "Usuario o contraseña incorrecta",
        });
    }

    const token = authService.generateToken(loggedTec);

    res.status(200).json({
        message: "Usuario logeado correctamente",
        token: token,
        user: {
            nombre: loggedTec.nombre,
            apellidos: loggedTec.apellidos,
            email: loggedTec.mail,
            centro: loggedTec.centro,
            tipo: loggedTec.tipo
        }
    });
}

const deleteTec = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTec = await tecsService.deleteTec(id);
        if (!deletedTec) {
            return res.status(404).json({
                msg: "No se ha encontrado el técnico"
            });
        }
        res.status(200).json({
            msg: "Técnico eliminado con id: " + id
        });
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

const passwordrecoveryTec = async (req, res) => {
    if (!user.email) {
        return res.status(400).json({
            error: "Falta alguno de los campos requeridos"
        });
    }
    
}

module.exports = {
    getAllTecs,
    registerTec,
    loginTec,
    deleteTec,
    passwordrecoveryTec
}