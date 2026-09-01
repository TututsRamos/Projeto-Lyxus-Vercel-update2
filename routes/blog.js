import express from "express";

import blogController from "../controllers/blogController.js";

const router = express.Router();

router.get("/", blogController.lista);

router.get("/pesquisa", blogController.pesquisa);

router.get("/categoria/:slug", blogController.categoria);

router.get("/:slug", blogController.post);

export default router;
