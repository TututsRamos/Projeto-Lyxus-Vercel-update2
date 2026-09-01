import express from "express";

import contratoController from "../controllers/contratoController.js";

import auth from "../middleware/auth.js";
import { permitir } from "../config/auth.js";

const router = express.Router();

// Admin/master sempre têm acesso; staff só com a permissão
// "contratos" concedida pelo master em /dashboard/usuarios.
router.get("/", auth, permitir("contratos"), contratoController.listar);

router.get("/novo", auth, permitir("contratos"), contratoController.novoTela);
router.post("/", auth, permitir("contratos"), contratoController.criar);

router.get("/:id", auth, permitir("contratos"), contratoController.detalhe);

router.post("/:id/logs", auth, permitir("contratos"), contratoController.adicionarLog);
router.post("/:id/logs/:logId/remover", auth, permitir("contratos"), contratoController.removerLog);

router.post("/:id/status", auth, permitir("contratos"), contratoController.alterarStatus);

router.get("/:id/documento", auth, permitir("contratos"), contratoController.documentoTela);
router.post("/:id/documento", auth, permitir("contratos"), contratoController.salvarDocumento);

router.post("/:id/excluir", auth, permitir("contratos"), contratoController.excluirContrato);

export default router;
