const express = require("express");
const muestrasRouter = express.Router();
const muestraController = require("../controllers/muestraController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

muestrasRouter.get("/" , muestraController.getAllMuestras);

// Rutas publicas



// Rutas token




module.exports = muestrasRouter;