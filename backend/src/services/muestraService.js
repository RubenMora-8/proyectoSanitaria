const muestraModel = require("../database/models/Muestra");
const { Op: sq } = require("sequelize");
const casseteModel = require("../database/models/Cassete");

const getAllMuestras = async () => {
    const allMuestras = await muestraModel.findAll();
    return allMuestras;
}

const createMuestra = async (muestra) => {
    const createdMuestra = await muestraModel.create({
        fecha: muestra.fecha, observaciones: muestra.observaciones,
        descripcion: muestra.descripcion, qr_muestra: muestra.qr_muestra,
        tincion: muestra.tincion, id_cas: muestra.id_cas
    });
    return createdMuestra;
}

const getAllMuestrasCassete = async (idcassete) => {
    const allMuestras = await muestraModel.findAll({ where: { id_cas: idcassete } });
    return allMuestras;
}

const getMuestraId = async (idmuestra) => {
    const muestra = await muestraModel.findOne({ where: { id_muestra: idmuestra } });
    return muestra;
}

const deleteMuestra = async (idmuestra) => {
    const muestra = await muestraModel.destroy({ where: { id_muestra: idmuestra } });
    return muestra;
}

const getMuestrasByTecnico = async (id_tec) => {
    const cassetes = await casseteModel.findAll({
        where: { id_tec: id_tec }
    });

    const idsCassetes = cassetes.map(c => c.id_cas);

    const muestras = await muestraModel.findAll({
        where: {
            id_cas: { [sq.in]: idsCassetes }
        }
    });

    return muestras;
};

module.exports = {
    getAllMuestras,
    getMuestraId,
    createMuestra,
    getAllMuestrasCassete,
    getMuestrasByTecnico,
    deleteMuestra
};