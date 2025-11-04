// C:\Users\alunolages\Documents\jonatan\advogado\api-advogados\src\app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config(); // Para carregar variáveis de ambiente como JWT_SECRET

// Importar as rotas
// CORREÇÃO AQUI: Os caminhos agora são relativos à pasta 'src' onde 'app.js' está.
const usuarioRoutes = require('./routes/usuarioRoutes'); 
const advogadoRoutes = require('./routes/advogadoRoutes');

// Middlewares
app.use(bodyParser.json()); // ou express.json()
app.use(bodyParser.urlencoded({ extended: true })); // Para dados de formulário

// Usar as rotas
app.use('/api/usuarios', usuarioRoutes); // Todas as rotas em usuarioRoutes começarão com /api/usuarios
app.use('/api/advogados', advogadoRoutes); // Todas as rotas em advogadoRoutes começarão com /api/advogados

// Rota de teste
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

module.exports = app; // É comum exportar o 'app' para que o 'server.js' possa iniciá-lo