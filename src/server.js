// src/server.js
import 'dotenv/config'; // Carrega o .env
import express from 'express';
import cors from 'cors'; 

// Importar as rotas (VERSÃO CORRIGIDA)
import authRoutes from './domain/auth/auth.routes.js'; // Rotas do João
import barbeariaRoutes from './domain/barbearia/barbearia.routes.js'; // Rotas do João
import agendamentoRoutes from './domain/agendamento/agendamento.routes.js'; // <-- Suas rotas (Neto)

// Importações de rotas do CRUD de Serviços e Barbeiros (NETO)
import servicoRoutes from './domain/servico/servico.routes.js';
import barbeiroRoutes from './domain/barbeiro/barbeiro.routes.js';

const app = express();

// Middlewares Globais
app.use(cors()); 
app.use(express.json()); // Permite que o Express leia JSON no body

// Rotas (VERSÃO CORRIGIDA)
app.use('/auth', authRoutes); // Rotas do João
app.use('/barbearias', barbeariaRoutes); // Rotas do João
app.use('/agendamento', agendamentoRoutes); // <-- Suas rotas (Neto)

// Rotas do CRUD (NETO)
app.use('/servicos', servicoRoutes);
app.use('/barbeiros', barbeiroRoutes);

// Iniciar o Servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});