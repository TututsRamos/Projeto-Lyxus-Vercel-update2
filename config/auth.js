// Middlewares complementares ao middleware/auth.js.
// middleware/auth.js garante que existe uma sessão ativa;
// estes garantem que a sessão tem o papel (tipo) certo pra
// acessar cada área do sistema.

export function soAdmin(req, res, next){

    if(!req.session.usuario){

        return res.redirect("/login");

    }

    if(!["admin","master"].includes(req.session.usuario.tipo)){

        return res.status(403).render("erro/500", {
            mensagem: "Você não tem permissão para acessar esta área."
        });

    }

    next();

}

// Exclusivo do usuário mestre (e "admin", tratado como
// equivalente ao master pra fins de acesso total). É o único
// nível que pode gerenciar usuários, configurações do site e
// o console administrativo — inclusive dar/tirar acesso de
// staff/suporte/marketing às áreas do dashboard.
export function soMaster(req, res, next){

    if(!req.session.usuario){

        return res.redirect("/login");

    }

    if(!["master","admin"].includes(req.session.usuario.tipo)){

        return res.status(403).render("erro/500", {
            mensagem: "Área exclusiva do usuário mestre."
        });

    }

    next();

}

// Libera acesso a uma área do dashboard pra quem tem uma das
// permissões passadas. master/admin sempre passam (acesso
// total). staff só passa se a permissão estiver no array
// "permissoes" salvo no usuário (definido pelo master lá em
// /dashboard/usuarios).
//
// Uso: router.get("/", auth, permitir("posts"), controller.x)
export function permitir(...chaves){

    return function(req, res, next){

        if(!req.session.usuario){

            return res.redirect("/login");

        }

        const usuario = req.session.usuario;

        if(["master","admin"].includes(usuario.tipo)){

            return next();

        }

        const permissoes = usuario.permissoes || [];

        const podeAcessar = usuario.tipo === "staff" &&
            chaves.some(chave => permissoes.includes(chave));

        if(!podeAcessar){

            return res.status(403).render("erro/500", {
                mensagem: "Você não tem permissão para acessar esta área."
            });

        }

        next();

    };

}

export function soStaff(req, res, next){

    if(!req.session.usuario){

        return res.redirect("/login");

    }

    if(!["staff","admin","master"].includes(req.session.usuario.tipo)){

        return res.status(403).render("erro/500", {
            mensagem: "Área exclusiva da equipe LIXUS."
        });

    }

    next();

}

export function soCliente(req, res, next){

    if(!req.session.usuario){

        return res.redirect("/login");

    }

    if(req.session.usuario.tipo === "visitante"){

        return res.redirect("/cadastro/aguardando");

    }

    if(req.session.usuario.tipo !== "cliente"){

        return res.status(403).render("erro/500", {
            mensagem: "Esta área é exclusiva para clientes."
        });

    }

    next();

}
