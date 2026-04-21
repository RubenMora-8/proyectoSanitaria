const express = require("express");
const muestrasRouter = express.Router();
const muestraController = require("../controllers/muestraController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

muestrasRouter.get("/" , muestraController.getAllMuestras);
muestrasRouter.get("/:id_cas" , muestraController.getAllMuestrasCassete);
muestrasRouter.get("/muestra/:id_muestra" , muestraController.getMuestraId);

// Rutas publicas



// Rutas token




module.exports = muestrasRouter;