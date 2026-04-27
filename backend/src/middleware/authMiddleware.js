// middleware/authMiddleware.js
const authService = require("../services/authService.js");

const checkToken = (req, res, next) => {

    
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }
    
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Formato incorrecto. Hay que usar: Bearer <token>" });
    }
    
    const token = authHeader.substring(7);
    
    const verification = authService.verifyToken(token);
    
    if (!verification.success) {
        return res.status(401).json({ error: verification.error });
    }
    
    req.user = verification.user;
    next();
};

const checkAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: "No autenticado" });
    }
    
    if (req.user.tipo !== 1) {
        return res.status(403).json({ error: "Se requiere ser administrador" });
    }
    
    next();
};

module.exports = {
    checkToken,
    checkAdmin
};