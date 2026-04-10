const tecsService = require("../services/tecsService.js");

const getAllTecs = async (req, res) => {
    const tecs = await tecsService.getAllTecs();
    res.status(200).json(tecs);
}


module.exports = {
    getAllTecs
}