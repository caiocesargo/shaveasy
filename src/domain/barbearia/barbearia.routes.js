import { Router } from "express";
import barbeariaController from "./barbearia.controller.js";
import { verifyJWT } from "../../shared/middlewares/verifyJWT.js";

const router = Router();


router.post(
    '/',
    verifyJWT,
    barbeariaController.criarBarbearia
);

router.get(
    '/',
    verifyJWT,
    barbeariaController.getBarbearia
);

export default router;