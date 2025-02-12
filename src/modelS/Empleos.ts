import { DataTypes, } from 'sequelize';
import { sequelize } from '../db.ts';

export const Empleos = sequelize.define(
    "empleos",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sueldo: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        creadoPor: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "negocios",
                key: "id"
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
    },
    {
        tableName: 'empleos',
        timestamps: true
    }
)