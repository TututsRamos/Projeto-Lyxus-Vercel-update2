import Usuario from "../models/Usuario.js";
import Proposta from "../models/Proposta.js";
import CodigoAcesso from "../models/CodigoAcesso.js";
import SolicitacaoUsuario from "../models/SolicitacaoUsuario.js";
import Log from "../models/Log.js";
import EmpresaAvaliada from "../models/EmpresaAvaliada.js";
import PropostaComunidade from "../models/PropostaComunidade.js";
import registrarLog from "../utils/registrarLog.js";
import hashSenha from "../utils/hashSenha.js";
import { CATEGORIAS, RUBRICA, notaGeral } from "../utils/avaliacaoLyxus.js";
import imagemParaBase64 from "../utils/imagemBase64.js";

function gerarCodigoAleatorio(){

    return Math.random().toString(36).slice(2, 8).toUpperCase() +
           Math.random().toString(36).slice(2, 6).toUpperCase();

}

// Recebe o valor de um <input type="date"> ("AAAA-MM-DD") e devolve um
// Date válido ou null — impede cadastrar datas impossíveis (o bug
// antigo do campo de texto livre, que aceitava algo como "34/42/1945").
function parseDataLimite(valor){

    if(!valor) return null;

    const data = new Date(`${valor}T00:00:00`);

    return isNaN(data.getTime()) ? null : data;

}

// Monta a lista de opções de uma proposta do tipo "votação" a partir
// dos campos "opcoes[]" do formulário, ignorando linhas em branco e
// preservando a contagem de votos já existente (por texto) quando é
// uma edição.
function montarOpcoesVotacao(body, opcoesAtuais = []){

    const textos = Array.isArray(body.opcoes)
        ? body.opcoes
        : (body.opcoes ? [body.opcoes] : []);

    return textos
        .map(t => (t || "").trim())
        .filter(Boolean)
        .map(texto => {

            const existente = opcoesAtuais.find(o => o.texto === texto);

            return { texto, votos: existente ? existente.votos : 0 };

        });

}

const adminConsoleController = {

    // ==========================================================
    // CONSOLE 1: LOGS GERAIS
    // ==========================================================

    async logs(req, res){

        try{

            const logs = await Log.find()
                .populate("autor")
                .sort({ createdAt:-1 })
                .limit(200);

            res.render("dashboard/console/logs", { logs });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================================================
    // CONSOLE 2: PROPOSTAS APROVADAS OU REPROVADAS
    // ==========================================================

    async propostasConsole(req, res){

        try{

            const propostas = await Proposta.find({
                status:{ $in:["aprovada","recusada","cancelada"] }
            })
                .populate("usuario")
                .populate("staff")
                .sort({ updatedAt:-1 });

            res.render("dashboard/console/propostas", { propostas });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async propostaDetalhe(req, res){

        try{

            const proposta = await Proposta.findById(req.params.id)
                .populate("usuario")
                .populate("staff")
                .populate("staffsEnvolvidos")
                .populate("historico.autor");

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            res.render("dashboard/console/proposta-detalhe", { proposta });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================================================
    // CONSOLE 3: USUÁRIOS (painel categorizado + solicitações)
    // ==========================================================

    async usuariosConsole(req, res){

        try{

            const todosStaff = await Usuario.find({ tipo:"staff" }).sort({ nome:1 });

            // Agrupa STAFF por área, ativos primeiro dentro de cada área
            const staffPorArea = {};

            todosStaff.forEach(s => {

                const area = s.areaAtuacao || "outro";

                if(!staffPorArea[area]){
                    staffPorArea[area] = { ativos:[], inativos:[] };
                }

                if(s.ativo){
                    staffPorArea[area].ativos.push(s);
                }else{
                    staffPorArea[area].inativos.push(s);
                }

            });

            const todosClientes = await Usuario.find({ tipo:"cliente" }).sort({ nome:1 });

            // "Temporário" = tem código de vinculação com validade;
            // "Permanente" = conta sem esse vínculo por código.
            const clientes = {

                temporarios: { ativos:[], inativos:[] },
                permanentes: { ativos:[], inativos:[] }

            };

            todosClientes.forEach(c => {

                const grupo = c.codigoValidoAte ? clientes.temporarios : clientes.permanentes;

                if(c.ativo){
                    grupo.ativos.push(c);
                }else{
                    grupo.inativos.push(c);
                }

            });

            const admins = await Usuario.find({ tipo:{ $in:["admin","master"] } }).sort({ nome:1 });

            const solicitacoesPendentes = await SolicitacaoUsuario.countDocuments({ status:"pendente" });

            res.render("dashboard/console/usuarios", {

                staffPorArea,
                clientes,
                admins,
                solicitacoesPendentes,
                souMaster: req.session.usuario.tipo === "master"

            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // Popup com detalhes de um usuário (carregado via fetch)
    async usuarioJson(req, res){

        try{

            const usuario = await Usuario.findById(req.params.id)
                .populate("staffCriador")
                .lean();

            if(!usuario){

                return res.status(404).json({ erro:"Usuário não encontrado." });

            }

            delete usuario.senha;

            res.json(usuario);

        }catch(err){

            console.error(err);
            res.status(500).json({ erro:"Erro ao buscar usuário." });

        }

    },

    async alternarAtivo(req, res){

        try{

            const usuario = await Usuario.findById(req.params.id);

            if(!usuario){

                return res.status(404).render("erro/404");

            }

            if(usuario.tipo === "master"){

                return res.status(403).render("erro/500",{
                    mensagem:"O usuário mestre não pode ser desativado."
                });

            }

            usuario.ativo = !usuario.ativo;
            await usuario.save();

            await registrarLog(
                "usuario_editado",
                req.session.usuario.id,
                `${usuario.ativo ? "Ativou" : "Desativou"} o usuário ${usuario.nome}`
            );

            res.redirect("/dashboard/console/usuarios");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async excluirUsuario(req, res){

        try{

            const usuario = await Usuario.findById(req.params.id);

            if(!usuario){

                return res.status(404).render("erro/404");

            }

            if(usuario.tipo === "master"){

                return res.status(403).render("erro/500",{
                    mensagem:"O usuário mestre não pode ser excluído."
                });

            }

            await Usuario.findByIdAndDelete(req.params.id);

            await registrarLog(
                "usuario_excluido",
                req.session.usuario.id,
                `Excluiu o usuário ${usuario.nome} (${usuario.email})`
            );

            res.redirect("/dashboard/console/usuarios");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================================================
    // SOLICITAÇÕES DE USUÁRIO (feitas pelo STAFF)
    // ==========================================================

    async solicitacoes(req, res){

        try{

            const solicitacoes = await SolicitacaoUsuario.find({ status:"pendente" })
                .populate("staffSolicitante")
                .sort({ createdAt:-1 });

            res.render("dashboard/console/solicitacoes", { solicitacoes });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // Aprova: cria o usuário de verdade + já gera um código de acesso
    async aprovarSolicitacao(req, res){

        try{

            const solicitacao = await SolicitacaoUsuario.findById(req.params.id);

            if(!solicitacao || solicitacao.status !== "pendente"){

                return res.status(404).render("erro/404");

            }

            const existente = await Usuario.findOne({ email: solicitacao.emailUsuario });

            if(existente){

                solicitacao.status = "reprovada";
                solicitacao.respostaAdmin = "Já existe um usuário com esse e-mail.";
                solicitacao.respondidoPor = req.session.usuario.id;
                await solicitacao.save();

                return res.redirect("/dashboard/console/solicitacoes");

            }

            const senhaProvisoria = Math.random().toString(36).slice(-10);

            const novoUsuario = await Usuario.create({

                nome: solicitacao.nomeUsuario,
                email: solicitacao.emailUsuario,
                senha: await hashSenha(senhaProvisoria),
                tipo: solicitacao.tipoSolicitado,
                staffCriador: solicitacao.staffSolicitante,
                ativo:true

            });

            // Já gera um código de acesso padrão de 24h pro usuário
            const codigo = gerarCodigoAleatorio();
            const expiraEm = new Date(Date.now() + 24 * 60 * 60 * 1000);

            await CodigoAcesso.create({

                codigo,
                usuario: novoUsuario._id,
                criadoPor: req.session.usuario.id,
                duracaoHoras:24,
                expiraEm

            });

            novoUsuario.codigoVinculacao = codigo;
            novoUsuario.codigoValidoAte = expiraEm;
            await novoUsuario.save();

            solicitacao.status = "aprovada";
            solicitacao.respondidoPor = req.session.usuario.id;
            solicitacao.usuarioCriado = novoUsuario._id;
            await solicitacao.save();

            await registrarLog(
                "solicitacao_aprovada",
                req.session.usuario.id,
                `Aprovou a solicitação de ${solicitacao.staffSolicitante} e criou o usuário ${novoUsuario.nome}`,
                { codigoGerado: codigo }
            );

            res.redirect("/dashboard/console/solicitacoes");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async reprovarSolicitacao(req, res){

        try{

            const solicitacao = await SolicitacaoUsuario.findById(req.params.id);

            if(!solicitacao || solicitacao.status !== "pendente"){

                return res.status(404).render("erro/404");

            }

            solicitacao.status = "reprovada";
            solicitacao.respostaAdmin = req.body.motivo || "";
            solicitacao.respondidoPor = req.session.usuario.id;
            await solicitacao.save();

            await registrarLog(
                "solicitacao_reprovada",
                req.session.usuario.id,
                `Reprovou a solicitação de usuário "${solicitacao.nomeUsuario}"`
            );

            res.redirect("/dashboard/console/solicitacoes");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================================================
    // CÓDIGOS DE ACESSO
    // ==========================================================

    async codigosAcesso(req, res){

        try{

            const codigos = await CodigoAcesso.find()
                .populate("usuario")
                .populate("criadoPor")
                .sort({ createdAt:-1 });

            // atualiza status de quem já passou do prazo
            const agora = new Date();

            await Promise.all(codigos
                .filter(c => c.status === "ativo" && c.expiraEm < agora)
                .map(async c => {
                    c.status = "expirado";
                    await c.save();
                })
            );

            const usuarios = await Usuario.find({ tipo:"cliente" }).sort({ nome:1 });

            res.render("dashboard/console/codigos", { codigos, usuarios });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async gerarCodigo(req, res){

        try{

            const { usuarioId, duracaoHoras } = req.body;

            const horas = Math.min(24, Math.max(1, Number(duracaoHoras) || 24));

            const codigo = gerarCodigoAleatorio();
            const expiraEm = new Date(Date.now() + horas * 60 * 60 * 1000);

            await CodigoAcesso.create({

                codigo,
                usuario: usuarioId,
                criadoPor: req.session.usuario.id,
                duracaoHoras: horas,
                expiraEm

            });

            await Usuario.findByIdAndUpdate(usuarioId, {
                codigoVinculacao: codigo,
                codigoValidoAte: expiraEm
            });

            await registrarLog(
                "codigo_gerado",
                req.session.usuario.id,
                `Gerou um código de acesso (${horas}h) para o usuário`,
                { codigo }
            );

            res.redirect("/dashboard/console/codigos");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async revogarCodigo(req, res){

        try{

            const codigoAcesso = await CodigoAcesso.findById(req.params.id);

            if(!codigoAcesso){

                return res.status(404).render("erro/404");

            }

            codigoAcesso.status = "revogado";
            codigoAcesso.revogadoEm = new Date();
            await codigoAcesso.save();

            // Revoga o acesso do usuário vinculado
            await Usuario.findByIdAndUpdate(codigoAcesso.usuario, {
                ativo:false,
                codigoValidoAte:null
            });

            await registrarLog(
                "codigo_revogado",
                req.session.usuario.id,
                `Revogou o código ${codigoAcesso.codigo}`
            );

            res.redirect("/dashboard/console/codigos");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================================================
    // ÁREA DE PESQUISA E AVALIAÇÃO LYXUS (Pique Michelan)
    // Cadastro exclusivo do master — o site público /avaliacao
    // começa vazio e só exibe o que for cadastrado aqui.
    // ==========================================================

    async avaliacoesConsole(req, res){

        try{

            const empresas = await EmpresaAvaliada.find().sort({ createdAt:-1 }).lean();

            const comNota = empresas.map(e => ({ empresa:e, nota:notaGeral(e) }));

            res.render("dashboard/console/avaliacoes", { empresas: comNota });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    avaliacaoNovaTela(req, res){

        res.render("dashboard/console/avaliacao-form",{

            modo:"novo",
            erro:null,
            dados:{},
            categorias:CATEGORIAS,
            rubrica:RUBRICA

        });

    },

    async avaliacaoCriar(req, res){

        try{

            const { nome, categoria, localizacao, googleRating, googleReviews, descricao, notas, ativo } = req.body;

            if(!nome || !categoria){

                return res.render("dashboard/console/avaliacao-form",{
                    modo:"novo",
                    erro:"Preencha ao menos nome e categoria.",
                    dados:req.body,
                    categorias:CATEGORIAS,
                    rubrica:RUBRICA
                });

            }

            const notasLimpa = {};

            Object.entries(notas || {}).forEach(([chave, valor]) => {
                const n = Number(valor);
                if(n) notasLimpa[chave] = Math.max(1, Math.min(10, Math.round(n)));
            });

            const empresa = await EmpresaAvaliada.create({

                nome,
                categoria,
                localizacao: localizacao || "",
                googleRating: Number(googleRating) || 0,
                googleReviews: Number(googleReviews) || 0,
                descricao: descricao || "",
                notas: notasLimpa,
                ativo: ativo === "on" || ativo === "true",
                criadoPor: req.session.usuario.id

            });

            await registrarLog(
                "avaliacao_criada",
                req.session.usuario.id,
                `Cadastrou a empresa avaliada "${empresa.nome}" na área de pesquisa e avaliação`
            );

            res.redirect("/dashboard/console/avaliacoes");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async avaliacaoEditarTela(req, res){

        try{

            const empresa = await EmpresaAvaliada.findById(req.params.id).lean();

            if(!empresa){

                return res.status(404).render("erro/404");

            }

            res.render("dashboard/console/avaliacao-form",{

                modo:"editar",
                erro:null,
                dados:empresa,
                categorias:CATEGORIAS,
                rubrica:RUBRICA

            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async avaliacaoAtualizar(req, res){

        try{

            const empresa = await EmpresaAvaliada.findById(req.params.id);

            if(!empresa){

                return res.status(404).render("erro/404");

            }

            const { nome, categoria, localizacao, googleRating, googleReviews, descricao, notas, ativo } = req.body;

            const notasLimpa = {};

            Object.entries(notas || {}).forEach(([chave, valor]) => {
                const n = Number(valor);
                if(n) notasLimpa[chave] = Math.max(1, Math.min(10, Math.round(n)));
            });

            empresa.nome = nome || empresa.nome;
            empresa.categoria = categoria || empresa.categoria;
            empresa.localizacao = localizacao || "";
            empresa.googleRating = Number(googleRating) || 0;
            empresa.googleReviews = Number(googleReviews) || 0;
            empresa.descricao = descricao || "";
            empresa.notas = notasLimpa;
            empresa.ativo = ativo === "on" || ativo === "true";

            await empresa.save();

            await registrarLog(
                "avaliacao_editada",
                req.session.usuario.id,
                `Editou a empresa avaliada "${empresa.nome}"`
            );

            res.redirect("/dashboard/console/avaliacoes");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async avaliacaoExcluir(req, res){

        try{

            const empresa = await EmpresaAvaliada.findByIdAndDelete(req.params.id);

            if(empresa){

                await registrarLog(
                    "avaliacao_excluida",
                    req.session.usuario.id,
                    `Excluiu a empresa avaliada "${empresa.nome}"`
                );

            }

            res.redirect("/dashboard/console/avaliacoes");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ==========================================================
    // ABA DE PROPOSTAS À COMUNIDADE
    // Cadastro exclusivo do master — iniciativas/propostas
    // abertas ao público, exibidas em /comunidade.
    // ==========================================================

    async comunidadeConsole(req, res){

        try{

            const propostas = await PropostaComunidade.find().sort({ createdAt:-1 }).lean();

            res.render("dashboard/console/comunidade", { propostas });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    comunidadeNovaTela(req, res){

        res.render("dashboard/console/comunidade-form",{
            modo:"novo",
            erro:null,
            dados:{}
        });

    },

    async comunidadeCriar(req, res){

        try{

            const { titulo, tipo, categoria, resumo, descricao, dataLimite, textoBotao, status, ativo, resultadoTitulo, resultadoTexto } = req.body;

            if(!titulo || !descricao){

                return res.render("dashboard/console/comunidade-form",{
                    modo:"novo",
                    erro:"Preencha ao menos título e descrição.",
                    dados:req.body
                });

            }

            const tipoFinal = tipo === "votacao" ? "votacao" : "participacao";

            const opcoes = tipoFinal === "votacao" ? montarOpcoesVotacao(req.body) : [];

            if(tipoFinal === "votacao" && opcoes.length < 2){

                return res.render("dashboard/console/comunidade-form",{
                    modo:"novo",
                    erro:"Uma votação precisa de pelo menos 2 opções preenchidas.",
                    dados:req.body
                });

            }

            const proposta = await PropostaComunidade.create({

                titulo,
                tipo: tipoFinal,
                categoria: categoria || "",
                resumo: resumo || "",
                descricao,
                imagem: req.file ? imagemParaBase64(req.file) : "",
                dataLimite: parseDataLimite(dataLimite),
                textoBotao: textoBotao || "Quero participar",
                opcoes,
                resultado:{
                    titulo: resultadoTitulo || "",
                    texto: resultadoTexto || "",
                    imagem: ""
                },
                status: status === "encerrada" ? "encerrada" : "aberta",
                ativo: ativo === "on" || ativo === "true",
                criadoPor: req.session.usuario.id

            });

            await registrarLog(
                "proposta_comunidade_criada",
                req.session.usuario.id,
                `Cadastrou a proposta à comunidade "${proposta.titulo}"`
            );

            res.redirect("/dashboard/console/comunidade");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async comunidadeEditarTela(req, res){

        try{

            const proposta = await PropostaComunidade.findById(req.params.id).lean();

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            res.render("dashboard/console/comunidade-form",{
                modo:"editar",
                erro:null,
                dados:proposta
            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async comunidadeAtualizar(req, res){

        try{

            const proposta = await PropostaComunidade.findById(req.params.id);

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            const { titulo, tipo, categoria, resumo, descricao, dataLimite, textoBotao, status, ativo, resultadoTitulo, resultadoTexto } = req.body;

            const tipoFinal = tipo === "votacao" ? "votacao" : "participacao";

            if(tipoFinal === "votacao"){

                const opcoes = montarOpcoesVotacao(req.body, proposta.opcoes);

                if(opcoes.length < 2){

                    return res.render("dashboard/console/comunidade-form",{
                        modo:"editar",
                        erro:"Uma votação precisa de pelo menos 2 opções preenchidas.",
                        dados:{ ...req.body, _id:proposta._id }
                    });

                }

                proposta.opcoes = opcoes;

            }else{

                proposta.opcoes = [];

            }

            proposta.titulo = titulo || proposta.titulo;
            proposta.tipo = tipoFinal;
            proposta.categoria = categoria || "";
            proposta.resumo = resumo || "";
            proposta.descricao = descricao || proposta.descricao;
            if(req.file) proposta.imagem = imagemParaBase64(req.file);
            proposta.dataLimite = parseDataLimite(dataLimite);
            proposta.textoBotao = textoBotao || "Quero participar";
            proposta.resultado.titulo = resultadoTitulo || "";
            proposta.resultado.texto = resultadoTexto || "";
            proposta.status = status === "encerrada" ? "encerrada" : "aberta";
            proposta.ativo = ativo === "on" || ativo === "true";

            await proposta.save();

            await registrarLog(
                "proposta_comunidade_editada",
                req.session.usuario.id,
                `Editou a proposta à comunidade "${proposta.titulo}"`
            );

            res.redirect("/dashboard/console/comunidade");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async comunidadeExcluir(req, res){

        try{

            const proposta = await PropostaComunidade.findByIdAndDelete(req.params.id);

            if(proposta){

                await registrarLog(
                    "proposta_comunidade_excluida",
                    req.session.usuario.id,
                    `Excluiu a proposta à comunidade "${proposta.titulo}"`
                );

            }

            res.redirect("/dashboard/console/comunidade");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default adminConsoleController;
