import Proposta from "../models/Proposta.js";
import Usuario from "../models/Usuario.js";
import Pagamento from "../models/Pagamento.js";

const painelController = {

    async dashboard(req, res){

        try{

            const usuario = await Usuario.findById(req.session.usuario.id);

            const totalPropostas = await Proposta.countDocuments({ usuario: req.session.usuario.id });
            const totalPedidos = await Pagamento.countDocuments({ usuario: req.session.usuario.id });

            res.render("painel/index", {
                dono: usuario,
                totalPropostas,
                totalPedidos
            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================
    // Minhas Propostas
    // ==========================

    async propostas(req, res){

        try{

            const propostas = await Proposta.find({ usuario: req.session.usuario.id })
                .populate("staff")
                .sort({ createdAt:-1 });

            res.render("painel/propostas", { propostas });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async verProposta(req, res){

        try{

            const proposta = await Proposta.findOne({
                _id: req.params.id,
                usuario: req.session.usuario.id
            })
                .populate("staff")
                .populate("historico.autor");

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            res.render("painel/proposta-detalhe", { proposta });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================
    // Aprovar / Recusar (versão simples — a edição completa
    // com contraproposta fica pra uma próxima fase)
    // ==========================

    async aprovar(req, res){

        try{

            const proposta = await Proposta.findOne({
                _id: req.params.id,
                usuario: req.session.usuario.id
            });

            if(!proposta || proposta.status !== "aberta"){

                return res.status(404).render("erro/404");

            }

            proposta.aprovadoUsuario = true;

            if(proposta.aprovadoStaff){
                proposta.status = "aprovada";
            }

            proposta.historico.push({
                tipo:"aprovacao",
                autor: req.session.usuario.id,
                dadosDepois:{ status: proposta.status }
            });

            await proposta.save();

            res.redirect("/painel/propostas/" + proposta._id);

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async recusar(req, res){

        try{

            const proposta = await Proposta.findOne({
                _id: req.params.id,
                usuario: req.session.usuario.id
            });

            if(!proposta || proposta.status !== "aberta"){

                return res.status(404).render("erro/404");

            }

            proposta.status = "recusada";

            proposta.historico.push({
                tipo:"recusa",
                autor: req.session.usuario.id
            });

            await proposta.save();

            res.redirect("/painel/propostas/" + proposta._id);

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================
    // Meus Pedidos (pacotes solicitados)
    // ==========================

    async pedidos(req, res){

        try{

            const pedidos = await Pagamento.find({ usuario: req.session.usuario.id })
                .populate("pacote")
                .sort({ createdAt:-1 });

            res.render("painel/pedidos", { pedidos });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================
    // Configurações da conta
    // ==========================

    async configuracoes(req, res){

        try{

            const usuario = await Usuario.findById(req.session.usuario.id)
                .populate("staffCriador");

            res.render("painel/configuracoes", { dono: usuario });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default painelController;
