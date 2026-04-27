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

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await tecsService.getTecById(id);
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellidos, email, centro } = req.body;
    
    try {
        const usuarioExistente = await tecsService.getTecById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        
        const datosActualizados = {};
        if (nombre) datosActualizados.nombre = nombre;
        if (apellidos) datosActualizados.apellidos = apellidos;
        if (email) datosActualizados.email = email;
        if (centro) datosActualizados.centro = centro;
        
        const usuarioActualizado = await tecsService.updateTec(id, datosActualizados);
        
        res.status(200).json({
            message: "Usuario actualizado correctamente",
            user: usuarioActualizado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const changeUserPassword = async (req, res) => {
    const id = req.params.id;
    const { nuevaPassword } = req.body;
    
    if (!nuevaPassword) {
        return res.status(400).json({ error: "La nueva contraseña es obligatoria" });
    }
    
    if (nuevaPassword.length < 6) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }
    
    try {
        const usuarioExistente = await tecsService.getTecById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        
        await tecsService.changePassword(id, nuevaPassword);
        
        res.status(200).json({
            message: "Contraseña actualizada correctamente"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUserToAdmin = async (req, res) => {
    const id = req.params.id;
    
    try {
        const usuarioExistente = await tecsService.getTecById(id);
        if (!usuarioExistente) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        
        if (usuarioExistente.tipo === 1) {
            return res.status(400).json({ msg: "El usuario ya es administrador" });
        }
        
        const usuarioPromocionado = await tecsService.updateToAdmin(id);
        
        res.status(200).json({
            message: "Usuario promocionado a administrador correctamente",
            user: usuarioPromocionado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllTecs,
    registerTec,
    loginTec,
    deleteTec,
    passwordrecoveryTec,
    getUserById,
    updateUser,
    changeUserPassword,
    updateUserToAdmin
}