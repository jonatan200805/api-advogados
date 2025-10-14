const express = require('express');
const router = express.Router({ mergeParams: true });
const processoController = require('../controllers/processoController');
const validate = require('../middlewares/validateAjv');
const auth = require('../middlewares/auth');
const { schemaCriarProcesso } = require('../schemas/processoSchemas');

// Listar todos os processos de um advogado
router.get('/', auth, processoController.listarPorAdvogado);

// Criar processo vinculado a um advogado
router.post('/', auth, validate(schemaCriarProcesso), processoController.criar);

// (Opcional) deletar processo
router.delete('/:id', auth, processoController.deletar);

module.exports = router;