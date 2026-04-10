const imgModel = require("../database/models/Imagen");

const getAllImages = async () => {
    const allImages = await imgModel.findAll();
    return allImages;
}
module.exports = {
    getAllImages
}