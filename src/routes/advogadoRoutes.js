// C:\Users\alunolages\Documents\jonatan\advogado\api-advogados\src\routes\advogadoRoutes.js
const express = require('express');
const router = express.Router();
const advogadoController = require('../controllers/advogadoController');
// const validate = require('../middlewares/validateAjv'); // Se você tiver validação para advogados
// const { schemaCriarAdvogado, schemaAtualizarAdvogado } = require('../schemas/advogadoSchemas'); // E schemas

router.get('/', advogadoController.listar);
router.post('/', advogadoController.criar); // ou validate(schemaCriarAdvogado)
router.put('/:id', advogadoController.atualizar); // ou validate(schemaAtualizarAdvogado)
router.delete('/:id', advogadoController.deletar);

module.exports = router;