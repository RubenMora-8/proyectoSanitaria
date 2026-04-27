const imgsService = require("../services/imgService.js");

const getAllImgs = async (req, res) => {
    try {
        const imgs = await imgsService.getAllImages();
        if (imgs.length === 0) {
            return res.status(404).json({
                msg: "No se han encontrado imágenes"
            });
        }
        res.status(200).json(imgs);
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

const getAllImgsMuestra = async (req, res) => {
    const id_muestra = req.params.id_muestra;
    try {
        const imgs = await imgsService.getAllImgsMuestra(id_muestra);
        if (imgs.length === 0) {
            return res.status(404).json({
                msg: "No se han encontrado imágenes"
            });
        }
        res.status(200).json(imgs);
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

const getImageId = async (req, res) => {
    const id_img = req.params.id_img;
    try {
        const img = await imgsService.getImageId(id_img);
        if (!img) {
            return res.status(404).json({
                msg: "No se ha encontrado la imagen"
            });
        }
        res.status(200).json(img);
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

const deleteImg = async (req, res) => {
    const id_img = req.params.id_img;
    try {
        const deletedImg = await imgsService.deleteImg(id_img);
        if (!deletedImg) {
            return res.status(404).json({
                msg: "No se ha encontrado la imagen"
            });
        }
        res.status(200).json({
            msg: "Imagen eliminada con id: " + id_img
        });
    } catch (error) {
        res.status(500).json({
            error: "Error en la base de datos",
            errores: [error.message]
        });
    }
}

module.exports = {
    getAllImgs,
    getAllImgsMuestra,
    getImageId,
    deleteImg
}