const tecModel = require("../database/models/Tecnico");
const bcrypt = require("bcrypt");

const getAllTecs = async () => {
    const allTecs = await tecModel.findAll();
    return allTecs;
}

const registerTec = async (user) => {
    const newUser = await tecModel.create({ nombre: user.nombre, apellidos: user.apellidos, email: user.email, password: user.password, centro: user.centro, tipo: user.tipo });
    return newUser;
}

const findTecMail = async (userMail) => {
    const loggedTec = await tecModel.findOne({ where: { email: userMail } });
    return loggedTec;
}

const deleteTec = async (idtec) => {
    const deletedTec = await tecModel.destroy({ where: { id_tec: idtec } });
    return deletedTec;
}

// Obtener un técnico por ID
const getTecById = async (idtec) => {
    const tec = await tecModel.findByPk(idtec);
    return tec;
}

const updateTec = async (idtec, datos) => {
    await tecModel.update(datos, { where: { id_tec: idtec } });
    return await tecModel.findByPk(idtec);
}

const changePassword = async (idtec, nuevaPassword) => {
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
    await tecModel.update(
        { password: hashedPassword },
        { where: { id_tec: idtec } }
    );
    return await tecModel.findByPk(idtec);
}

const updateToAdmin = async (idtec) => {
    await tecModel.update(
        { tipo: 1 },
        { where: { id_tec: idtec } }
    );
    return await tecModel.findByPk(idtec);
}

module.exports = {
    getAllTecs,
    registerTec,
    findTecMail,
    deleteTec,
    getTecById,
    updateTec,
    changePassword,
    updateToAdmin
}