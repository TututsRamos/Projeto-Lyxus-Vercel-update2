import ContratoModelo from "../models/ContratoModelo.js";
import registrarLog from "../utils/registrarLog.js";

// Sempre há no máximo 1 documento nesta coleção — se ainda não
// existir (primeira vez que alguém acessa a tela), cria um vazio
// na hora em vez de exigir uma tela de "criar contrato" separada.
async function buscarOuCriar(){

    let modelo = await ContratoModelo.findOne();

    if(!modelo){
        modelo = await ContratoModelo.create({});
    }

    return modelo;

}

const contratoModeloController = {

    // Tela de edição (admin/staff com permissão "contratos") —
    // mesma sintaxe em texto plano usada no contrato por cliente:
    //   parágrafo do contrato aqui | Art. 30
    //   Art. 30 = explicação do artigo
    async documentoTela(req, res){

        try{

            const modelo = await buscarOuCriar();

            const paragrafosTexto = (modelo.paragrafos || [])
                .map(p => p.artigo ? `${p.texto} | ${p.artigo}` : p.texto)
                .join("\n\n");

            const glossarioTexto = (modelo.glossario || [])
                .map(g => `${g.artigo} = ${g.descricao}`)
                .join("\n");

            res.render("dashboard/contrato-modelo/documento", {
                modelo,
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

            const modelo = await buscarOuCriar();

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

            modelo.paragrafos = paragrafos;
            modelo.glossario = glossario;
            modelo.atualizadoPor = req.session.usuario.id;

            await modelo.save();

            await registrarLog(
                "contrato_modelo_atualizado",
                req.session.usuario.id,
                "Atualizou o contrato institucional (contrato e sumário)"
            );

            res.redirect("/dashboard/contrato-sumario");

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // Visão pública — sem login, sem código de contrato (é o
    // contrato-modelo, não um contrato fechado com uma empresa).
    // Acessível pelo botão "Dê uma olhada em nosso contrato".
    async clienteTela(req, res){

        try{

            const modelo = await ContratoModelo.findOne().lean();

            const slug = (artigo) => (artigo || "")
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

            const paragrafos = (modelo?.paragrafos || []).map(p => ({
                ...p,
                slug: slug(p.artigo)
            }));

            const glossario = (modelo?.glossario || []).map(g => ({
                ...g,
                slug: slug(g.artigo)
            }));

            res.render("contrato-modelo-cliente/detalhe", { paragrafos, glossario });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default contratoModeloController;
