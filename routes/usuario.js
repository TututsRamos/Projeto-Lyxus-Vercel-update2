import express from "express";

import usuarioController from "../controllers/usuarioController.js";

import auth from "../middleware/auth.js";
import { soMaster } from "../config/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", auth, soMaster, usuarioController.listar);

router.get("/novo", auth, soMaster, usuarioController.novo);

router.post("/", auth, soMaster, upload.single("foto"), usuarioController.salvar);

router.get("/editar/:id", auth, soMaster, usuarioController.editar);

router.post("/editar/:id", auth, soMaster, upload.single("foto"), usuarioController.atualizar);

router.get("/excluir/:id", auth, soMaster, usuarioController.excluir);

router.post("/:id/aprovar", auth, soMaster, usuarioController.aprovar);

router.post("/:id/recusar", auth, soMaster, usuarioController.recusar);

export default router; 