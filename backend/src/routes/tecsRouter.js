const express = require("express");
const tecsRouter = express.Router();
const tecsController = require("../controllers/tecsController.js");

tecsRouter.get("/" , tecsController.getAllTecs);

module.exports = tecsRouter;