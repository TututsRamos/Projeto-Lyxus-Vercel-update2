import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import registrarLog from "../utils/registrarLog.js";
import validarSenha from "../utils/validarSenha.js";
import imagemParaBase64 from "../utils/imagemBase64.js";

// Chaves de permissão válidas pro dashboard.
const PERMISSOES_VALIDAS = ["posts","categorias","pacotes","pagamentos","suporte","contratos","avaliacoes"];

// Preset aplicado quando o master escolhe um "cargo" pronto
// pro staff, em vez de marcar as permissões manualmente.
// "avaliacoes" = área de Pesquisa e Avaliação (Pique Michelan).
const PRESET_POR_CARGO = {
    staff: ["posts","categorias","pacotes","pagamentos"],
    suporte: ["suporte"],
    marketing: ["posts","categorias","avaliacoes"]
};

function montarPermissoes(body){

    if(body.tipo !== "staff") return [];

    if(Array.isArray(body.permissoes) && body.permissoes.length){

        return body.permissoes.filter(p => PERMISSOES_VALIDAS.includes(p));

    }

    if(typeof body.permissoes === "string" && body.permissoes){

        return PERMISSOES_VALIDAS.includes(body.permissoes) ? [body.permissoes] : [];

    }

    return PRESET_POR_CARGO[body.cargo] || PRESET_POR_CARGO.staff;

}

const usuarioController={

    // ===========================
    // LISTAR
    // ===========================

    async listar(req,res){

        try{

            const usuarios=await Usuario.find()
                .sort({nome:1});

            res.render("dashboard/usuarios/lista",{

                usuarios

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // FORM NOVO
    // ===========================

    novo(req,res){

        res.render("dashboard/usuarios/novo",{
            souMaster: ["master","admin"].includes(req.session.usuario.tipo)
        });

    },

    // ===========================
    // SALVAR
    // ===========================

    async salvar(req,res){

        try{

            const{

                nome,

                email,

                senha,

                tipo,

                cargo

            }=req.body;

            if(tipo === "admin" && req.session.usuario.tipo !== "master"){

                return res.status(403).render("erro/500",{
                    mensagem:"Somente o usuário mestre pode criar administradores."
                });

            }

            const existe=await Usuario.findOne({

                email

            });

            if(existe){

                return res.redirect("/dashboard/usuarios");

            }

            const { valida, mensagem } = validarSenha(senha);

            if(!valida){

                return res.status(400).render("erro/500",{
                    mensagem
                });

            }

            const senhaHash=await bcrypt.hash(

                senha,

                10

            );

            const novoUsuario = await Usuario.create({

                nome,

                email,

                senha:senhaHash,

                tipo,

                cargo: tipo === "staff" ? (cargo || "staff") : undefined,

                permissoes: montarPermissoes(req.body),

                foto:req.file ? imagemParaBase64(req.file) : ""

            });

            await registrarLog(
                "usuario_criado",
                req.session.usuario.id,
                `Criou o usuário ${novoUsuario.nome} (${tipo})`
            );

            res.redirect("/dashboard/usuarios");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // FORM EDITAR
    // ===========================

    async editar(req,res){

        try{

            const usuario=await Usuario.findById(req.params.id);

            if(!usuario){

                return res.redirect("/dashboard/usuarios");

            }

            res.render("dashboard/usuarios/editar",{

                usuario,
                souMaster: ["master","admin"].includes(req.session.usuario.tipo)

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // ATUALIZAR
    // ===========================

    async atualizar(req,res){

        try{

            const{

                nome,

                email,

                tipo,

                cargo,

                ativo

            }=req.body;

            if(tipo === "admin" && req.session.usuario.tipo !== "master"){

                return res.status(403).render("erro/500",{
                    mensagem:"Somente o usuário mestre pode promover alguém a administrador."
                });

            }

            const dados={

                nome,

                email,

                tipo,

                cargo: tipo === "staff" ? (cargo || "staff") : undefined,

                permissoes: montarPermissoes(req.body),

                ativo:ativo==="true"

            };

            if(req.body.senha){

                const { valida, mensagem } = validarSenha(req.body.senha);

                if(!valida){

                    return res.status(400).render("erro/500",{
                        mensagem
                    });

                }

                dados.senha=await bcrypt.hash(

                    req.body.senha,

                    10

                );

            }

            if(req.file){

                dados.foto=imagemParaBase64(req.file);

            }

            await Usuario.findByIdAndUpdate(

                req.params.id,

                dados

            );

            await registrarLog(
                "usuario_editado",
                req.session.usuario.id,
                `Editou o usuário ${nome}`
            );

            res.redirect("/dashboard/usuarios");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // EXCLUIR
    // ===========================

    async excluir(req,res){

        try{

            const usuario = await Usuario.findById(req.params.id);

            if(!usuario){

                return res.redirect("/dashboard/usuarios");

            }

            if(usuario.tipo === "master"){

                return res.status(403).render("erro/500",{
                    mensagem:"O usuário mestre não pode ser excluído."
                });

            }

            await Usuario.findByIdAndDelete(

                req.params.id

            );

            await registrarLog(
                "usuario_excluido",
                req.session.usuario.id,
                `Excluiu o usuário ${usuario.nome} (${usuario.email})`
            );

            res.redirect("/dashboard/usuarios");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // APROVAR (visitante -> cliente)
    // ===========================

    async aprovar(req,res){

        try{

            const usuario = await Usuario.findById(req.params.id);

            if(!usuario || usuario.tipo !== "visitante"){

                return res.redirect("/dashboard/usuarios");

            }

            usuario.tipo = "cliente";

            await usuario.save();

            await registrarLog(
                "usuario_aprovado",
                req.session.usuario.id,
                `Aprovou a conta de ${usuario.nome} (${usuario.email}), agora cliente`
            );

            res.redirect("/dashboard/usuarios");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // RECUSAR (exclui a conta visitante)
    // ===========================

    async recusar(req,res){

        try{

            const usuario = await Usuario.findById(req.params.id);

            if(!usuario || usuario.tipo !== "visitante"){

                return res.redirect("/dashboard/usuarios");

            }

            await Usuario.findByIdAndDelete(req.params.id);

            await registrarLog(
                "usuario_recusado",
                req.session.usuario.id,
                `Recusou o cadastro de ${usuario.nome} (${usuario.email})`
            );

            res.redirect("/dashboard/usuarios");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    }

};

export default usuarioController;