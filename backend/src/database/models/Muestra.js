const sequelize = require("../conection.js");
const { Model, DataTypes } = require("sequelize");

class Muestra extends Model { };

Muestra.init(
    {
        id_muestra: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "La fecha es un campo obligatorio"
                },
                notEmpty: {
                    msg: "La fecha no puede ir vacía"
                },
                isDate: {
                    msg: "El campo fecha debe contener una fecha"
                }
            }
        },
        observaciones: {
            type: DataTypes.STRING(700),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: "El tamaño de las observaciones no puede superar 700 caracteres"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: "El tamaño de la descripcion no puede superar 100 caracteres"
                }
            }
        },
        tincion: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "La tinción es un campo obligatorio"
                },
                notEmpty: {
                    msg: "El campo tinción no puede ir vacío"
                },
                len: {
                    args: [0, 100],
                    msg: "El tamaño del campo tinción no puede superar 50 caracteres"
                }
            }
        },
        qr_muestra: {
            type: DataTypes.BLOB('long'), 
            allowNull: false
        },
        id_cas: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "muestras",
        timestamps: false
    }
)

module.exports = Muestra;