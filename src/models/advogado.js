const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Advogado = sequelize.define('Advogado', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
nome: { type: DataTypes.STRING, allowNull: false },
oab: { type: DataTypes.STRING, allowNull: false, unique: true },
especialidade: { type: DataTypes.STRING, allowNull: true },
}, {
tableName: 'advogado',
timestamps: false,
});


module.exports = Advogado;