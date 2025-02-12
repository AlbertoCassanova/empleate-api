import { User } from './User.ts';  
import { Negocios } from './Negocios.ts';
import { Empleos } from './Empleos.ts';

User.hasMany(Negocios, {
    foreignKey: 'creadoPor',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});

Negocios.belongsTo(User, {
    foreignKey: 'creadoPor',
    targetKey: 'id'
});

Negocios.hasMany(Empleos,{
    foreignKey: 'creadoPor',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})

Empleos.belongsTo(Negocios, {
    foreignKey: 'creadoPor',
    targetKey: 'id'
})