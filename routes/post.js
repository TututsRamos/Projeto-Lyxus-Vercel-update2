import express from "express";

import postController from "../controllers/postController.js";

import auth from "../middleware/auth.js";
import { permitir } from "../config/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", auth, permitir("posts"), postController.listar);

router.get("/novo", auth, permitir("posts"), postController.novo);

router.post("/", auth, permitir("posts"), upload.single("imagem"), postController.salvar);

router.get("/editar/:id", auth, permitir("posts"), postController.editar);

router.post("/editar/:id", auth, permitir("posts"), upload.single("imagem"), postController.atualizar);

router.get("/excluir/:id", auth, permitir("posts"), postController.excluir);

export default router;