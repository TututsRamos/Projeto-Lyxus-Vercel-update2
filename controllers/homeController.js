import Post from "../models/Post.js";
import Pacote from "../models/Pacote.js";

const homeController = {

    // =====================================
    // Página Inicial
    // =====================================

    async index(req, res){

        try{

            // middleware/locals.js já busca Configuracao (com cache)
            // pra TODA página, incluindo essa — reusamos res.locals.config
            // em vez de buscar o mesmo documento de novo no banco.
            const configuracao = res.locals.config;

            // posts e pacotes não dependem um do outro, então buscamos
            // os dois ao mesmo tempo (Promise.all) em vez de um esperar
            // o outro terminar.
            const [posts, pacotes] = await Promise.all([

                Post.find({ publicado: true })
                    .populate("categoria")
                    .populate("autor")
                    .sort({ createdAt: -1 })
                    .limit(3),

                Pacote.find({ ativo: true })
                    .sort({ preco: 1 })

            ]);

            res.render("home/index",{

                configuracao,

                posts,

                pacotes

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    }

};

export default homeController;