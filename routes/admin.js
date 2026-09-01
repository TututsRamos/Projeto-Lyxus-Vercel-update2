import express from "express";

import adminController from "../controllers/adminController.js";

import auth from "../middleware/auth.js";
import { permitir } from "../config/auth.js";

const router = express.Router();

// Qualquer papel com pelo menos uma permissão de dashboard
// (master/admin sempre passam; staff/suporte/marketing só se
// tiverem a permissão correspondente) consegue ver a tela
// inicial — os widgets exibidos são filtrados por permissão
// dentro da própria view.
router.get(
    "/",
    auth,
    permitir("posts", "categorias", "pacotes", "pagamentos", "suporte", "contratos"),
    adminController.dashboard
);

export default router;