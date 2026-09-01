import Proposta from "../models/Proposta.js";
import SolicitacaoUsuario from "../models/SolicitacaoUsuario.js";
import Usuario from "../models/Usuario.js";

const areasValidas = [
    "marketing","design","moderacao","coordenacao",
    "administracao","suporte","programacao","outro"
];

const staffController = {

    // ==========================
    // Home do STAFF -> vai direto pra propostas
    // ==========================

    dashboard(req, res){

        res.redirect("/staff/propostas");

    },

    // ==========================
    // Propostas criadas pelo STAFF logado
    // ==========================

    async propostas(req, res){

        try{

            const propostas = await Proposta.find({ staff: req.session.usuario.id })
                .populate("usuario")
                .sort({ createdAt:-1 });

            res.render("staff/propostas", { propostas });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================
    // Criar proposta
    // ==========================

    async novaPropostaTela(req, res){

        try{

            const usuarios = await Usuario.find({ tipo:"cliente" }).sort({ nome:1 });

            res.render("staff/nova-proposta", { usuarios, erro:null });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async criarProposta(req, res){

        const usuarios = await Usuario.find({ tipo:"cliente" }).sort({ nome:1 });

        try{

            const {
                usuario, areaAtuacao, titulo, tipoPessoa, cpf, cnpj,
                nomeEmpresa, nomePessoa, valorContrato, prazo,
                percentualMulta, percentualCorrecao, pagamentoInicial,
                objetivo, detalhes, camposEditaveis
            } = req.body;

            if(!usuario || !titulo || !areasValidas.includes(areaAtuacao) || !valorContrato){

                return res.render("staff/nova-proposta",{
                    usuarios,
                    erro:"Preencha ao menos usuário, título, área e valor do contrato."
                });

            }

            const codigo = "PROP-" + Date.now().toString(36).toUpperCase();

            const proposta = await Proposta.create({

                codigo,
                titulo,
                areaAtuacao,
                staff: req.session.usuario.id,
                staffsEnvolvidos: [req.session.usuario.id],
                usuario,
                tipoPessoa: tipoPessoa || "fisica",
                cpf: cpf || "",
                cnpj: cnpj || "",
                nomeEmpresa: nomeEmpresa || "",
                nomePessoa: nomePessoa || "",
                valorContrato,
                prazo: prazo || "",
                percentualMulta: percentualMulta || 0,
                percentualCorrecao: percentualCorrecao || 0,
                pagamentoInicial: pagamentoInicial || 0,
                objetivo: objetivo || "",
                detalhes: detalhes || "",
                camposEditaveis: Array.isArray(camposEditaveis)
                    ? camposEditaveis
                    : (camposEditaveis ? [camposEditaveis] : []),

                historico:[{
                    tipo:"proposta_inicial",
                    autor: req.session.usuario.id,
                    dadosDepois: req.body
                }]

            });

            res.redirect("/staff/propostas/" + proposta._id);

        }catch(err){

            console.error(err);

            res.render("staff/nova-proposta",{
                usuarios,
                erro:"Não foi possível criar a proposta. Confira os campos e tente novamente."
            });

        }

    },

    // ==========================
    // Ver uma proposta (visão do STAFF)
    // ==========================

    async verProposta(req, res){

        try{

            const proposta = await Proposta.findById(req.params.id)
                .populate("usuario")
                .populate("staff")
                .populate("historico.autor");

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            res.render("staff/proposta-detalhe", { proposta });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================
    // Configurações (perfil do próprio STAFF + histórico)
    // ==========================

    async configuracoes(req, res){

        try{

            const staff = await Usuario.findById(req.session.usuario.id);

            const propostas = await Proposta.find({
                $or:[
                    { staff: req.session.usuario.id },
                    { staffsEnvolvidos: req.session.usuario.id }
                ]
            })
                .populate("usuario")
                .sort({ createdAt:-1 });

            res.render("staff/configuracoes", { staff, propostas });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================
    // Solicitar usuário (vai pro console do admin aprovar)
    // ==========================

    solicitarUsuarioTela(req, res){

        res.render("staff/solicitar-usuario", { enviado:false, erro:null });

    },

    async solicitarUsuario(req, res){

        try{

            const { nomeUsuario, emailUsuario, tipoSolicitado, observacao } = req.body;

            if(!nomeUsuario || !emailUsuario){

                return res.render("staff/solicitar-usuario",{
                    enviado:false,
                    erro:"Preencha nome e e-mail do usuário."
                });

            }

            await SolicitacaoUsuario.create({

                staffSolicitante: req.session.usuario.id,
                nomeUsuario,
                emailUsuario,
                tipoSolicitado: tipoSolicitado === "staff" ? "staff" : "cliente",
                observacao: observacao || ""

            });

            res.render("staff/solicitar-usuario", { enviado:true, erro:null });

        }catch(err){

            console.error(err);

            res.render("staff/solicitar-usuario",{
                enviado:false,
                erro:"Não foi possível enviar a solicitação agora."
            });

        }

    }

};

export default staffController;
