const tecModel = require("../database/models/Tecnico");

const getAllTecs = async () => {
    const allTecs = await tecModel.findAll();
    return allTecs;
}
module.exports = {
    getAllTecs
}