const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validate = require('../middlewares/validateAjv');
const {
  schemaCriarUsuario,
  schemaLoginUsuario,
} = require('../schemas/usuarioSchemas');

// Cadastro e login públicos
router.post('/', validate(schemaCriarUsuario), usuarioController.criar);
router.post('/login', validate(schemaLoginUsuario), usuarioController.login);

module.exports = router;