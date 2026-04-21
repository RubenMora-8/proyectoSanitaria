const authService = require("../services/authService.js");

const getToken = (cabecera) => {
    if (!cabecera) return null;
    const partes = cabecera.split(' ');
    return partes[0] === 'Bearer' ? partes[1] : null;
};

const checkToken = (req, res, next) => {
    try {
        const token = getToken(req.headers.authorization);
        
        if (!token) {
            throw new Error('Token no obtenido');
        }
        
        const verificacion = authService.verifyToken(token);
        
        if (!verificacion.exitoso) {
            throw new Error(verificacion.error);
        }
        
        req.datosUsuario = verificacion.usuario;
        next();
        
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const checkAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            error: "No autentificado"
        });
    }
    
    if (req.user.tipo !== 1) {
        return res.status(403).json({
            error: "Acceso denegado. Tienes que ser admin"
        });
    }
    
    next();
};


module.exports = {
    checkToken,
    checkAdmin,
};