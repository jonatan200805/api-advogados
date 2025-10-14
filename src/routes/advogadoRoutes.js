const express = require('express');
const router = express.Router();
const advogadoController = require('../controllers/advogadoController');
const validate = require('../middlewares/validateAjv');
const auth = require('../middlewares/auth');
const {
  schemaCriarAdvogado,
  schemaAtualizarAdvogado,
} = require('../schemas/advogadoSchemas');

// Todas as rotas são protegidas
router.get('/', auth, advogadoController.listar);
router.get('/:id', auth, advogadoController.buscarPorId);
router.post('/', auth, validate(schemaCriarAdvogado), advogadoController.criar);
router.put('/:id', auth, validate(schemaAtualizarAdvogado), advogadoController.atualizar);
router.delete('/:id', auth, advogadoController.deletar);

module.exports = router;