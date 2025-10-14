module.exports = {
criarAdvogado: {
type: 'object',
required: ['nome', 'oab'],
additionalProperties: false,
properties: {
nome: { type: 'string', minLength: 2 },
oab: { type: 'string', minLength: 3 },
especialidade: { type: 'string' }
}
}
};