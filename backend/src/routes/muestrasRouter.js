const express = require("express");
const muestrasRouter = express.Router();
const muestraController = require("../controllers/muestraController.js");

muestrasRouter.get("/" , muestraController.getAllMuestras);
muestrasRouter.get("/:id_cas" , muestraController.getAllMuestrasCassete);
muestrasRouter.get("/muestra/:id_muestra" , muestraController.getMuestraId);

module.exports = muestrasRouter;