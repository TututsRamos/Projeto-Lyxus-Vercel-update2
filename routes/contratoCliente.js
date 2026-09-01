import express from "express";

import contratoController from "../controllers/contratoController.js";
import contratoModeloController from "../controllers/contratoModeloController.js";

const router = express.Router();

// Contrato institucional (sem cliente específico) — precisa vir
// antes de "/:codigo" senão o Express trataria "/" como se fosse
// um código de contrato.
router.get("/", contratoModeloController.clienteTela);

router.get("/:codigo", contratoController.clienteTela);

export default router;
