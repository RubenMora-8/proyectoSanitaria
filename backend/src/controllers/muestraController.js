const muestraService = require("../services/muestraService.js");

const getAllMuestras = async (req, res) => {
    const tecs = await muestrasService.getAllMuestras();
    res.status(200).json(tecs);
}


module.exports = {
    getAllMuestras
}