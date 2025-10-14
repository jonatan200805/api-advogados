const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const errorHandler = require('./middlewares/errorHandler');

// Rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const advogadoRoutes = require('./routes/advogadoRoutes');
const processoRoutes = require('./routes/processoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas principais
app.use('/usuario', usuarioRoutes);
app.use('/advogados', advogadoRoutes);
app.use('/advogados/:id_advogado/processos', processoRoutes);

// Middleware de erro global
app.use(errorHandler);

module.exports = app;
