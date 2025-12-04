# Guia de Inicialização - Versão WEB

Este guia explica como rodar o projeto Shaveasy no modo Web (Navegador).

## Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

1.  **Node.js** (Versão 18 ou superior) - [Baixar aqui](https://nodejs.org/)
2.  **PostgreSQL** (Banco de Dados) - [Baixar aqui](https://www.postgresql.org/download/)
3.  **Git** (Opcional, para clonar o repositório)

---

## Passo 1: Configurar o Banco de Dados

1.  Abra o **pgAdmin 4** (ou seu gerenciador de banco de dados preferido).
2.  Crie um novo banco de dados chamado `shaveasy`.
3.  Certifique-se de que a senha do usuário `postgres` é a mesma configurada no arquivo `.env` (padrão: `senhagree`).

## Passo 2: Configurar o Backend (Servidor)

1.  Abra o terminal na pasta raiz do projeto (`shaveasy`).
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Crie as tabelas no banco de dados:
    ```bash
    npx prisma migrate dev --name init
    ```
4.  Inicie o servidor:
    ```bash
    npm run dev
    ```
    *Você deve ver a mensagem: "Servidor rodando na porta 3333"*

## Passo 3: Configurar o Frontend (Web)

1.  Abra um **novo terminal** (mantenha o do backend rodando).
2.  Entre na pasta do aplicativo móvel:
    ```bash
    cd client-mobile
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o projeto no modo Web:
    ```bash
    npx expo start --web
    ```
5.  O navegador deve abrir automaticamente em `http://localhost:8081`.

## Observações Importantes

*   **Login:** Use o email e senha cadastrados.
*   **Erro de Conexão:** Se der erro de conexão, verifique se o backend está rodando na porta 3333.
*   **Navegador:** O modo Web usa `localhost`, então não precisa configurar IP.
