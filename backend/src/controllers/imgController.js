const imgsService = require("../services/imgService.js");

const getAllImgs = async (req, res) => {
    try {
        const imgs = await imgsService.getAllImages();
        if (imgs.length === 0) {
            return res.status(404).json({ msg: "No se han encontrado imágenes" });
        }
        
        const imgsConBase64 = imgs.map(img => ({
            id_img: img.id_img,
            nombre: img.nombre,
            imagen_base64: img.imagen ? img.imagen.toString('base64') : null,
            id_cas: img.id_cas,
            id_muestra: img.id_muestra
        }));
        
        res.status(200).json(imgsConBase64);
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos", errores: [error.message] });
    }
}

const getAllImgsMuestra = async (req, res) => {
    const id_muestra = req.params.id_muestra;
    try {
        const imgs = await imgsService.getAllImgsMuestra(id_muestra);
        if (imgs.length === 0) {
            return res.status(404).json({ msg: "No se han encontrado imágenes para esta muestra" });
        }
        
        const imgsConBase64 = imgs.map(img => ({
            id_img: img.id_img,
            nombre: img.nombre,
            imagen_base64: img.imagen ? img.imagen.toString('base64') : null
        }));
        
        res.status(200).json(imgsConBase64);
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos", errores: [error.message] });
    }
}

const getImageId = async (req, res) => {
    const id_img = req.params.id_img;
    try {
        const img = await imgsService.getImageId(id_img);
        if (!img) {
            return res.status(404).json({ msg: "No se ha encontrado la imagen" });
        }
        
        res.status(200).json({
            id_img: img.id_img,
            nombre: img.nombre,
            imagen_base64: img.imagen ? img.imagen.toString('base64') : null
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos", errores: [error.message] });
    }
}

const deleteImg = async (req, res) => {
    const id_img = req.params.id_img;
    try {
        const deletedImg = await imgsService.deleteImg(id_img);
        if (!deletedImg) {
            return res.status(404).json({ msg: "No se ha encontrado la imagen" });
        }
        res.status(200).json({ msg: "Imagen eliminada con id: " + id_img });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos", errores: [error.message] });
    }
}

const uploadImagenCassete = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se ha enviado ninguna imagen" });
        }

        const imagenData = {
            imagen: req.file.buffer,
            nombre: req.file.originalname,
            id_cas: req.params.id_cas,
            id_muestra: null
        };

        const nuevaImagen = await imgsService.createImage(imagenData);
        
        res.status(201).json({
            msg: "Imagen subida correctamente al cassete",
            id_img: nuevaImagen.id_img
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos", errores: [error.message] });
    }
}

const uploadImagenMuestra = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se ha enviado ninguna imagen" });
        }

        const imagenData = {
            imagen: req.file.buffer,
            nombre: req.file.originalname,
            id_cas: null,
            id_muestra: req.params.id_muestra
        };

        const nuevaImagen = await imgsService.createImage(imagenData);
        
        res.status(201).json({
            msg: "Imagen subida correctamente a la muestra",
            id_img: nuevaImagen.id_img
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos", errores: [error.message] });
    }
}

module.exports = {
    getAllImgs,
    getAllImgsMuestra,
    getImageId,
    deleteImg,
    uploadImagenCassete,
    uploadImagenMuestra
};