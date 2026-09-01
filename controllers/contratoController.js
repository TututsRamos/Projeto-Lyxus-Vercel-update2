import Contrato from "../models/Contrato.js";
import numerarLogs from "../utils/numerarLogs.js";
import registrarLog from "../utils/registrarLog.js";

async function gerarCodigoContrato(){

    const ano = new Date().getFullYear();

    const quantidade = await Contrato.countDocuments({
        codigo: new RegExp(`^LYX-${ano}-`)
    });

    return `LYX-${ano}-${String(quantidade + 1).padStart(4, "0")}`;

}

const contratoController = {

    // Lista de contratos arquivados
    async listar(req, res){

        try{

            const contratos = await Contrato.find()
                .sort({ createdAt:-1 })
                .lean();

            const souAdminOuMaster = ["admin","master"].includes(req.session.usuario.tipo);

            res.render("dashboard/contratos/index", { contratos, souAdminOuMaster });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    novoTela(req, res){

        res.render("dashboard/contratos/novo", { erro:null, dados:{} });

    },

    async criar(req, res){

        try{

            const { tituloServico, nomeEmpresa, cnpj, dataContrato, equipeResponsavel, gerenteProjeto } = req.body;

            if(!nomeEmpresa || !dataContrato || !gerenteProjeto){

                return res.render("dashboard/contratos/novo",{
                    erro:"Preencha ao menos empresa, gerente de projeto e data de contrato.",
                    dados:req.body
                });

            }

            const codigo = await gerarCodigoContrato();

            const contrato = await Contrato.create({

                tituloServico: tituloServico || "",
                nomeEmpresa,
                cnpj: cnpj || "",
                codigo,
                dataContrato: new Date(dataContrato),
                equipeResponsavel: equipeResponsavel || "LYXUS",
                gerenteProjeto,
                criadoPor: req.session.usuario.id

            });

            await registrarLog(
                "contrato_criado",
                req.session.usuario.id,
                `Arquivou o contrato ${contrato.codigo} (${contrato.nomeEmpresa})`
            );

            res.redirect(`/dashboard/contratos/${contrato._id}`);

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // Detalhe do contrato + logs
    async detalhe(req, res){

        try{

            const contrato = await Contrato.findById(req.params.id)
                .populate("logs.autor")
                .populate("logs.removidoPor")
                .lean();

            if(!contrato){

                return res.status(404).render("erro/404");

            }

            const logsNumerados = numerarLogs(contrato.logs).reverse();
            // .reverse() -> log mais recente aparece primeiro na tela

            const souAdminOuMaster = ["admin","master"].includes(req.session.usuario.tipo);

            res.render("dashboard/contratos/detalhe",{

                contrato,
                logs: logsNumerados,
                souAdminOuMaster

            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async adicionarLog(req, res){

        try{

            const contrato = await Contrato.findById(req.params.id);

            if(!contrato){

                return res.status(404).render("erro/404");

            }

            const texto = (req.body.texto || "").trim();

            if(texto){

                contrato.logs.push({
                    texto,
                    autor: req.session.usuario.id
                });

                await contrato.save();

                await registrarLog(
                    "contrato_log_adicionado",
                    req.session.usuario.id,
                    `Adicionou um log de modificação ao contrato ${contrato.codigo}`
                );

            }

            res.redirect(`/dashboard/contratos/${contrato._id}`);

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // Botão "X" — exclusivo de admin/master. Exclui o log de
    // verdade (não fica riscado, some da lista e a numeração dos
    // logs restantes se reorganiza automaticamente).
    async removerLog(req, res){

        try{

            if(!["admin","master"].includes(req.session.usuario.tipo)){

                return res.status(403).render("erro/500",{
                    mensagem:"Só administradores podem excluir logs."
                });

            }

            const contrato = await Contrato.findById(req.params.id);

            if(!contrato){

                return res.status(404).render("erro/404");

            }

            contrato.logs.pull({ _id:req.params.logId });

            await contrato.save();

            await registrarLog(
                "contrato_log_excluido",
                req.session.usuario.id,
                `Excluiu um log de modificação do contrato ${contrato.codigo}`
            );

            res.redirect(`/dashboard/contratos/${contrato._id}`);

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async alterarStatus(req, res){

        try{

            const contrato = await Contrato.findById(req.params.id);

            if(!contrato){

                return res.status(404).render("erro/404");

            }

            const statusValidos = ["em_andamento","concluido","arquivado"];

            if(statusValidos.includes(req.body.status)){

                contrato.status = req.body.status;
                await contrato.save();

            }

            res.redirect(`/dashboard/contratos/${contrato._id}`);

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // Exclusão do contrato inteiro — exclusivo de admin/master,
    // pra corrigir contrato criado errado, cancelamento do
    // cliente, testes, etc.
    async excluirContrato(req, res){

        try{

            if(!["admin","master"].includes(req.session.usuario.tipo)){

                return res.status(403).render("erro/500",{
                    mensagem:"Só administradores podem excluir contratos."
                });

            }

            const contrato = await Contrato.findByIdAndDelete(req.params.id);

            if(contrato){

                await registrarLog(
                    "contrato_excluido",
                    req.session.usuario.id,
                    `Excluiu o contrato ${contrato.codigo} (${contrato.nomeEmpresa})`
                );

            }

            res.redirect("/dashboard/contratos");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================================================
    // Contrato e Sumário (visão do cliente): texto do contrato
    // dividido em parágrafos, cada um podendo referenciar um
    // artigo (ex: "Art. 30"). O sumário/glossário explica cada
    // artigo. Ao clicar no artigo, o cliente é levado até a
    // explicação correspondente no sumário (âncora na mesma página).
    // ==========================================================

    // Tela de edição (admin/staff) — usa uma sintaxe simples em
    // texto plano pra não precisar de campos dinâmicos em JS:
    //   parágrafo do contrato aqui | Art. 30
    //   Art. 30 = explicação do artigo
    async documentoTela(req, res){

        try{

            const contrato = await Contrato.findById(req.params.id).lean();

            if(!contrato){

                return res.status(404).render("erro/404");

            }

            const paragrafosTexto = (contrato.paragrafos || [])
                .map(p => p.artigo ? `${p.texto} | ${p.artigo}` : p.texto)
                .join("\n\n");

            const glossarioTexto = (contrato.glossario || [])
                .map(g => `${g.artigo} = ${g.descricao}`)
                .join("\n");

            res.render("dashboard/contratos/documento",{
                contrato,
                paragrafosTexto,
                glossarioTexto
            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async salvarDocumento(req, res){

        try{

            const contrato = await Contrato.findById(req.params.id);

            if(!contrato){

                return res.status(404).render("erro/404");

            }

            const paragrafosTexto = req.body.paragrafosTexto || "";
            const glossarioTexto = req.body.glossarioTexto || "";

            const paragrafos = paragrafosTexto
                .split(/\n\s*\n/)
                .map(bloco => bloco.trim())
                .filter(Boolean)
                .map(bloco => {

                    const partes = bloco.split("|");
                    const texto = partes[0].trim();
                    const artigo = partes[1] ? partes[1].trim() : "";

                    return { texto, artigo };

                });

            const glossario = glossarioTexto
                .split("\n")
                .map(linha => linha.trim())
                .filter(Boolean)
                .map(linha => {

                    const [artigo, ...resto] = linha.split("=");

                    return {
                        artigo: (artigo || "").trim(),
                        descricao: resto.join("=").trim()
                    };

                })
                .filter(g => g.artigo);

            contrato.paragrafos = paragrafos;
            contrato.glossario = glossario;

            await contrato.save();

            await registrarLog(
                "contrato_documento_atualizado",
                req.session.usuario.id,
                `Atualizou o documento do contrato ${contrato.codigo}`
            );

            res.redirect(`/dashboard/contratos/${contrato._id}`);

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // Visão do cliente — pública (sem login), acessada pelo
    // código do contrato. Mostra o texto do contrato com os
    // artigos ao lado de cada parágrafo, e o glossário completo
    // logo abaixo (âncoras: clicar no artigo desce até ele).
    async clienteTela(req, res){

        try{

            const contrato = await Contrato.findOne({ codigo:req.params.codigo }).lean();

            if(!contrato){

                return res.status(404).render("erro/404");

            }

            const slug = (artigo) => (artigo || "")
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

            const paragrafos = (contrato.paragrafos || []).map(p => ({
                ...p,
                slug: slug(p.artigo)
            }));

            const glossario = (contrato.glossario || []).map(g => ({
                ...g,
                slug: slug(g.artigo)
            }));

            res.render("contrato-cliente/detalhe", { contrato, paragrafos, glossario });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default contratoController;
