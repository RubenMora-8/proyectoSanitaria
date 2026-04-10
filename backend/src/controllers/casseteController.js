const casseteService = require("../services/casseteService.js");

const getAllCassetes = async (req, res) => {
    const tecs = await casseteService.getAllCassetes();
    res.status(200).json(tecs);
}

module.exports = {
    getAllCassetes
}