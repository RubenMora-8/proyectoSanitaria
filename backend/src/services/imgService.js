const imgModel = require("../database/models/Imagen");

const getAllImages = async () => {
    const allImages = await imgModel.findAll();
    return allImages;
}

const getImageId = async (idimg) => {
    const img = await imgModel.findOne({ where: { id_img: idimg } });
    return img;
}

const getAllImgsMuestra = async (idmuestra) => {
    const allImgs = await imgModel.findAll({ where: { id_muestra: idmuestra } });
    return allImgs;
}

const deleteImg = async (idimg) => {
    const img = await imgModel.destroy({ where: { id_muestra: idmuestra } });
    return img;
}

module.exports = {
    getAllImages,
    getImageId,
    getAllImgsMuestra,
    deleteImg
}