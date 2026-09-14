import Configuracao from "../models/Configuracao.js";
import imagemParaBase64 from "../utils/imagemBase64.js";
import { obterConfiguracao, invalidarConfiguracao } from "../utils/cache.js";

const configController = {

    // ===========================
    // TELA DE CONFIGURAÇÕES
    // ===========================

    async mostrar(req,res){

        try{

            const configuracao = await obterConfiguracao();

            res.render("dashboard/configuracoes/index",{

                configuracao

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

            let configuracao = await Configuracao.findOne();

            if(!configuracao){

                configuracao = new Configuracao();

            }

            configuracao.nomeEmpresa = req.body.nomeEmpresa;

            configuracao.descricao = req.body.descricao;

            configuracao.telefone = req.body.telefone;

            configuracao.whatsapp = req.body.whatsapp;

            configuracao.email = req.body.email;

            configuracao.instagram = req.body.instagram;

            configuracao.facebook = req.body.facebook;

            configuracao.linkedin = req.body.linkedin;

            configuracao.playStore = req.body.playStore;

            configuracao.appStore = req.body.appStore;

            configuracao.versaoApp = req.body.versaoApp;

            configuracao.corPrimaria = req.body.corPrimaria;

            configuracao.corSecundaria = req.body.corSecundaria;

            configuracao.pixChave = req.body.pixChave;

            configuracao.pixNomeRecebedor = req.body.pixNomeRecebedor;

            configuracao.pixCidade = req.body.pixCidade;

            configuracao.tawkDashboardUrl = req.body.tawkDashboardUrl;

            configuracao.tawkPropertyId = req.body.tawkPropertyId;

            configuracao.tawkWidgetId = req.body.tawkWidgetId;

            if(req.files?.logo){

                configuracao.logo = imagemParaBase64(req.files.logo[0]);

            }

            if(req.files?.banner){

                configuracao.banner = imagemParaBase64(req.files.banner[0]);

            }

            await configuracao.save();

            // Invalida o cache (utils/cache.js) pra próxima requisição
            // já vir com os dados novos, em vez de esperar o TTL de
            // 1 minuto expirar sozinho.
            invalidarConfiguracao();

            res.redirect("/dashboard/configuracoes");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    }

};

export default configController;