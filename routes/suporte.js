import express from "express";

import suporteController from "../controllers/suporteController.js";

import auth from "../middleware/auth.js";
import { permitir } from "../config/auth.js";

const router = express.Router();

router.get("/", auth, permitir("suporte"), suporteController.tela);

export default router;
