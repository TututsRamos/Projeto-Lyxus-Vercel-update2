import Categoria from "../models/Categoria.js";
import slug from "../utils/slug.js";

const categoriaController = {

    // ===========================
    // LISTAR
    // ===========================

    async listar(req,res){

        try{

            const categorias = await Categoria.find()
                .sort({nome:1});

            res.render("dashboard/categorias/lista",{
                categorias
            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // FORM NOVA CATEGORIA
    // ===========================

    novo(req,res){

        res.render("dashboard/categorias/novo");

    },

    // ===========================
    // SALVAR
    // ===========================

    async salvar(req,res){

        try{

            const{

                nome,
                descricao,
                cor,
                icone

            }=req.body;

            const existe=await Categoria.findOne({nome});

            if(existe){

                return res.redirect("/dashboard/categorias");

            }

            await Categoria.create({

                nome,

                slug:slug(nome),

                descricao,

                cor,

                icone

            });

            res.redirect("/dashboard/categorias");

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

            const categoria=await Categoria.findById(req.params.id);

            if(!categoria){

                return res.redirect("/dashboard/categorias");

            }

            res.render("dashboard/categorias/editar",{

                categoria

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

            const{

                nome,
                descricao,
                cor,
                icone,
                ativo

            }=req.body;

            await Categoria.findByIdAndUpdate(

                req.params.id,

                {

                    nome,

                    slug:slug(nome),

                    descricao,

                    cor,

                    icone,

                    ativo:ativo==="true"

                }

            );

            res.redirect("/dashboard/categorias");

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

            await Categoria.findByIdAndDelete(req.params.id);

            res.redirect("/dashboard/categorias");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    }

};

export default categoriaController;