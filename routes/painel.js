import express from "express";

import painelController from "../controllers/painelController.js";

import auth from "../middleware/auth.js";
import { soCliente } from "../config/auth.js";

const router = express.Router();

router.get("/", auth, soCliente, painelController.dashboard);

router.get("/propostas", auth, soCliente, painelController.propostas);
router.get("/propostas/:id", auth, soCliente, painelController.verProposta);
router.post("/propostas/:id/aprovar", auth, soCliente, painelController.aprovar);
router.post("/propostas/:id/recusar", auth, soCliente, painelController.recusar);

router.get("/pedidos", auth, soCliente, painelController.pedidos);

router.get("/configuracoes", auth, soCliente, painelController.configuracoes);

export default router;
