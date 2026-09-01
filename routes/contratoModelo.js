import express from "express";

import contratoModeloController from "../controllers/contratoModeloController.js";

import auth from "../middleware/auth.js";
import { permitir } from "../config/auth.js";

const router = express.Router();

// Admin/master sempre têm acesso; staff só com a permissão
// "contratos" concedida pelo master em /dashboard/usuarios —
// mesma permissão usada em "Contratos e Logs", mas este
// documento é completamente independente daquele.
router.get("/", auth, permitir("contratos"), contratoModeloController.documentoTela);
router.post("/", auth, permitir("contratos"), contratoModeloController.salvarDocumento);

export default router;
