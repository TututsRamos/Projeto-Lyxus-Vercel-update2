import Pagamento from "../models/Pagamento.js";
import Usuario from "../models/Usuario.js";
import registrarLog from "../utils/registrarLog.js";

const pagamentoController = {

    async lista(req, res){

        try{

            const pagamentos = await Pagamento.find()
                .populate("usuario")
                .populate("pacote")
                .sort({ createdAt:-1 });

            res.render("dashboard/pagamentos/lista", { pagamentos });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async aprovar(req, res){

        try{

            const pagamento = await Pagamento.findById(req.params.id);

            if(!pagamento){

                return res.status(404).render("erro/404");

            }

            pagamento.status = "aprovado";

            if(req.body.transactionId){
                pagamento.transactionId = req.body.transactionId;
            }

            await pagamento.save();

            await registrarLog(
                "pagamento_aprovado",
                req.session.usuario.id,
                `Aprovou o pagamento de R$ ${pagamento.valor} (${pagamento.metodo})`
            );

            res.redirect("/dashboard/pagamentos");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async cancelar(req, res){

        try{

            const pagamento = await Pagamento.findById(req.params.id);

            if(!pagamento){

                return res.status(404).render("erro/404");

            }

            pagamento.status = "cancelado";
            await pagamento.save();

            await registrarLog(
                "pagamento_cancelado",
                req.session.usuario.id,
                `Cancelou o pagamento de R$ ${pagamento.valor} (${pagamento.metodo})`
            );

            res.redirect("/dashboard/pagamentos");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default pagamentoController;
