import { DataTypes, } from 'sequelize';
import { sequelize } from '../db.ts';

const Negocios = sequelize.define(
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
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        verificado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    },
    {
        timestamps: true,
        tableName: 'negocios'
    }
);

export { Negocios };