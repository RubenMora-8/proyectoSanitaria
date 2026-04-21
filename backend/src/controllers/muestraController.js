const muestraService = require("../services/muestraService.js");

const getAllMuestras = async (req, res) => {
    try {
        const muestras = await muestraService.getAllMuestras();

        if (muestras.length === 0) {
            return res.status(404).json({
                msg: "No se han encontrado muestras"
            });
        }

        res.status(200).json(muestras);
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

const getAllMuestrasCassete = async (req, res) => {

    const id_Cas = req.params.id_cas;

    try {
        const muestras = await muestraService.getAllMuestrasCassete(id_Cas);

        if (muestras.length === 0) {
            return res.status(404).json({
                msg: "No se han encontrado muestras"
            });
        }

        res.status(200).json(muestras);
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

const getMuestraId = async (req, res) => {
    const id_muestra = req.params.id_muestra;

    try {
        const muestras = await muestraService.getAllMuestrasCassete(id_muestra);

        if (muestras.length === 0) {
            return res.status(404).json({
                msg: "No se han encontrado muestras"
            });
        }

        res.status(200).json(muestras);
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

module.exports = {
    getAllMuestras,
    getMuestraId,
    getAllMuestrasCassete
}