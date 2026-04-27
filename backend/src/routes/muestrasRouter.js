const express = require("express");
const muestrasRouter = express.Router();
const muestraController = require("../controllers/muestraController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Rutas publicas

// Rutas token

// Alumno

muestrasRouter.get("/", authMiddleware.checkToken, muestraController.getAllMuestras);
muestrasRouter.get("/:id_cas", authMiddleware.checkToken, muestraController.getAllMuestrasCassete);
muestrasRouter.get("/muestra/:id_muestra", authMiddleware.checkToken, muestraController.getMuestraId);

// Admin

muestrasRouter.delete("/:id_muestra", authMiddleware.checkToken, authMiddleware.checkAdmin, muestraController.deleteMuestra);


module.exports = muestrasRouter;