import express from "express";

import avaliacaoController from "../controllers/avaliacaoController.js";

const router = express.Router();

router.get("/", avaliacaoController.index);

router.get("/:id", avaliacaoController.detalhe);

export default router;
