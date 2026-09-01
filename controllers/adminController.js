import Post from "../models/Post.js";
import Usuario from "../models/Usuario.js";
import Pacote from "../models/Pacote.js";
import Categoria from "../models/Categoria.js";
import Pagamento from "../models/Pagamento.js";

const adminController = {

    // Dashboard Principal
    async dashboard(req, res){

        try{

            const totalPosts = await Post.countDocuments();

            const totalUsuarios = await Usuario.countDocuments();

            const totalPacotes = await Pacote.countDocuments();

            const totalCategorias = await Categoria.countDocuments();

            const totalPagamentos = await Pagamento.countDocuments();

            const ultimosPosts = await Post.find()
                .sort({createdAt:-1})
                .limit(5)
                .populate("categoria")
                .populate("autor");

            const ultimosUsuarios = await Usuario.find()
                .sort({createdAt:-1})
                .limit(5);

            const ultimosPagamentos = await Pagamento.find()
                .sort({createdAt:-1})
                .limit(5)
                .populate("usuario")
                .populate("pacote");

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