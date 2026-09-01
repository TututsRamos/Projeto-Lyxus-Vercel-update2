import PropostaComunidade from "../models/PropostaComunidade.js";
import Contato from "../models/Contato.js";

// Não há cookie-parser no projeto — em vez de adicionar uma
// dependência nova só pra isso, lemos/gravamos um cookie simples na
// mão, só pra impedir que o mesmo navegador vote 2x na mesma votação.
// Não é uma trava contra fraude (dá pra burlar limpando cookies), só
// evita clique duplo/voto repetido por engano.
function lerCookieVoto(req, propostaId){

    const header = req.headers.cookie || "";

    const match = header
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith(`votoComunidade_${propostaId}=`));

    return match ? decodeURIComponent(match.split("=")[1]) : null;

}

function gravarCookieVoto(res, propostaId, opcaoId){

    const nome = `votoComunidade_${propostaId}`;
    const valor = encodeURIComponent(opcaoId);
    const umAno = 60 * 60 * 24 * 365;

    res.append("Set-Cookie", `${nome}=${valor}; Max-Age=${umAno}; Path=/; SameSite=Lax`);

}

const comunidadeController = {

    async index(req, res){

        try{

            const todas = await PropostaComunidade.find({ ativo:true })
                .sort({ createdAt:-1 })
                .lean();

            // Votações e participações abertas (ou encerradas mas sem
            // resultado publicado ainda) ficam na grade principal.
            const propostas = todas.filter(p =>
                !(p.tipo === "votacao" && p.status === "encerrada" && p.resultado && p.resultado.texto)
            );

            // "Abaixo das votações, posts sobre os vitoriosos de cada
            // votação": toda votação encerrada com resultado preenchido
            // vira um card na seção de resultados.
            const resultados = todas.filter(p =>
                p.tipo === "votacao" && p.status === "encerrada" && p.resultado && p.resultado.texto
            );

            res.render("comunidade/index", { propostas, resultados });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async detalhe(req, res){

        try{

            const proposta = await PropostaComunidade.findOne({ _id:req.params.id, ativo:true }).lean();

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            const opcaoVotada = proposta.tipo === "votacao"
                ? lerCookieVoto(req, proposta._id)
                : null;

            res.render("comunidade/detalhe", { proposta, enviado:false, erro:null, opcaoVotada });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async votar(req, res){

        try{

            const proposta = await PropostaComunidade.findOne({ _id:req.params.id, ativo:true, tipo:"votacao" });

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            const opcao = proposta.opcoes.id(req.params.opcaoId);

            const jaVotou = lerCookieVoto(req, proposta._id);

            if(proposta.status !== "aberta" || !opcao || jaVotou){

                return res.redirect(`/comunidade/${proposta._id}`);

            }

            opcao.votos += 1;

            await proposta.save();

            gravarCookieVoto(res, proposta._id, opcao._id);

            res.redirect(`/comunidade/${proposta._id}`);

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    async participar(req, res){

        try{

            const proposta = await PropostaComunidade.findOne({ _id:req.params.id, ativo:true }).lean();

            if(!proposta){

                return res.status(404).render("erro/404");

            }

            const { nome, email, telefone, mensagem } = req.body;

            if(!nome || !email){

                return res.render("comunidade/detalhe",{
                    proposta,
                    enviado:false,
                    erro:"Preencha ao menos nome e e-mail.",
                    opcaoVotada:null
                });

            }

            await Contato.create({
                tipo:"comunidade",
                nome,
                email,
                telefone,
                mensagem,
                detalhes:{
                    propostaComunidade: proposta._id,
                    tituloProposta: proposta.titulo
                }
            });

            res.render("comunidade/detalhe", { proposta, enviado:true, erro:null, opcaoVotada:null });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default comunidadeController;
