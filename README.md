# Shaveasy - API Backend

## 1\. Descrição do Projeto

O Shaveasy é uma plataforma móvel (API) criada para revolucionar a forma como barbeiros e clientes se conectam. Esta API de backend (construída em Node.js e PostgreSQL) serve como o motor central para o aplicativo, gerenciando usuários, autenticação, barbearias (multi-tenant), serviços e o sistema de agendamento.

Para os barbeiros, o Shaveasy oferece uma ferramenta moderna de gestão, permitindo organizar a agenda e acompanhar atendimentos.

Este projeto foi desenvolvido como um MVP (Produto Mínimo Viável) acadêmico com foco em uma arquitetura de backend robusta, segura (JWT) e escalável (Multi-Tenancy).

## 2\. Funcionalidades Principais (Estórias de Usuário)

Este backend implementa as seguintes lógicas de negócio:

  * **Cadastro de Cliente:** Permite que novos usuários se cadastrem no sistema.
  * **Login de Cliente:** Autentica usuários (via Email/Senha) e retorna um Token de Acesso JWT.
  * **Criação de Tenant (Admin):** Permite que um `cliente` crie sua própria `Barbearia`, promovendo-o a `admin` do seu próprio *tenant*.
  * **Gerenciamento (Admin):** Permite que o `admin` gerencie os dados da sua barbearia, bem como seus serviços e barbeiros.
  * **Agendamento de Serviços:** Permite que um `cliente` logado crie um novo agendamento.
  * **Lógica Anti-Double Booking:** O sistema impede (retorna erro `409 Conflict`) que um barbeiro tenha dois agendamentos no mesmo horário.
  * **Visualização de Agendamentos (Cliente):** Permite que o cliente logado veja apenas os seus agendamentos futuros.
  * **Visualização da Agenda (Barbeiro):** (Pendente/Neto) Permite ao `admin` ver todos os agendamentos da sua barbearia.

## 3\. Stack Tecnológica (Backend)

  * **Runtime:** Node.js (v24.11)
  * **Framework:** Express.js
  * **Banco de Dados:** PostgreSQL (v18)
  * **ORM:** Prisma (v5+)
  * **Autenticação:** JWT (jsonwebtoken) e Criptografia (Bcrypt)
  * **Ambiente:** `nodemon`, `dotenv`
  * **Testes de API:** Thunder Client

## 4\. Como Rodar o Projeto (Ambiente de Desenvolvimento)

Siga este checklist para configurar e rodar o projeto em uma nova máquina (ex: notebook do professor/avaliador).

### Passo 1: Obter o Código

```bash
# 1. Clone o repositório principal
git clone https://github.com/caiocesargo/shaveasy.git

# 2. Entre na pasta
cd shaveasy

# 3. (IMPORTANTE) Entre na branch de backend principal
# (Substitua pelo nome da branch mesclada final, ex: 'main' ou 'develop')
git checkout feature/joao-auth-setup
```

### Passo 2: Instalar as Dependências

Isto irá instalar o Express, Prisma, Bcrypt, JWT, etc.

```bash
npm install
```

### Passo 3: Configurar o Ambiente Local (Obrigatório)

Este projeto requer o PostgreSQL instalado localmente.

1.  **Instale o PostgreSQL** (v18).

2.  **Abra o PgAdmin** (ou DBeaver) e crie um novo banco de dados vazio chamado **`shaveasy`**.

3.  **Crie o arquivo `.env`:** Na raiz do projeto, crie um arquivo chamado `.env`.

4.  **Preencha o `.env`:** Cole o conteúdo abaixo, mas **substitua `[SUA_SENHA]`** pela senha do seu usuário `postgres` (definida na instalação do PostgreSQL).

    ```bash
    # .env
    DATABASE_URL="postgresql://postgres:[SUA_SENHA]@localhost:5432/shaveasy?schema=public"
    JWT_SECRET="chave-secreta-para-testes-academicos-123456"
    PORT=3333
    ```

### Passo 4: Criar as Tabelas (Migração)

Execute o Prisma para construir todas as 5 tabelas (`usuarios`, `barbearias`, etc.) no seu banco `shaveasy`.

```bash
npx prisma migrate dev
```

### Passo 5: Rodar o Servidor

```bash
npm run dev
```

O terminal deve exibir: `🚀 Servidor rodando na porta 3333`. A API está pronta para receber requisições.

-----

## 5\. 🗺️ Documentação da API (Endpoints)

Todas as rotas (exceto `/register` e `/login`) são **Protegidas** e exigem um Token JWT (Bearer Token) no cabeçalho `Authorization`.

### Domínio: `Autenticação (/auth)`

(Responsável: João)

| Método |       Rota       |   Protegido?     | Descrição |

| `POST` | `/auth/register` | ❌ Não          | Registra um novo `cliente`. |
| `POST` | `/auth/login`    | ❌ Não          | Autentica um usuário e retorna um `token` JWT. |
| `GET` | `/auth/perfil`    | ✅ Sim          | Retorna os dados do usuário (cliente ou admin) logado. |
| `GET` | `/auth/meus-agendamentos` | ✅ Sim  | Lista os agendamentos futuros do `cliente` logado. |

### Domínio: `Barbearias (/barbearias)`

(Responsável: João)

| Método | Rota | Protegido? | Descrição |
| `POST` | `/barbearias` | ✅ Sim | **(Admin)** Cria uma nova barbearia. Promove o usuário `cliente` para `admin` e o vincula à barbearia. |
| `GET` | `/barbearias/minha` | ✅ Sim | **(Admin)** Retorna os dados da barbearia do `admin` logado. |
| `PUT` | `/barbearias/minha` | ✅ Sim | **(Admin)** Atualiza os dados da barbearia do `admin` logado. |

### Domínio: `Agendamento (/agendamento)`

(Responsável: Neto)

| Método | Rota | Protegido? | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/agendamento/servicos` | ✅ Sim | **(Admin)** Cria um novo serviço (ex: Corte, Barba) para a sua barbearia. |
| `GET` | `/agendamento/servicos` | ✅ Sim | **(Admin/Cliente)** Lista todos os serviços da barbearia. |
| `POST` | `/agendamento/barbeiros` | ✅ Sim | **(Admin)** Cria um novo barbeiro (profissional) para a sua barbearia. |
| `GET` | `/agendamento/barbeiros` | ✅ Sim | **(Admin/Cliente)** Lista todos os barbeiros da barbearia. |
| `POST` | `/agendamento/agendamentos` | ✅ Sim | **(Cliente)** Cria um novo agendamento. Inclui lógica Anti-Double Booking. |
| `GET` | `/agendamento/agenda` | ✅ Sim | **(Admin)** Lista todos os agendamentos da barbearia (Visão do Barbeiro). |

## 6\. Equipe

  * **João Victor:** Backend (Arquitetura, Auth, JWT, PostgreSQL/Prisma Setup, Domínio de Barbearias, Listagem de Cliente).
  * **Neto:** Backend (Modelagem de Dados, Domínio de Agendamento, Serviços, Barbeiros e Lógica Anti-Double Booking).
  * **Equipe Frontend:** Caio Cesar e Eduardo Henrique.