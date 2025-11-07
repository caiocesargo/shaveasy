// src/server.js
import 'dotenv/config'; // Carrega o .env
import express from 'express';
import cors from 'cors'; 

// Importar as rotas
import authRoutes from './domain/auth/auth.routes.js'; //  IMPORTA SUAS ROTAS

const app = express();

// Middlewares Globais
app.use(cors()); 
app.use(express.json()); // Permite que o Express leia JSON no body

// Rotas
app.use('/auth', authRoutes); // CONECTA SUAS ROTAS (ex: /auth/register)

// Iniciar o Servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});