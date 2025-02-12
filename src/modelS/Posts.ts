import { DataTypes, } from 'sequelize';
import { sequelize } from '../db.ts';

export const Posts = sequelize.define(
    'posts',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true,
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        creadoPor: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "usuarios",
                key: "id"
            }
        },
        numeroComentarios: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        tableName: 'Posts',
        timestamps: true
    }
);