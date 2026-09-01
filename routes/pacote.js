import express from "express";

import pacoteController from "../controllers/pacoteController.js";

import auth from "../middleware/auth.js";
import { permitir } from "../config/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", auth, permitir("pacotes"), pacoteController.listar);

router.get("/novo", auth, permitir("pacotes"), pacoteController.novo);

router.post("/", auth, permitir("pacotes"), upload.single("imagem"), pacoteController.salvar);

router.get("/editar/:id", auth, permitir("pacotes"), pacoteController.editar);

router.post("/editar/:id", auth, permitir("pacotes"), upload.single("imagem"), pacoteController.atualizar);

router.get("/excluir/:id", auth, permitir("pacotes"), pacoteController.excluir);

export default router;
