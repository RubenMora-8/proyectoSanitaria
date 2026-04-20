const express = require("express");
const casseteRouter = express.Router();
const casseteController = require("../controllers/casseteController.js");

casseteRouter.get("/" , casseteController.getAllCassetes);
casseteRouter.post("/" , casseteController.createCassete);
casseteRouter.delete("/:id_cas" , casseteController.deleteCassete);

module.exports = casseteRouter;