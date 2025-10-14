const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);


module.exports = (schema) => (req, res, next) => {
const validate = ajv.compile(schema);
const valid = validate(req.body);
if (!valid) {
const errors = validate.errors.map(e => `${e.instancePath} ${e.message}`).join(', ');
return res.status(400).json({ message: 'Dados inválidos', details: validate.errors });
}
next();
};