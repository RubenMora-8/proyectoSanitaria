const Cassete = require("./models/Cassete");
const Imagen = require("./models/Imagen");
const Muestra = require("./models/Muestra");
const Tecnico = require("./models/Tecnico");

// Relacion 1 a N entre Tecnico y Cassete
Tecnico.hasMany(Cassete, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Cassete.belongsTo(Tecnico);

// Relacion 1 a N entre Tecnico y Muestra
Tecnico.hasMany(Muestra, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Muestra.belongsTo(Tecnico);

// Relacion 1 a N entre Cassete e Imagen
Cassete.hasMany(Imagen, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Imagen.belongsTo(Cassete);

// Relacion 1 a N entre Muestra e Imagen
Muestra.hasMany(Imagen, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Imagen.belongsTo(Muestra);

// Relacion 1 a N entre Cassete y Muestra
Muestra.hasMany(Cassete, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Cassete.belongsTo(Muestra);

module.exports = {
    Cassete,
    Imagen,
    Muestra,
    Tecnico
};