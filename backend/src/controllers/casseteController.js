const casseteService = require("../services/casseteService.js");

const getAllCassetes = async (req, res) => {
    try {
        const tecs = await casseteService.getAllCassetes();

        if (tecs.length === 0) {
            return res.status(404).json({
                msg: "No se han encontrado cassetes"
            });
        }

        res.status(200).json(tecs);
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

const createCassete = async (req, res) => {
    const cassete = req.body;

    if (!cassete.fecha || !cassete.observaciones ||
        !cassete.descripcion || !cassete.caracteristicas ||
        !cassete.qr_cassete || !cassete.organo || !cassete.id_tec) {

        return res.status(400).json({
            error: "Falta alguno de los campos requeridos"
        });
    }

    try {
        const createdCassete = await casseteService.createCassete(cassete);

        if (!createdCassete) {
            return res.status(500).json({
                error: "Error en la base de datos",
                msg: "No se ha podido registrar el cassete"
            });
        }

        res.status(200).json({
            message: "Cassete creado correctamente",
            data: createdCassete
        });
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

module.exports = {
    getAllCassetes,
    createCassete
}