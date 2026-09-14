// Área exclusiva de quem tem a permissão "suporte". A única
// função dessa tela é dar acesso ao lado de resposta do
// tawk.to — sem nenhum outro dado do dashboard.
const suporteController = {

    async tela(req, res){

        try{

            // middleware/locals.js já buscou (com cache) a Configuracao
            // pra essa mesma requisição — reusamos em vez de buscar
            // o mesmo documento de novo.
            const configuracao = res.locals.config;

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
