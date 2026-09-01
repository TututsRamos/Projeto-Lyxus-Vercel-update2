import Post from "../models/Post.js";
import Categoria from "../models/Categoria.js";
import slug from "../utils/slug.js";
import imagemParaBase64 from "../utils/imagemBase64.js";

const postController = {

    // ===========================
    // LISTAR POSTS
    // ===========================

    async listar(req,res){

        try{

            const posts = await Post.find()
                .populate("categoria")
                .populate("autor")
                .sort({createdAt:-1});

            res.render("dashboard/posts/lista",{

                posts

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },



    // ===========================
    // FORM NOVO POST
    // ===========================

    async novo(req,res){

        try{

            const categorias = await Categoria.find({

                ativo:true

            }).sort({

                nome:1

            });

            res.render("dashboard/posts/add",{

                categorias

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },



    // ===========================
    // SALVAR POST
    // ===========================

    async salvar(req,res){

        try{

            const {

                titulo,

                resumo,

                conteudo,

                categoria,

                publicado

            } = req.body;



            if(!titulo || !conteudo){

                return res.redirect("/dashboard/posts/novo");

            }



            const novoPost = new Post({

                titulo,

                slug:slug(titulo),

                resumo,

                conteudo,

                categoria,

                publicado: publicado === "true",

                imagem:req.file ? imagemParaBase64(req.file) : "",

                autor:req.session.usuario.id

            });



            await novoPost.save();



            res.redirect("/dashboard/posts");



        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },



    // ===========================
    // FORM EDITAR
    // ===========================

    async editar(req,res){

        try{

            const post = await Post.findById(req.params.id);

            if(!post){

                return res.redirect("/dashboard/posts");

            }



            const categorias = await Categoria.find({

                ativo:true

            });



            res.render("dashboard/posts/edit",{

                post,

                categorias

            });



        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },



    // ===========================
    // ATUALIZAR
    // ===========================

    async atualizar(req,res){

        try{

            const {

                titulo,

                resumo,

                conteudo,

                categoria,

                publicado

            } = req.body;



            const dados = {

                titulo,

                slug:slug(titulo),

                resumo,

                conteudo,

                categoria,

                publicado: publicado === "true"

            };



            if(req.file){

                dados.imagem = imagemParaBase64(req.file);

            }



            await Post.findByIdAndUpdate(

                req.params.id,

                dados

            );



            res.redirect("/dashboard/posts");



        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },



    // ===========================
    // EXCLUIR
    // ===========================

    async excluir(req,res){

        try{

            await Post.findByIdAndDelete(

                req.params.id

            );



            res.redirect("/dashboard/posts");



        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    }

};

export default postController;