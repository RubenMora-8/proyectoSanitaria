const jwt = require('jwt-simple');

const JWT_SECRET = process.env.JWT_SECRET || "clavejwt";

const generateToken = (user) => {
    
    const payload = {
        id: user.id_tec,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        centro: user.centro,
        tipo: user.tipo,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (1 * 24 * 60 * 60)
    };
    
    const token = jwt.encode(payload, JWT_SECRET);
    return token;
};

const verifyToken = (token) => {
    try {
        const payload = jwt.decode(token, JWT_SECRET);
        
        const ahora = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < ahora) {
            return { success: false, error: "Token expirado" };
        }
        
        return { success: true, user: payload };
    } catch (error) {
        return { success: false, error: "Token no valido" };
    }
};

module.exports = {
    generateToken,
    verifyToken
};