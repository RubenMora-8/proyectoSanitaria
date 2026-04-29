const muestraService = require("../services/muestraService.js");
const qrService = require("../services/qrService.js");

const getAllMuestras = async (req, res) => {
    try {
        let muestras;
        
        if (req.user.tipo === 1) {
            muestras = await muestraService.getAllMuestras();
        } 
        else {
            const idTec = req.user.id;
            muestras = await muestraService.getMuestrasByTecnico(idTec);
        }
        
        res.status(200).json(muestras);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMuestra = async (req, res) => {
    const muestra = req.body;

    if (!muestra.fecha || !muestra.observaciones ||
        !muestra.descripcion || !muestra.tincion ||
        !muestra.id_cas) {

        return res.status(400).json({
            error: "Falta alguno de los campos requeridos"
        });
    }

    try {
        const textoQR = `MUESTRA-${Date.now()}`;
        const imagenQR = await qrService.generarQRBuffer(textoQR);
    
        muestra.qr_muestra = imagenQR;
        
        const createdMuestra = await muestraService.createMuestra(muestra);

        res.status(200).json({
            message: "Muestra creada correctamente",
            data: createdMuestra
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
};
const getAllMuestrasCassete = async (req, res) => {
    try {
        const id_cas = req.params.id_cas;
        
        const muestras = await muestraService.getAllMuestrasCassete(id_cas);
        
        res.status(200).json(muestras);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMuestraId = async (req, res) => {
    const id_muestra = req.params.id_muestra;

    try {
        const muestra = await muestraService.getMuestraId(id_muestra);

        if (!muestra) {
            return res.status(404).json({
                msg: "No se ha encontrado la muestra"
            });
        }

        res.status(200).json(muestra);
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

const deleteMuestra = async (req, res) => {
    const id_muestra = req.params.id_muestra;
    try {
        const deletedMuestra = await muestraService.deleteMuestra(id_muestra);
        if (!deletedMuestra) {
            return res.status(404).json({
                msg: "No se ha encontrado la muestra"
            });
        }
        res.status(200).json({
            msg: "Muestra eliminada con id: " + id_muestra
        });
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
    getAllMuestrasCassete,
    deleteMuestra,
    createMuestra
}