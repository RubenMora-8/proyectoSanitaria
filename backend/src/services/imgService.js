const imgModel = require("../database/models/Imagen");

const getAllImages = async () => {
    const allImages = await imgModel.findAll();
    return allImages;
}

const getImageId = async (id_img) => {
    const img = await imgModel.findOne({ where: { id_img: id_img } });
    return img;
}

const getAllImgsMuestra = async (idmuestra) => {
    const allImgs = await imgModel.findAll({ where: { id_muestra: idmuestra } });
    return allImgs;
}

const deleteImg = async (id_img) => {
    const img = await imgModel.destroy({ where: { id_img: id_img } });
    return img;
}

module.exports = {
    getAllImages,
    getImageId,
    getAllImgsMuestra,
    deleteImg
}