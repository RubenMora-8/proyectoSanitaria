const tecModel = require("../database/models/Tecnico");

const getAllTecs = async () => {
    const allTecs = await tecModel.findAll();
    return allTecs;
}

const registerTec = async (user) => {
    const newUser = await tecModel.create({nombre: user.nombre, apellidos: user.apellidos, email: user.email, password: user.password, centro: user.centro, tipo: user.tipo});
    return newUser;
}

module.exports = {
    getAllTecs,
    registerTec
}