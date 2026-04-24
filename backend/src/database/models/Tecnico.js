const sequelize = require("../conection.js");
const { Model, DataTypes } = require("sequelize");

class Tecnico extends Model { };

Tecnico.init(
    {
        id_tec: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            notNull: {
                msg: "El nombre es un campo obligatorio"
            },
            validate: {
                notEmpty: {
                    msg: "El nombre no puede ir vacío"
                },
                len: {
                    args: [6, 100],
                    msg: "El tamaño del nombre debe ser de entre 6 y 100 caracteres"
                }
            }
        },
        apellidos: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El apellido es un campo obligatorio"
                },
                notEmpty: {
                    msg: "El campo apellidos no puede ir vacío"
                },
                len: {
                    args: [6, 100],
                    msg: "El tamaño del campo apellidos debe ser de entre 6 y 100 caracteres"
                }
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                msg: "Email ya registrado"
            },
            validate: {
                isEmail: {
                    msg: "El campo email debe contener un email con el formato correcto"
                },
                notNull: {
                    msg: "Email es campo obligatorio"
                },
                notEmpty: {
                    msg: "El campo email no puede ir vacío"
                },
                len: {
                    args: [6, 100],
                    msg: "El tamaño del email debe ser de entre 6 y 100 caracteres"
                },
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "La contraseña es un campo obligatorio"
                },
                notEmpty: {
                    msg: "El campo contraseña está vacío"
                }
            }
        },
        centro: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El centro es un campo obligatorio"
                },
                notEmpty: {
                    msg: "El campo centro está vacío"
                }
            }
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            /*
            validate: {
                isNumeric: {
                    msg: "El campo tipo debe ser un valor numérico"
                },
                notNull: {
                    msg: "El tipo es un campo obligatorio"
                },
                notEmpty: {
                    msg: "El campo tipo está vacío"
                }
            }
            */
        }
    },
    {
        sequelize,
        tableName: "tecnicos",
        timestamps: false
    }
)

module.exports = Tecnico;