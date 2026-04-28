const express = require("express");
const casseteRouter = express.Router();
const casseteController = require("../controllers/casseteController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Rutas publicas

// Rutas token

//Alumnos y Admin

casseteRouter.get("/", authMiddleware.checkToken, casseteController.getAllCassetes);
casseteRouter.post("/", authMiddleware.checkToken, casseteController.createCassete);
casseteRouter.delete("/:id_cas", authMiddleware.checkToken, casseteController.deleteCassete);


module.exports = casseteRouter;