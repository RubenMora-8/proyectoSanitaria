const express = require("express");
const imgsRouter = express.Router();
const imgsController = require("../controllers/imgController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Rutas publicas

// Rutas token

// ALumnos

imgsRouter.get("/", authMiddleware.checkToken, imgsController.getAllImgs);
imgsRouter.get("/:id_muestra", authMiddleware.checkToken, imgsController.getAllImgsMuestra);
imgsRouter.get("/imagen/:id_img", authMiddleware.checkToken, imgsController.getImageId);

// Admin

imgsRouter.delete("/:id_img", authMiddleware.checkToken, authMiddleware.checkAdmin, imgsController.deleteImg);

module.exports = imgsRouter;