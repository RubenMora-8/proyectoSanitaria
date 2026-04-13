const jwt = require("jwt-simple");
const moment = require("moment")

const checkToken = (req, res, next) => {
  const userToken = req.headers["user-token"];
  let payload = {};

  if (!userToken) {
    return res.json({ error: "Falta Token" });
  }

  try {
    payload = jwt.decode(userToken, "frase para probar .env");
  } catch (error) {
    return res.json({ error: "Token incorrecto" });
  }

  if (payload.expiredAt < moment().unix()) {
    return res.json({
      error: "El token ha expirado tiene que volver a loguearte",
    });
  }
  next();
};

module.exports = { checkToken };
