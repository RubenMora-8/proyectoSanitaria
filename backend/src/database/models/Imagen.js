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
            type: DataTypes.STRING(700),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "La imagen es un campo obligatorio"
                },
                notEmpty: {
                    msg: "El campo imagen no puede ir vacío"
                },
                len: {
                    args: [0, 100],
                    msg: "El tamaño del campo Imagen no puede superar 700 caracteres"
                }
            }
        }
    },
    {
        sequelize,
        tableName: "imagenes",
        timestamps: false
    }
)

module.exports = Imagen;