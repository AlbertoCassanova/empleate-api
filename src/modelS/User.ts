import { DataTypes, } from 'sequelize';
import { sequelize } from '../db.ts';

export const User = sequelize.define(
    'usuarios',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        editado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        experiencia: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        estudios: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        documento: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fechaNacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        lugarNacimiento: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        direccionIp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fotoPerfil: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        timestamps: false,
        tableName: 'usuarios'
    }
);

console.log(User === sequelize.models.User); // true