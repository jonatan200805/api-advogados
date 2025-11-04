const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController'); // Caminho relativo ao routes/
const validate = require('../middlewares/validateAjv'); // Caminho relativo ao routes/
const { schemaCriarUsuario, schemaLoginUsuario } = require('../schemas/usuarioSchemas'); // Caminho relativo ao routes/

router.post('/', validate(schemaCriarUsuario), usuarioController.criar);
router.post('/login', validate(schemaLoginUsuario), usuarioController.login);

module.exports = router;