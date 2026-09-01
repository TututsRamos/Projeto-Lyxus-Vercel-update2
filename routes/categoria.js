import express from "express";

import categoriaController from "../controllers/categoriaController.js";

import auth from "../middleware/auth.js";
import { permitir } from "../config/auth.js";

const router = express.Router();

router.get("/", auth, permitir("posts","categorias"), categoriaController.listar);

router.get("/novo", auth, permitir("posts","categorias"), categoriaController.novo);

router.post("/", auth, permitir("posts","categorias"), categoriaController.salvar);

router.get("/editar/:id", auth, permitir("posts","categorias"), categoriaController.editar);

router.post("/editar/:id", auth, permitir("posts","categorias"), categoriaController.atualizar);

router.get("/excluir/:id", auth, permitir("posts","categorias"), categoriaController.excluir);

export default router;