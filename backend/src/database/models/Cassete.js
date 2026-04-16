const sequelize = require("../conection.js");
const { Model, DataTypes } = require("sequelize");

class Cassete extends Model { };

Cassete.init(
    {
        id_cas: {
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
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: "El tamaño de las observaciones no puede superar 700 caracteres"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: "El tamaño de la descripcion no puede superar 100 caracteres"
                }
            }
        },
        caracteristicas: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 100],
                    msg: "El tamaño de las características no puede superar 100 caracteres"
                }
            }
        },
        qr_cassete: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El QR es un campo obligatorio"
                },
                notEmpty: {
                    msg: "El campo QR no puede ir vacío"
                },
                len: {
                    args: [0, 100],
                    msg: "El tamaño del campo QR no puede superar 50 caracteres"
                }
            }
        },
        organo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El órgano es un campo obligatorio"
                },
                notEmpty: {
                    msg: "El campo órgano no puede ir vacío"
                },
                len: {
                    args: [0, 100],
                    msg: "El tamaño del campo órgano no puede superar 50 caracteres"
                }
            }
        }
    },
    {
        sequelize,
        tableName: "cassetes",
        timestamps: false
    }
)

module.exports = Cassete;