import express from "express";

import pagamentoController from "../controllers/pagamentoController.js";

import auth from "../middleware/auth.js";
import { permitir } from "../config/auth.js";

const router = express.Router();

router.get("/", auth, permitir("pagamentos"), pagamentoController.lista);
router.post("/:id/aprovar", auth, permitir("pagamentos"), pagamentoController.aprovar);
router.post("/:id/cancelar", auth, permitir("pagamentos"), pagamentoController.cancelar);

export default router;
