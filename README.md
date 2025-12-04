# Shaveasy

Plataforma de agendamento para barbearias que conecta clientes e barbeiros de forma simples e eficiente.

## O que é?

Shaveasy é um MVP acadêmico com três componentes principais:

- **Backend**: API Node.js + Express + PostgreSQL
- **Mobile**: Aplicativo React Native + Expo
- **Web**: Interface web em desenvolvimento

O sistema usa Multi-Tenancy, permitindo que cada barbearia gerencie seus próprios serviços, barbeiros e agendamentos.

## Funcionalidades

### Cliente
- Registro e login com Email/Senha
- Visualizar barbearias e serviços disponíveis
- Agendar serviços com seleção de data/horário
- Ver seus agendamentos
- Proteção contra double booking (impossível agendar horários ocupados)

### Barbeiro (Admin)
- Painel para gerenciar sua barbearia
- CRUD de serviços
- Visualizar agenda completa
- Gerenciar barbeiros vinculados
- Configurações da barbearia

### Segurança
- Autenticação JWT
- Senhas com Bcrypt
- Validação de email e senha
- Middleware de verificação em rotas protegidas

## Stack

**Backend**: Node.js v24, Express, PostgreSQL, Prisma, JWT, Bcrypt  
**Mobile**: React Native 0.81, Expo, TypeScript, Tailwind (NativeWind), React Query, Axios

## Começar

### Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou pnpm

### Instalação

```bash
# Clone
git clone https://github.com/caiocesargo/shaveasy.git
cd shaveasy

# Configure o banco
psql -U postgres
CREATE DATABASE shaveasy;
\q

# Crie .env na raiz
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/shaveasy"
PORT=3333
JWT_SECRET="sua_chave_secreta"
JWT_EXPIRATION="24h"

# Instale dependências
npm install

# Execute migrações
npx prisma migrate dev --name init
```

### Rodar

```bash
# Backend
npm run dev

# Mobile
cd client-mobile
npm start
```

O servidor roda em `http://localhost:3333`

## API Endpoints

### Auth
- `POST /auth/register` - Registrar cliente
- `POST /auth/login` - Login
- `POST /auth/criar-barbearia` - Criar barbearia (requer auth)

### Barbearias
- `GET /barbearias` - Listar todas
- `POST /barbearias` - Criar (requer auth)
- `PUT /barbearias/:id` - Atualizar (requer auth)

### Serviços
- `GET /agendamento/servicos/:barbeariaId` - Listar
- `POST /agendamento/servicos` - Criar (requer auth)
- `DELETE /agendamento/servicos/:id` - Deletar (requer auth)

### Agendamentos
- `POST /agendamento/criar` - Criar agendamento (requer auth)
- `GET /agendamento/meus` - Ver meus agendamentos (requer auth)
- `GET /agendamento/barbearia/:id` - Ver agenda (requer auth, admin)

## Modelo de Dados

- **Usuario**: email único, tipo (cliente/barbeiro), senha hash com bcrypt
- **Barbearia**: isolada por tenant
- **Servico**: nome, preço, duração em minutos
- **Agendamento**: dataHora e dataHoraFim (crucial para anti-double booking), status confirmado

## Arquitetura

Segue padrão DDD com separação:
- **Routes**: Definição de endpoints
- **Controller**: Tratamento de requests
- **Service**: Lógica de negócio
- **Prisma**: Acesso ao banco

## Detalhes Importantes

- **JWT**: Tokens expiram em 24h, enviar no header `Authorization: Bearer token`
- **Anti-Double Booking**: Verifica conflitos entre `dataHora` e `dataHoraFim`
- **Multi-Tenancy**: Cada barbearia isolada, filtros automáticos por `barbeariaId`
- **Validações**: Email e senha têm padrões mínimos

## Referências

- [GUIA_WEB.md](./GUIA_WEB.md) - Setup web
- [GUIA_MOBILE.md](./GUIA_MOBILE.md) - Setup mobile com Expo

## Contribuidores

- **João** - Backend, Auth, Tenants
- **Neto** - Agendamentos, Anti-Double Booking
- **Caio** - Frontend Mobile

---

**v1.0.0** | MIT License
