const imgsService = require("../services/imgService.js");

const getAllImgs = async (req, res) => {
    const tecs = await casseteService.getAllImgs();
    res.status(200).json(tecs);
}

module.exports = {
    getAllImgs
}