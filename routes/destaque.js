import express from "express";

import destaqueController from "../controllers/destaqueController.js";

import auth from "../middleware/auth.js";
import { permitir } from "../config/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Mesma permissão de "posts" — quem mexe no blog (marketing,
// staff geral, master/admin) também mexe nos destaques da
// semana, já que normalmente são posts em destaque.
router.get("/", auth, permitir("posts"), destaqueController.listar);

router.get("/novo", auth, permitir("posts"), destaqueController.novo);

router.post("/", auth, permitir("posts"), upload.single("imagem"), destaqueController.salvar);

router.get("/editar/:id", auth, permitir("posts"), destaqueController.editar);

router.post("/editar/:id", auth, permitir("posts"), upload.single("imagem"), destaqueController.atualizar);

router.get("/excluir/:id", auth, permitir("posts"), destaqueController.excluir);

export default router;
