// src/server.js
import 'dotenv/config'; // Carrega o .env
import express, { Router } from 'express';

import cors from 'cors'; 
import authRoutes from './domain/auth/auth.routes.js'; //  IMPORTA SUAS ROTAS
import barbeariaRoutes from './domain/barbearia/barbearia.routes.js';

const app = express();
const router = Router();

// Middlewares Globais
app.use(cors()); 
app.use(express.json()); // Permite que o Express leia JSON no body

// Rotas
app.use('/auth', authRoutes); // CONECTA SUAS ROTAS (ex: /auth/register)
app.use('/barbearias', barbeariaRoutes);
router.route('/').get((_, res) => {
  res.status(200).send('Bem vindo a shaveasy API!');
});

// Conecte o router ao app
app.use('/', router);

// Iniciar o Servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT || 3333}`);
});