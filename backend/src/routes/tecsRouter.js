const express = require("express");
const tecsRouter = express.Router();
const tecsController = require("../controllers/tecsController.js");

tecsRouter.get("/" , tecsController.getAllTecs);
tecsRouter.post("/" , tecsController.findTecMail);
tecsRouter.post("/register" , tecsController.registerTec);

module.exports = tecsRouter;