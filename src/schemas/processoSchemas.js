module.exports = {
criarProcesso: {
type: 'object',
required: ['numero_processo', 'status'],
additionalProperties: false,
properties: {
numero_processo: { type: 'string', minLength: 3 },
descricao: { type: 'string' },
status: { type: 'string' }
}
}
};