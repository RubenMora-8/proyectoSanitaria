const express = require("express");
const tecsRouter = express.Router();
const tecsController = require("../controllers/tecsController.js");
const nodemailerController = require("../controllers/nodemailerController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Debug
tecsRouter.get("/test-token", authMiddleware.checkToken, (req, res) => {
    console.log("Token válido!");
    console.log("Usuario:", req.user);
    res.json({ 
        success: true, 
        message: "Token funciona correctamente",
        user: req.user 
    });
});

// Rutas publicas

tecsRouter.post("/login" , tecsController.loginTec);
tecsRouter.post("/register" , tecsController.registerTec);
tecsRouter.post("/password-recovery" , nodemailerController.sendMailPass);

// Rutas token

// Usuario

// Admin
tecsRouter.get("/", authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.getAllTecs);
tecsRouter.delete("/:id" , authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.deleteTec);

module.exports = tecsRouter;