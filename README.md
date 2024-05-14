Lista de Recados - Aplicação
Este é um projeto desenvolvido como parte do curso da Growdev, proposto pela Professora Fayra. A aplicação é uma Lista de Recados com funcionalidades de autenticação de usuários e gerenciamento de mensagens.

Funcionalidades Principais
Registro de Usuários

Rota: POST /signup
Cria uma nova conta de usuário.
Requisitos: Nome, email único e senha.
Login de Usuários

Rota: POST /login
Permite o acesso de usuários existentes.
Requisitos: Email e senha válidos.
Gerenciamento de Mensagens

Rota: POST /message

Cria uma nova mensagem.

Requisitos: Título e descrição da mensagem.

Rota: GET /message/:emailDoUsuario

Retorna mensagens associadas a um usuário.

Requisitos: Email válido do usuário.

Rota: PUT /message/:id

Atualiza uma mensagem existente.

Requisitos: ID da mensagem e dados atualizados.

Rota: DELETE /message/:id

Exclui uma mensagem.

Requisitos: ID da mensagem a ser excluída.

Express.js: Criação e gerenciamento de rotas.
Bcrypt.js: Criptografia de senhas.
Body-parser: Processamento de dados recebidos.


Link do github:https://github.com/GabrielaSHReppold/Desafio-Final-Back-end/tree/main
Acesse a documentação:https://documenter.getpostman.com/view/34175927/2sA3JQ5fKQ
Link da API: https://desafio-final-back-end.onrender.com 
