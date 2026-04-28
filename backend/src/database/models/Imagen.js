const sequelize = require("../conection.js");
const { Model, DataTypes } = require("sequelize");

class Imagen extends Model { };

Imagen.init(
    {
        id_img: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imagen: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
            validate: {
                notNull: { msg: "La imagen es un campo obligatorio" },
                notEmpty: { msg: "El campo imagen no puede ir vacío" }
            }
        },
        id_muestra: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "imagenes",
        timestamps: true
    }
)

module.exports = Imagen;