import { Sequelize, DataTypes, } from 'sequelize';
import { sequelize } from '../db.js';

export const User = sequelize.define(
    'usuarios',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        timestamps: false,
        tableName: 'usuarios'
    }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true