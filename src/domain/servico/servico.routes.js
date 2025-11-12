import { Router } from "express";
import servicoController from "./servico.controller.js";
import { verifyJWT } from "../../shared/middlewares/verifyJWT.js";

const router = Router();

// PREFIXO: /servicos (Acessível via /servicos no server.js)

// [C]REATE: Adicionar um novo serviço
router.post(
    '/',
    verifyJWT, 
    servicoController.create
);

// [R]EAD: Listar todos os serviços da barbearia
router.get(
    '/',
    verifyJWT, 
    servicoController.list
);

// [U]PDATE: Atualizar um serviço existente por ID
router.put(
    '/:id', 
    verifyJWT, 
    servicoController.update
);

// [D]ELETE: Deletar um serviço por ID
router.delete(
    '/:id', 
    verifyJWT, 
    servicoController.delete
);

export default router;