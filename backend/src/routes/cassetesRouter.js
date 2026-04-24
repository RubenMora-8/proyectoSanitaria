const express = require("express");
const casseteRouter = express.Router();
const casseteController = require("../controllers/casseteController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Rutas publicas

// Rutas token

//Alumnos

casseteRouter.get("/", authMiddleware.checkToken, casseteController.getAllCassetes);

// Admin

casseteRouter.post("/", authMiddleware.checkToken, authMiddleware.checkAdmin, casseteController.createCassete);
casseteRouter.delete("/:id_cas", authMiddleware.checkToken, authMiddleware.checkAdmin, casseteController.deleteCassete);


module.exports = casseteRouter;