const express = require("express");
const tecsRouter = express.Router();
const tecsController = require("../controllers/tecsController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

tecsRouter.get("/" , tecsController.getAllTecs);

// Rutas publicas

tecsRouter.post("/login" , tecsController.loginTec);
tecsRouter.post("/register" , tecsController.registerTec);
tecsRouter.delete("/:id" , tecsController.deleteTec);

// Rutas token



module.exports = tecsRouter;