import rateLimit from "express-rate-limit";

// Proteção contra brute-force nas telas de login (cliente/
// staff e admin/mestre). Limita tentativas por IP dentro de
// uma janela de tempo — não impede o login em si, só barra
// quem fica tentando senha atrás de senha.

// Login padrão (cliente/staff): mais tolerante, porque é
// usado por muita gente ao mesmo tempo.
export const loginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000, // 15 minutos

    max: 5, // 5 tentativas por IP na janela

    standardHeaders: true,

    legacyHeaders: false,

    message: "Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.",

    handler(req, res){

        res.status(429).render("login/login", {
            erro: "Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente."
        });

    }

});

// Cadastro de clientes: limita criação de contas em massa
// (automação/spam) vindas do mesmo IP.
export const cadastroLimiter = rateLimit({

    windowMs: 60 * 60 * 1000, // 1 hora

    max: 15, // 15 cadastros por IP na janela

    standardHeaders: true,

    legacyHeaders: false,

    message: "Muitas tentativas de cadastro. Aguarde um pouco antes de tentar novamente.",

    handler(req, res){

        res.status(429).render("cadastro/cadastro", {
            erro: "Muitas tentativas de cadastro. Aguarde um pouco antes de tentar novamente."
        });

    }

});

// Login administrativo (staff com acesso ao dashboard, admin
// e mestre): mais restrito, porque é o alvo de maior risco.
export const adminLoginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000, // 15 minutos

    max: 5, // 5 tentativas por IP na janela

    standardHeaders: true,

    legacyHeaders: false,

    message: "Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.",

    handler(req, res){

        res.status(429).render("login/admin", {
            erro: "Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente."
        });

    }

});
