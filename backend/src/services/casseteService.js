const { where } = require("sequelize");
const casseteModel = require("../database/models/Cassete");

const getAllCassetes = async () => {
    const allCassetes = await casseteModel.findAll();
    return allCassetes;
}

const createCassete = async (cassete) => {
    const createdCassete = await casseteModel.create({
        fecha: cassete.fecha, observaciones: cassete.observaciones,
        descripcion: cassete.descripcion, caracteristicas: cassete.caracteristicas,
        qr_cassete: cassete.qr_cassete, organo: cassete.organo, id_tec: cassete.id_tec
    });
    return createdCassete;
}

const deleteCassete = async (id_cassete) => {
    const createdCassete = await casseteModel.destroy({ where: { id_cas: id_cassete } });
    return createdCassete;
}

module.exports = {
    getAllCassetes,
    createCassete,
    deleteCassete
}