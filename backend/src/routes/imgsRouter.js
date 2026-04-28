const express = require("express");
const imgsRouter = express.Router();
const imgsController = require("../controllers/imgController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const upload = require("../middleware/multer.js");

// Rutas publicas

// Rutas token

// ALumnos y Admin

imgsRouter.get("/", authMiddleware.checkToken, imgsController.getAllImgs);
imgsRouter.get("/:id_muestra", authMiddleware.checkToken, imgsController.getAllImgsMuestra);
imgsRouter.get("/imagen/:id_img", authMiddleware.checkToken, imgsController.getImageId);
imgsRouter.delete("/:id_img", authMiddleware.checkToken, imgsController.deleteImg);

imgsRouter.post(
    "/muestra/:id_muestra",
    authMiddleware.checkToken,
    upload.single("imagen"),
    imgsController.uploadImagenMuestra
);


module.exports = imgsRouter;