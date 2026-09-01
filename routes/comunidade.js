import express from "express";

import comunidadeController from "../controllers/comunidadeController.js";

const router = express.Router();

router.get("/", comunidadeController.index);

router.get("/:id", comunidadeController.detalhe);
router.post("/:id/participar", comunidadeController.participar);
router.post("/:id/votar/:opcaoId", comunidadeController.votar);

export default router;
