const express = require("express");
const imgsRouter = express.Router();
const imgsController = require("../controllers/imgController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

imgsRouter.get("/" , imgsController.getAllImgs);

// Rutas publicas



// Rutas token




module.exports = imgsRouter;