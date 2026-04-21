const muestraModel = require("../database/models/Muestra");

const getAllMuestras = async () => {
    const allMuestras = await muestraModel.findAll();
    return allMuestras;
}

const getAllMuestrasCassete = async (idcassete) => {
    const allMuestras = await muestraModel.findAll({ where: { id_cas: idcassete } });
    return allMuestras;
}

const getMuestraId = async (idmuestra) => {
    const muestra = await muestraModel.findOne({ where: { id_muestra: idmuestra } });
    return muestra;
}

module.exports = {
    getAllMuestras,
    getMuestraId,
    getAllMuestrasCassete
}