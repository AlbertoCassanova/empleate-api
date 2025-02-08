import { DataTypes, } from 'sequelize';
import { sequelize } from '../db.ts';

export const Negocios = sequelize.define(
    'negocios',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creadoPor: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "usuarios",
                key: "id"
            }
        }
    },
    {
        timestamps: true,
        tableName: 'negocios'
    }
);