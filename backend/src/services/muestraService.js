const muestraModel = require("../database/models/Muestra");

const getAllMuestras = async () => {
    const allMuestras = await muestraModel.findAll();
    return allMuestras;
}
module.exports = {
    getAllMuestras
}