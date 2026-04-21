const express = require("express");
const imgsRouter = express.Router();
const imgsController = require("../controllers/imgController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

imgsRouter.get("/", imgsController.getAllImgs);
imgsRouter.get("/:id_muestra", imgsController.getAllImgsMuestra);
imgsRouter.get("/imagen/:id_img", imgsController.getImageId);
imgsRouter.delete("/:id_img", imgsController.deleteImg);

// Rutas publicas



// Rutas token




module.exports = imgsRouter;