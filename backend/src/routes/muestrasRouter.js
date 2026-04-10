const express = require("express");
const muestrasRouter = express.Router();
const muestraController = require("../controllers/muestraController.js");

muestrasRouter.get("/" , muestraController.getAllMuestras);

module.exports = muestrasRouter;