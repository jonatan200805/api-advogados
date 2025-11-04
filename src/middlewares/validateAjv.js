// src/middlewares/validateAjv.js

const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Criação da instância do AJV com opções de configuração
const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);

/**
 * Middleware para validação de dados de entrada usando AJV
 * @param {object} schema - O esquema JSON a ser utilizado na validação
 * @returns {function} Middleware Express
 */
module.exports = (schema) => (req, res, next) => {
  console.log('Schema recebido em validateAjv:', schema);
  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (!valid) {
    // Formatação dos erros para uma mensagem mais informativa
    const errors = validate.errors.map(e => {
      return `${e.instancePath} (${JSON.stringify(e.data)}) ${e.message}`;
    }).join(', ');

    return res.status(400).json({
      message: 'Dados inválidos',
      details: validate.errors,
      formattedErrors: errors,
    });
  }

  next();
};
