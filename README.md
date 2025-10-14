````markdown
# 🧑‍⚖️ API RESTful - Sistema de Controle de Advogados e Processos

Este projeto é uma **API RESTful** desenvolvida em **Node.js com Express** que permite gerenciar **usuários**, **advogados** e **processos judiciais**.  
Foi criada para um escritório de advocacia, onde **apenas usuários autenticados** podem cadastrar, atualizar e excluir dados.

---

## 🚀 Objetivo

Aplicar conceitos de desenvolvimento **back-end** com:

- Arquitetura **MVC**
- Banco de dados **MySQL**
- ORM **Sequelize**
- Autenticação com **JWT (JSON Web Token)**
- Validação com **AJV**
- Documentação automática com **Swagger**

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── controllers/ → Lógica de negócio
├── middlewares/ → Autenticação, validação e erros
├── models/ → Modelos Sequelize (tabelas do banco)
├── routes/ → Rotas da API
├── schemas/ → Schemas AJV para validação
├── swagger.js → Configuração da documentação Swagger
├── app.js → Configuração principal do Express
└── server.js → Inicialização do servidor
````

---

## 💻 Pré-requisitos

Antes de começar, é necessário ter instalado:

* Node.js (v18+)
* MySQL (v8+)
* Git
* Insomnia ou Postman

---

## 🧩 Passo a passo para rodar o projeto (para iniciantes)

### 🧩 1️⃣ Baixar o projeto

Abra o terminal (ou Git Bash) e execute:

```bash
git clone https://github.com/jonatan200805/api-advogados.git
```

💡 Ou, se preferir, baixe o arquivo ZIP do repositório e extraia em seu computador.

---

### 📁 2️⃣ Acessar a pasta do projeto

```bash
cd api-advogados
```

---

### ⚙️ 3️⃣ Instalar as dependências

```bash
npm install
```

Isso vai baixar todas as bibliotecas necessárias (Express, Sequelize, JWT, Ajv, etc).

---

### 🛢️ 4️⃣ Configurar o banco de dados

Crie um banco de dados MySQL com o nome `advogados_db`:

```sql
CREATE DATABASE advogados_db;
```

Depois, crie um arquivo `.env` na raiz do projeto com as seguintes informações:

```ini
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=advogados_db
JWT_SECRET=meusegredo123
PORT=3000
```

⚠️ Substitua `sua_senha` pela senha real do seu MySQL.

---

### ▶️ 5️⃣ Executar o projeto

```bash
npm run dev
```

Se tudo estiver certo, você verá no terminal:

```
✅ Conexão com o banco de dados estabelecida!
🚀 Servidor rodando na porta 3000
```

💡 Se o `sequelize.sync()` estiver habilitado, as tabelas serão criadas automaticamente.

---

### 📘 6️⃣ Acessar a documentação (Swagger)

Abra o navegador e entre em:

👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

📘 Dica: No Swagger UI, use o botão “Authorize” para inserir seu token JWT e testar as rotas protegidas.

---

## 🔐 Autenticação

### 👤 Criar usuário

**POST** `/usuario`

```json
{
  "nome": "Maria Silva",
  "email": "maria@teste.com",
  "senha": "123456"
}
```

Retorna um token JWT.

---

### 🔑 Fazer login

**POST** `/usuario/login`

```json
{
  "email": "maria@teste.com",
  "senha": "123456"
}
```

Copie o token retornado e envie nas próximas requisições no cabeçalho:

```makefile
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## ⚖️ Endpoints principais

### 👤 Usuário

| Método | Rota             | Descrição                 |
| :----: | :--------------- | :------------------------ |
|  POST  | `/usuario`       | Cria novo usuário         |
|  POST  | `/usuario/login` | Faz login e retorna token |

### 🧑‍⚖️ Advogado

| Método | Rota             | Descrição                |
| :----: | :--------------- | :----------------------- |
|   GET  | `/advogados`     | Lista todos os advogados |
|  POST  | `/advogados`     | Cadastra novo advogado   |
|   PUT  | `/advogados/:id` | Atualiza advogado        |
| DELETE | `/advogados/:id` | Remove advogado          |

### 📁 Processo

| Método | Rota                                | Descrição                      |
| :----: | :---------------------------------- | :----------------------------- |
|   GET  | `/advogados/:id_advogado/processos` | Lista processos de um advogado |
|  POST  | `/advogados/:id_advogado/processos` | Cria novo processo             |

---

## 🧠 Tecnologias utilizadas

* 🟢 Node.js
* ⚙️ Express
* 🗃️ Sequelize (ORM)
* 🐬 MySQL
* 🔐 JWT (autenticação)
* ✅ AJV (validação de dados)
* 📘 Swagger (documentação)

---

## 💾 Diagrama do Banco de Dados (ERD)

```plaintext
┌─────────────────────────┐
│        usuario          │
├─────────────────────────┤
│ id (PK)                 │
│ nome (VARCHAR)          │
│ email (VARCHAR, UNIQUE) │
│ senha (VARCHAR)         │
└─────────────────────────┘


┌─────────────────────────┐
│       advogado          │
├─────────────────────────┤
│ id (PK)                 │
│ nome (VARCHAR)          │
│ oab (VARCHAR, UNIQUE)   │
│ especialidade (VARCHAR) │
└─────────────────────────┘
             │
             │ 1:N
             ▼
┌─────────────────────────┐
│        processo         │
├─────────────────────────┤
│ id (PK)                 │
│ numero_processo (UNIQUE)│
│ descricao (TEXT)        │
│ status (VARCHAR)        │
│ id_advogado (FK)        │───► advogado.id
└─────────────────────────┘
```

### 🔗 Relações

* Usuário → acessa o sistema (autenticação JWT)
* Advogado → cadastrado no sistema
* Processo → pertence a um advogado (relação 1:N)

💡 **Observações:**

* Não é possível excluir um advogado que tenha processos vinculados.
* Senhas são armazenadas com hash (**bcrypt**).
* O campo `numero_processo` é **único** para garantir integridade.

---

## 🧾 Licença

📄 Este projeto foi desenvolvido apenas para fins **educacionais**.
Sinta-se livre para clonar e adaptar conforme sua necessidade.

---

## 👨‍🏫 Créditos

**Desenvolvido por:** [Jonatan Cordova]
💻 Curso: *Desenvolvimento Back-End com Node.js*
📚 Projeto baseado em: *Game-API / api-players-express*

```

---

Se você quiser, posso agora:
- ✅ **Adicionar o diagrama ERD como imagem real** no final (para aparecer no GitHub visualmente);  
ou  
- 📘 **Gerar o README.md como arquivo** pronto para download.  

Qual prefere?
```
