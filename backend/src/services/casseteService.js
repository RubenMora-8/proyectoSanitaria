const casseteModel = require("../database/models/Cassete");

const getAllCassetes = async () => {
    const allCassetes = await casseteModel.findAll();
    return allCassetes;
}

const getCassetesByTecnico = async (idTec) => {
    return await casseteModel.findAll({ 
        where: { id_tec: idTec } 
    });
};

const getCasseteById = async (id_cas) => {
    return await casseteModel.findByPk(id_cas);
};

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

const updateCassete = async (id_cas, datos) => {
    await casseteModel.update(datos, { where: { id_cas: id_cas } });
    return await getCasseteById(id_cas);
};

module.exports = {
    getAllCassetes,
    getCassetesByTecnico,
    getCasseteById,
    createCassete,
    updateCassete,
    deleteCassete
}