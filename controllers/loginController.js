import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

// Pra onde cada papel vai depois de logar. Admin/master usam
// o login próprio em /admin/login, mas se por acaso entrarem
// por aqui também caem no lugar certo.
function destinoPorTipo(usuario){

    const tipo = usuario.tipo;

    if(tipo === "admin" || tipo === "master") return "/dashboard";

    if(tipo === "visitante") return "/cadastro/aguardando";

    if(tipo === "staff"){

        const permissoes = usuario.permissoes || [];

        // Staff com acesso ao dashboard de conteúdo (posts/
        // categorias/pacotes/pagamentos) ou ao suporte entra
        // direto no dashboard. Sem nenhuma dessas permissões,
        // assume-se que é staff "comercial" (propostas) e vai
        // pro painel de propostas de sempre.
        const temAcessoDashboard = permissoes.length > 0;

        if(!temAcessoDashboard) return "/staff";

        if(permissoes.length === 1 && permissoes[0] === "suporte"){
            return "/dashboard/suporte";
        }

        return "/dashboard";

    }

    return "/painel";

}

const loginController = {

    // ==========================
    // Tela de Login
    // ==========================

    tela(req, res){

        if(req.session.usuario){

            return res.redirect(destinoPorTipo(req.session.usuario));

        }

        res.render("login/login", { erro: null });

    },

    // ==========================
    // Login
    // ==========================

    async login(req, res){

        try{

            const { email, senha } = req.body;

            if(typeof email !== "string" || typeof senha !== "string"){

                return res.render("login/login",{
                    erro:"E-mail ou senha inválidos."
                });

            }

            const usuario = await Usuario.findOne({ email });

            if(!usuario){

                return res.render("login/login",{
                    erro:"E-mail ou senha inválidos."
                });

            }

            if(!usuario.ativo){

                return res.render("login/login",{
                    erro:"Usuário desativado."
                });

            }

            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if(!senhaCorreta){

                return res.render("login/login",{
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

            res.redirect(destinoPorTipo(req.session.usuario));

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ==========================
    // Logout
    // ==========================

    logout(req, res){

        req.session.destroy(()=>{

            res.redirect("/");

        });

    }

};

export default loginController;
