import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import validarSenha from "../utils/validarSenha.js";

function destinoPorTipo(tipo){

    if(tipo === "staff") return "/staff";
    if(tipo === "admin" || tipo === "master") return "/dashboard";
    if(tipo === "visitante") return "/cadastro/aguardando";

    return "/painel";

}

const cadastroController = {

    // ==========================
    // Tela de Cadastro
    // ==========================

    tela(req, res){

        if(req.session.usuario){

            return res.redirect(destinoPorTipo(req.session.usuario.tipo));

        }

        res.render("cadastro/cadastro");

    },

    // ==========================
    // Criar conta
    // ==========================

    async cadastrar(req, res){

        try{

            const { nome, email, senha, confirmarSenha } = req.body;

            if([nome, email, senha, confirmarSenha].some(campo => typeof campo !== "string")){

                return res.render("cadastro/cadastro",{
                    erro:"Dados inválidos."
                });

            }

            const { valida, mensagem } = validarSenha(senha);

            if(!valida){

                return res.render("cadastro/cadastro",{
                    erro:mensagem,
                    nome,
                    email
                });

            }

            if(senha !== confirmarSenha){

                return res.render("cadastro/cadastro",{
                    erro:"As senhas não coincidem.",
                    nome,
                    email
                });

            }

            const existente = await Usuario.findOne({ email });

            if(existente){

                return res.render("cadastro/cadastro",{
                    erro:"Já existe uma conta com esse e-mail.",
                    nome,
                    email
                });

            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = await Usuario.create({
                nome,
                email,
                senha: senhaCriptografada,
                tipo:"visitante"
            });

            req.session.usuario = {

                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                foto: usuario.foto,
                tipo: usuario.tipo

            };

            res.redirect(destinoPorTipo(usuario.tipo));

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================
    // Tela de espera ("aguardando aprovação")
    // Reconsulta o banco pra saber se o mestre já aprovou
    // (mudou o tipo pra "cliente") desde o cadastro/último
    // login — se sim, manda direto pro painel.
    // ==========================

    async aguardando(req, res){

        try{

            const usuario = await Usuario.findById(req.session.usuario.id);

            if(!usuario){

                req.session.destroy(()=>{});
                return res.redirect("/login");

            }

            if(usuario.tipo !== "visitante"){

                req.session.usuario.tipo = usuario.tipo;

                return res.redirect(destinoPorTipo(usuario.tipo));

            }

            res.render("cadastro/aguardando");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default cadastroController;
