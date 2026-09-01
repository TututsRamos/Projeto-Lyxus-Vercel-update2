import express from "express";

import staffController from "../controllers/staffController.js";

import auth from "../middleware/auth.js";
import { soStaff } from "../config/auth.js";

const router = express.Router();

router.get("/", auth, soStaff, staffController.dashboard);

router.get("/propostas", auth, soStaff, staffController.propostas);
router.get("/propostas/novo", auth, soStaff, staffController.novaPropostaTela);
router.post("/propostas", auth, soStaff, staffController.criarProposta);
router.get("/propostas/:id", auth, soStaff, staffController.verProposta);

router.get("/configuracoes", auth, soStaff, staffController.configuracoes);

router.get("/solicitar-usuario", auth, soStaff, staffController.solicitarUsuarioTela);
router.post("/solicitar-usuario", auth, soStaff, staffController.solicitarUsuario);

export default router;
