import express from "express";

import institucionalController from "../controllers/institucionalController.js";

const router = express.Router();

router.get("/sobre", institucionalController.sobre);

router.get("/equipe", institucionalController.equipe);

router.get("/beneficios", institucionalController.beneficios);

router.get("/assinaturas", institucionalController.assinaturas);

router.get("/faq", institucionalController.faq);

router.get("/termos/:tipo", institucionalController.termosTela);

router.get("/trabalhe-conosco", institucionalController.trabalheConoscoTela);
router.post("/trabalhe-conosco", institucionalController.enviarContato);

router.get("/apoiador", institucionalController.apoiadorTela);
router.post("/apoiador", institucionalController.enviarContato);

router.get("/parceiros", institucionalController.parceirosTela);
router.post("/parceiros", institucionalController.enviarContato);

router.get("/suporte", institucionalController.suporteTela);
router.post("/suporte", institucionalController.enviarContato);

export default router;
