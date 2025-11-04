const app = require('./app'); // <--- CORRIGIDO: Agora aponta para 'app.js' na mesma pasta 'src'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Para usuários: http://localhost:${PORT}/api/usuarios`);
    console.log(`Para advogados: http://localhost:${PORT}/api/advogados`);
});