module.exports = {
criarUsuario: {
type: 'object',
required: ['nome', 'email', 'senha'],
additionalProperties: false,
properties: {
nome: { type: 'string', minLength: 2 },
email: { type: 'string', format: 'email' },
senha: { type: 'string', minLength: 6 }
}
},
login: {
type: 'object',
required: ['email', 'senha'],
additionalProperties: false,
properties: {
email: { type: 'string', format: 'email' },
senha: { type: 'string' }
}
}
};