import EmpresaAvaliada from "../models/EmpresaAvaliada.js";
import { CATEGORIAS, RUBRICA, notaGeral, notaGrupo, temSeloQualidade, destaques, badges } from "../utils/avaliacaoLyxus.js";

const avaliacaoController = {

    // Pesquisa + Destaques do mês
    async index(req, res){

        try{

            const aba = req.query.aba === "destaques" ? "destaques" : "pesquisa";

            const busca = (req.query.busca || "").trim();

            const categoria = req.query.categoria || "";

            const todas = await EmpresaAvaliada.find({ ativo:true }).lean();

            const comNota = todas.map(e => ({
                empresa: e,
                nota: notaGeral(e)
            }));

            let resultados = comNota;

            if(categoria){
                resultados = resultados.filter(r => r.empresa.categoria === categoria);
            }

            if(busca){

                const alvo = busca.toLowerCase();

                resultados = resultados.filter(r =>
                    r.empresa.nome.toLowerCase().includes(alvo) ||
                    r.empresa.categoria.toLowerCase().includes(alvo) ||
                    (r.empresa.localizacao || "").toLowerCase().includes(alvo) ||
                    (r.empresa.descricao || "").toLowerCase().includes(alvo)
                );

            }

            resultados.sort((a, b) => b.nota - a.nota);

            const topDestaques = destaques(todas, 3).map(e => ({
                empresa: e,
                nota: notaGeral(e)
            }));

            res.render("avaliacao/index",{

                aba,
                busca,
                categoriaAtual: categoria,
                categorias: CATEGORIAS,
                resultados,
                destaques: topDestaques,
                totalEmpresas: todas.length,
                temSeloQualidade

            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // Detalhe de uma empresa avaliada, com quebra por rubrica
    async detalhe(req, res){

        try{

            const empresa = await EmpresaAvaliada.findOne({ _id:req.params.id, ativo:true }).lean();

            if(!empresa){

                return res.status(404).render("erro/404");

            }

            const grupos = RUBRICA.map(grupo => ({

                nome: grupo.categoria,
                nota: notaGrupo(empresa, grupo.categoria),
                criterios: grupo.criterios.map(c => ({
                    nome: c,
                    nota: Number((empresa.notas || {})[c]) || 0
                }))

            }));

            res.render("avaliacao/detalhe",{

                empresa,
                nota: notaGeral(empresa),
                selo: temSeloQualidade(empresa),
                grupos,
                badgesEmpresa: badges(empresa)

            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default avaliacaoController;
