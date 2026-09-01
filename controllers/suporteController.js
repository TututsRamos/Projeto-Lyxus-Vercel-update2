import Configuracao from "../models/Configuracao.js";

// Área exclusiva de quem tem a permissão "suporte". A única
// função dessa tela é dar acesso ao lado de resposta do
// tawk.to — sem nenhum outro dado do dashboard.
const suporteController = {

    async tela(req, res){

        try{

            const configuracao = await Configuracao.findOne();

            res.render("dashboard/suporte/index", {

                tawkDashboardUrl: (configuracao && configuracao.tawkDashboardUrl) || "https://dashboard.tawk.to/"

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    }

};

export default suporteController;
