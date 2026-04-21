const express = require("express");
const casseteRouter = express.Router();
const casseteController = require("../controllers/casseteController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

casseteRouter.get("/" , casseteController.getAllCassetes);
casseteRouter.post("/" , casseteController.createCassete);
casseteRouter.delete("/:id_cas" , casseteController.deleteCassete);

// Rutas publicas



// Rutas token




module.exports = casseteRouter;