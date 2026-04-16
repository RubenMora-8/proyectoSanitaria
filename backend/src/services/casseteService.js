const casseteModel = require("../database/models/Cassete");

const getAllCassetes = async () => {
    const allCassetes = await casseteModel.findAll();
    return allCassetes;
}

const createCassete = async (cassete) => {
    const createdCassete = await casseteModel.create({ fecha: cassete.fecha, observaciones: cassete.observaciones, descripcion: cassete.descripcion, caracteristicas: cassete.caracteristicas, qr_cassete: cassete.qr_cassete, organo: cassete.organo });
    return createdCassete;
}
module.exports = {
    getAllCassetes,
    createCassete
}