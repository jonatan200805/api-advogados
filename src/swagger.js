module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API de Advogados e Processos',
    version: '1.0.0',
    description:
      'Documentação da API para gerenciamento de advogados, usuários e processos judiciais.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  paths: {
    '/usuario': {
      post: {
        summary: 'Cadastrar novo usuário',
        tags: ['Usuário'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string' },
                  email: { type: 'string' },
                  senha: { type: 'string' },
                },
                required: ['nome', 'email', 'senha'],
              },
            },
          },
        },
        responses: {
          201: { description: 'Usuário criado com sucesso' },
        },
      },
    },
    '/usuario/login': {
      post: {
        summary: 'Fazer login e obter token JWT',
        tags: ['Usuário'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  senha: { type: 'string' },
                },
                required: ['email', 'senha'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Login realizado com sucesso' },
          401: { description: 'Credenciais inválidas' },
        },
      },
    },
    '/advogados': {
      get: {
        summary: 'Listar todos os advogados',
        tags: ['Advogado'],
        responses: {
          200: { description: 'Lista de advogados retornada com sucesso' },
        },
      },
      post: {
        summary: 'Cadastrar novo advogado',
        tags: ['Advogado'],
        responses: {
          201: { description: 'Advogado criado com sucesso' },
        },
      },
    },
    '/advogados/{id}': {
      get: {
        summary: 'Buscar advogado por ID',
        tags: ['Advogado'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'Advogado encontrado' },
          404: { description: 'Advogado não encontrado' },
        },
      },
      put: {
        summary: 'Atualizar advogado',
        tags: ['Advogado'],
        responses: {
          200: { description: 'Advogado atualizado' },
        },
      },
      delete: {
        summary: 'Excluir advogado',
        tags: ['Advogado'],
        responses: {
          200: { description: 'Advogado excluído com sucesso' },
        },
      },
    },
    '/advogados/{id_advogado}/processos': {
      get: {
        summary: 'Listar processos de um advogado',
        tags: ['Processo'],
        parameters: [
          {
            name: 'id_advogado',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'Lista de processos retornada' },
        },
      },
      post: {
        summary: 'Criar processo para advogado',
        tags: ['Processo'],
        responses: {
          201: { description: 'Processo criado com sucesso' },
        },
      },
    },
  },
};