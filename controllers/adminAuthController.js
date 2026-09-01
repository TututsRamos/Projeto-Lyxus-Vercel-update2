import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

// Login exclusivo do dashboard administrativo. Antes isso
// verificava duas contas fixas no .env — agora existe o
// usuário mestre e o papel "admin" de verdade no banco, e
// também o papel "staff" (com sub-perfis staff/suporte/
// marketing) que também pode entrar por aqui, mas cai numa
// área bem mais limitada do dashboard de acordo com as
// permissões que o master deu pra ele em
// /dashboard/usuarios.

// Pra onde cada um vai depois de logar por aqui.
function destinoDashboard(usuario){

    if(["admin","master"].includes(usuario.tipo)) return "/dashboard";

    const permissoes = usuario.permissoes || [];

    if(permissoes.length === 1 && permissoes[0] === "suporte"){
        return "/dashboard/suporte";
    }

    if(
        permissoes.length > 0 &&
        !permissoes.includes("pacotes") &&
        !permissoes.includes("pagamentos") &&
        (permissoes.includes("posts") || permissoes.includes("categorias"))
    ){
        return "/dashboard/posts";
    }

    return "/dashboard";

}

const adminAuthController = {

    tela(req, res){

        if(req.session.usuario && ["admin","master","staff"].includes(req.session.usuario.tipo)){

            return res.redirect(destinoDashboard(req.session.usuario));

        }

        res.render("login/admin");

    },

    async login(req, res){

        try{

            const { email, senha } = req.body;

            if(typeof email !== "string" || typeof senha !== "string"){

                return res.render("login/admin",{
                    erro:"Acesso restrito à administração LIXUS."
                });

            }

            const usuario = await Usuario.findOne({ email });

            const temPermissaoDeDashboard = usuario &&
                usuario.tipo === "staff" &&
                Array.isArray(usuario.permissoes) &&
                usuario.permissoes.length > 0;

            if(!usuario || !(["admin","master"].includes(usuario.tipo) || temPermissaoDeDashboard)){

                return res.render("login/admin",{
                    erro:"Acesso restrito à administração LIXUS."
                });

            }

            if(!usuario.ativo){

                return res.render("login/admin",{
                    erro:"Usuário desativado."
                });

            }

            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if(!senhaCorreta){

                return res.render("login/admin",{
                    erro:"E-mail ou senha inválidos."
                });

            }

            req.session.usuario = {

                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                foto: usuario.foto,
                tipo: usuario.tipo,
                cargo: usuario.cargo,
                permissoes: usuario.permissoes || []

            };

            res.redirect(destinoDashboard(req.session.usuario));

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default adminAuthController;
