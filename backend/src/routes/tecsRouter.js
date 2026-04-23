const express = require("express");
const tecsRouter = express.Router();
const tecsController = require("../controllers/tecsController.js");
const authMiddleware = require("../middleware/authMiddleware.js");


// Rutas publicas

tecsRouter.post("/login" , tecsController.loginTec);
tecsRouter.post("/register" , tecsController.registerTec);
// tecsRouter.post(/"password-recovery" , tecsController.passwordrecoveryTec);

// Rutas token

// Admin
tecsRouter.get("/", authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.getAllTecs);
tecsRouter.delete("/:id" , authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.deleteTec);

// Usuario

module.exports = tecsRouter;