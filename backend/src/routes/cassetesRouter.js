const express = require("express");
const casseteRouter = express.Router();
const casseteController = require("../controllers/casseteController.js");

casseteRouter.get("/" , casseteController.getAllCassetes);

module.exports = casseteRouter;