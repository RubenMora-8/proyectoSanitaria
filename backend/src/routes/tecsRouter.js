const express = require("express");
const tecsRouter = express.Router();
const tecsController = require("../controllers/tecsController.js");
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

// Rutas token

tecsRouter.post("/login", tecsController.loginTec);
tecsRouter.post("/register", tecsController.registerTec);
tecsRouter.post("/password-recovery", tecsController.passwordrecoveryTec);

// Rutas Admin

tecsRouter.get("/", authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.getAllTecs);
tecsRouter.get("/:id", authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.getUserById);
tecsRouter.put("/:id", authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.updateUser);
tecsRouter.put("/:id/password", authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.changeUserPassword);
tecsRouter.put("/:id/update", authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.updateUserToAdmin);
tecsRouter.delete("/:id", authMiddleware.checkToken, authMiddleware.checkAdmin, tecsController.deleteTec);

module.exports = tecsRouter;