import Post from "../models/Post.js";
import Pacote from "../models/Pacote.js";
import Configuracao from "../models/Configuracao.js";

const homeController = {

    // =====================================
    // Página Inicial
    // =====================================

    async index(req, res){

        try{

            const configuracao = await Configuracao.findOne();

            const posts = await Post.find({
                publicado: true
            })
            .populate("categoria")
            .populate("autor")
            .sort({ createdAt: -1 })
            .limit(3);

            const pacotes = await Pacote.find({
                ativo: true
            })
            .sort({ preco: 1 });

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