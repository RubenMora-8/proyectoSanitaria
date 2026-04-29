const casseteService = require("../services/casseteService.js");
const qrService = require("../services/qrService.js");

const getAllCassetes = async (req, res) => {
    try {
        let cassetes;
        
        if (req.user.tipo === 1) {
            cassetes = await casseteService.getAllCassetes();
        } 
        else {
            const idTec = req.user.id;
            cassetes = await casseteService.getCassetesByTecnico(idTec);
        }
        
        res.status(200).json(cassetes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCasseteById = async (req, res) => {
    try {
        const id_cas = req.params.id_cas;
        const cassete = await casseteService.getCasseteById(id_cas);
        
        if (!cassete) {
            return res.status(404).json({ error: "Cassete no encontrado" });
        }
        
        if (req.user.tipo !== 1 && cassete.id_tec !== req.user.id) {
            return res.status(403).json({ 
                error: "No tienes permiso para ver este cassete" 
            });
        }
        
        res.status(200).json(cassete);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCassete = async (req, res) => {
    const cassete = req.body;

    if (!cassete.fecha || !cassete.observaciones ||
        !cassete.descripcion || !cassete.caracteristicas ||
        !cassete.organo || !cassete.id_tec) {

        return res.status(400).json({
            error: "Falta alguno de los campos requeridos"
        });
    }

    try {
        const textoQR = `CASSETE-${Date.now()}`;
        const imagenQR = await qrService.generarQRBuffer(textoQR);
        
        cassete.qr_cassete = imagenQR;
        
        const createdCassete = await casseteService.createCassete(cassete);

        res.status(200).json({
            message: "Cassete creado correctamente",
            data: createdCassete
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
};

const deleteCassete = async (req, res) => {


    if (!req.params.id_cas) {

        return res.status(400).json({
            error: "Falta el id del cassete"
        });
    }

    try {
        const id_cassete = req.params.id_cas;
        const deletedCassete = await casseteService.deleteCassete(id_cassete);

        if (!deletedCassete) {
            return res.status(500).json({
                error: "Error en la base de datos",
                msg: "No se ha encontrado el cassete"
            });
        }

        res.status(200).json({
            message: "Cassete borrado correctamente",
            data: id_cassete
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
    getCasseteById,
    createCassete,
    deleteCassete
}