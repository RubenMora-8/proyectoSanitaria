const Cassete = require("./models/Cassete");
const Imagen = require("./models/Imagen");
const Muestra = require("./models/Muestra");
const Tecnico = require("./models/Tecnico");

// Relacion 1 a N entre Tecnico y Cassete
Tecnico.hasMany(Cassete, { foreignKey: "id_tec" });
Cassete.belongsTo(Tecnico, { foreignKey: "id_tec" });

// Relacion 1 a N entre Cassete y muestra
Cassete.hasMany(Muestra, { foreignKey: "id_cas" });
Muestra.belongsTo(Cassete, { foreignKey: "id_cas" });

// Relacion 1 a N entre Muestra e Imagen
Muestra.hasMany(Imagen, { foreignKey: "id_muestra" });
Imagen.belongsTo(Muestra, { foreignKey: "id_muestra" });

module.exports = {
    Cassete,
    Imagen,
    Muestra,
    Tecnico
};