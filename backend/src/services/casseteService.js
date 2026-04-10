const casseteModel = require("../database/models/Cassete");

const getAllCassetes = async () => {
    const allCassetes = await casseteModel.findAll();
    return allCassetes;
}
module.exports = {
    getAllCassetes
}