const Cassete = require("./models/Cassete");
const Imagen = require("./models/Imagen");
const Muestra = require("./models/Muestra");
const Tecnico = require("./models/Tecnico");

// Relacion 1 a N entre Tecnico y Cassete
Tecnico.hasMany(Cassete);
Cassete.belongsTo(Tecnico);

// Relacion 1 a N entre Tecnico y Muestra
Tecnico.hasMany(Muestra);
Muestra.belongsTo(Tecnico);

// Relacion 1 a N entre Cassete e Imagen
Cassete.hasMany(Imagen);
Imagen.belongsTo(Cassete);

// Relacion 1 a N entre Muestra e Imagen
Muestra.hasMany(Imagen);
Imagen.belongsTo(Muestra);

// Relacion 1 a 1 o 1 a N entre Cassete y Muestra
Cassete.belongsTo(Muestra);
Muestra.hasMany(Cassete);

module.exports = {
    Cassete,
    Imagen,
    Muestra,
    Tecnico
};