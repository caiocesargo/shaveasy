import { Router } from "express";
import servicoController from "./servico.controller.js";
import { verifyJWT, verifyBarbeiro } from "../../shared/middlewares/verifyJWT.js";

const router = Router();

// PREFIXO: /servicos (Acessível via /servicos no server.js)

// [C]REATE: Adicionar um novo serviço (apenas admins)
router.post(
    '/',
    verifyJWT, 
    verifyBarbeiro,
    servicoController.create
);

// [R]EAD: Listar todos os serviços da barbearia (público para usuários logados)
router.get(
    '/',
    verifyJWT, 
    servicoController.list
);

// [U]PDATE: Atualizar um serviço existente por ID (apenas admins)
router.put(
    '/:id', 
    verifyJWT, 
    verifyBarbeiro,
    servicoController.update
);

// [D]ELETE: Deletar um serviço por ID (apenas admins)
router.delete(
    '/:id', 
    verifyJWT, 
    verifyBarbeiro,
    servicoController.delete
);

export default router;