import express from "express";

import homeController from "../controllers/homeController.js";
import loginController from "../controllers/loginController.js";
import cadastroController from "../controllers/cadastroController.js";
import adminAuthController from "../controllers/adminAuthController.js";
import pacoteController from "../controllers/pacoteController.js";
import { loginLimiter, adminLoginLimiter, cadastroLimiter } from "../middleware/rateLimit.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Home
router.get("/", homeController.index);

// Login
router.get("/login", loginController.tela);
router.post("/login", loginLimiter, loginController.login);
router.get("/logout", loginController.logout);

// Cadastro
router.get("/cadastro", cadastroController.tela);
router.post("/cadastro", cadastroLimiter, cadastroController.cadastrar);
router.get("/cadastro/aguardando", auth, cadastroController.aguardando);

// Login Admin (acesso restrito, sem link visível no site —
// só pela logo "X" na tela de login padrão)
router.get("/admin/login", adminAuthController.tela);
router.post("/admin/login", adminLoginLimiter, adminAuthController.login);

// Pacotes públicos
router.get("/pacotes", pacoteController.publico);
router.get("/pacotes/:id", pacoteController.detalhe);
router.get("/pacotes/:id/checkout", pacoteController.checkoutForm);
router.post("/pacotes/:id/checkout", pacoteController.finalizarCheckout);

export default router;
