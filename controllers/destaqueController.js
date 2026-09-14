import Destaque from "../models/Destaque.js";
import imagemParaBase64 from "../utils/imagemBase64.js";
import { invalidarDestaques } from "../utils/cache.js";

const destaqueController = {

    // ===========================
    // LISTAR
    // ===========================

    async listar(req, res){

        try{

            const destaques = await Destaque.find()
                .sort({ createdAt:-1 });

            res.render("dashboard/destaque/lista", {

                destaques

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // FORM NOVO
    // ===========================

    novo(req, res){

        res.render("dashboard/destaque/form", {

            destaque:null

        });

    },

    // ===========================
    // SALVAR (criar)
    // ===========================

    async salvar(req, res){

        try{

            const {

                ativo,
                exibirEm,
                tipo,
                titulo,
                descricao,
                link,
                textoBotao

            } = req.body;

            await Destaque.create({

                ativo: ativo === "true",
                exibirEm: exibirEm || "ambos",
                tipo,
                titulo,
                descricao,
                link,
                textoBotao: textoBotao || "Ver mais",
                imagem: req.file ? imagemParaBase64(req.file) : "",
                atualizadoPor: req.session.usuario.id

            });

            invalidarDestaques();

            res.redirect("/dashboard/destaque");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // FORM EDITAR
    // ===========================

    async editar(req, res){

        try{

            const destaque = await Destaque.findById(req.params.id);

            if(!destaque){

                return res.redirect("/dashboard/destaque");

            }

            res.render("dashboard/destaque/form", {

                destaque

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // ATUALIZAR
    // ===========================

    async atualizar(req, res){

        try{

            const {

                ativo,
                exibirEm,
                tipo,
                titulo,
                descricao,
                link,
                textoBotao

            } = req.body;

            const dados = {

                ativo: ativo === "true",
                exibirEm: exibirEm || "ambos",
                tipo,
                titulo,
                descricao,
                link,
                textoBotao: textoBotao || "Ver mais",
                atualizadoPor: req.session.usuario.id

            };

            if(req.file){

                dados.imagem = imagemParaBase64(req.file);

            }

            await Destaque.findByIdAndUpdate(

                req.params.id,

                dados

            );

            invalidarDestaques();

            res.redirect("/dashboard/destaque");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // EXCLUIR
    // ===========================

    async excluir(req, res){

        try{

            await Destaque.findByIdAndDelete(

                req.params.id

            );

            invalidarDestaques();

            res.redirect("/dashboard/destaque");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    }

};

export default destaqueController;
