const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Advogado = require('./advogado');
const Processo = require('./processo');


module.exports = { sequelize, Usuario, Advogado, Processo };