import { DataTypes, } from 'sequelize';
import { sequelize } from '../db.ts';

export const User = sequelize.define(
    'usuarios',
    {
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
        }
    },
    {
        timestamps: false,
        tableName: 'usuarios'
    }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true