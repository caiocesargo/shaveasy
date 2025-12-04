import { Router } from "express";
import barbeiroController from "./barbeiro.controller.js";
import { verifyJWT } from "../../shared/middlewares/verifyJWT.js";

const router = Router();

// PREFIXO: /barbeiros

router.post('/', verifyJWT, barbeiroController.create); // [C]REATE
router.get('/', verifyJWT, barbeiroController.list);   // [R]EAD (Listar)
router.put('/:id', verifyJWT, barbeiroController.update); // [U]PDATE
router.delete('/:id', verifyJWT, barbeiroController.delete); // [D]ELETE

export default router;