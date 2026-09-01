import express from "express";

import configController from "../controllers/configController.js";

import auth from "../middleware/auth.js";
import { soMaster } from "../config/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", auth, soMaster, configController.mostrar);

router.post(
    "/",
    auth, soMaster, upload.fields([
        { name: "logo", maxCount: 1 },
        { name: "banner", maxCount: 1 }
    ]),
    configController.atualizar
);

export default router;