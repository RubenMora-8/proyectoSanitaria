const express = require("express");
const muestrasRouter = express.Router();
const muestraController = require("../controllers/muestraController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Rutas publicas

// Rutas token

// Alumno y Admin

muestrasRouter.get("/", authMiddleware.checkToken, muestraController.getAllMuestras);
muestrasRouter.post("/", authMiddleware.checkToken, muestraController.createMuestra);
muestrasRouter.get("/:id_cas", authMiddleware.checkToken, muestraController.getAllMuestrasCassete);
muestrasRouter.get("/muestra/:id_muestra", authMiddleware.checkToken, muestraController.getMuestraId);
muestrasRouter.delete("/:id_muestra", authMiddleware.checkToken, muestraController.deleteMuestra);

module.exports = muestrasRouter;