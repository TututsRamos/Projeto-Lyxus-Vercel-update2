import Post from "../models/Post.js";
import Categoria from "../models/Categoria.js";

const blogController = {

    // ===========================
    // LISTA DE POSTS
    // ===========================

    async lista(req, res){

        try{

            // posts e categorias não dependem um do outro — buscamos
            // os dois em paralelo em vez de um esperar o outro.
            const [posts, categorias] = await Promise.all([

                Post.find({ publicado:true })
                    .populate("categoria")
                    .populate("autor")
                    .sort({ createdAt:-1 }),

                Categoria.find({ ativo:true })
                    .sort({ nome:1 })

            ]);

            res.render("blog/lista", {
                posts,
                categorias
            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // POST INDIVIDUAL
    // ===========================

    async post(req, res){

        try{

            const post = await Post.findOne({
                slug: req.params.slug,
                publicado:true
            })
                .populate("categoria")
                .populate("autor");

            if(!post){

                return res.status(404).render("erro/404");

            }

            post.visualizacoes = (post.visualizacoes || 0) + 1;
            await post.save();

            const relacionados = await Post.find({
                categoria: post.categoria,
                _id: { $ne: post._id },
                publicado:true
            }).limit(3);

            res.render("blog/post", {
                post,
                relacionados
            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // POSTS POR CATEGORIA
    // ===========================

    async categoria(req, res){

        try{

            const categoria = await Categoria.findOne({
                slug: req.params.slug,
                ativo:true
            });

            if(!categoria){

                return res.status(404).render("erro/404");

            }

            // posts (dessa categoria) e a lista completa de categorias
            // (pro menu) não dependem uma da outra — em paralelo.
            const [posts, categorias] = await Promise.all([

                Post.find({
                    categoria: categoria._id,
                    publicado:true
                })
                    .populate("categoria")
                    .populate("autor")
                    .sort({ createdAt:-1 }),

                Categoria.find({ ativo:true })
                    .sort({ nome:1 })

            ]);

            res.render("blog/categoria", {
                posts,
                categorias,
                categoriaAtual: categoria
            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // PESQUISA
    // ===========================

    async pesquisa(req, res){

        try{

            const termo = req.query.q ? req.query.q.trim() : "";

            const filtro = termo
                ? {
                    publicado:true,
                    $or:[
                        { titulo: { $regex: termo, $options:"i" } },
                        { resumo: { $regex: termo, $options:"i" } }
                    ]
                }
                : { publicado:true };

            // posts (filtrados pela busca) e a lista de categorias (pro
            // menu) não dependem uma da outra — em paralelo.
            const [posts, categorias] = await Promise.all([

                Post.find(filtro)
                    .populate("categoria")
                    .populate("autor")
                    .sort({ createdAt:-1 }),

                Categoria.find({ ativo:true })
                    .sort({ nome:1 })

            ]);

            res.render("blog/pesquisa", {
                posts,
                categorias,
                termo
            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default blogController;
