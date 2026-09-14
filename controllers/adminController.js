import Post from "../models/Post.js";
import Usuario from "../models/Usuario.js";
import Pacote from "../models/Pacote.js";
import Categoria from "../models/Categoria.js";
import Pagamento from "../models/Pagamento.js";

const adminController = {

    // Dashboard Principal
    async dashboard(req, res){

        try{

            // As 8 consultas abaixo são independentes entre si (nenhuma
            // usa o resultado da outra), mas estavam todas com "await"
            // uma atrás da outra — ou seja, a página só terminava de
            // carregar depois da SOMA do tempo das 8. Com Promise.all
            // elas saem todas ao mesmo tempo e a página espera só a
            // mais lenta das 8, não a soma.
            const [
                totalPosts,
                totalUsuarios,
                totalPacotes,
                totalCategorias,
                totalPagamentos,
                ultimosPosts,
                ultimosUsuarios,
                ultimosPagamentos
            ] = await Promise.all([

                Post.countDocuments(),

                Usuario.countDocuments(),

                Pacote.countDocuments(),

                Categoria.countDocuments(),

                Pagamento.countDocuments(),

                Post.find()
                    .sort({createdAt:-1})
                    .limit(5)
                    .populate("categoria")
                    .populate("autor"),

                Usuario.find()
                    .sort({createdAt:-1})
                    .limit(5),

                Pagamento.find()
                    .sort({createdAt:-1})
                    .limit(5)
                    .populate("usuario")
                    .populate("pacote")

            ]);

            res.render("dashboard/index",{

                totalPosts,

                totalUsuarios,

                totalPacotes,

                totalCategorias,

                totalPagamentos,

                ultimosPosts,

                ultimosUsuarios,

                ultimosPagamentos

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    }

};

export default adminController;