const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Advogado = require('./advogado');


const Processo = sequelize.define('Processo', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
numero_processo: { type: DataTypes.STRING, allowNull: false, unique: true },
descricao: { type: DataTypes.TEXT, allowNull: true },
status: { type: DataTypes.STRING, allowNull: false },
id_advogado: { type: DataTypes.INTEGER, allowNull: false },
}, {
tableName: 'processo',
timestamps: false,
});


// Associação (1:N)
Advogado.hasMany(Processo, { foreignKey: 'id_advogado', onDelete: 'RESTRICT' });
Processo.belongsTo(Advogado, { foreignKey: 'id_advogado' });


module.exports = Processo;