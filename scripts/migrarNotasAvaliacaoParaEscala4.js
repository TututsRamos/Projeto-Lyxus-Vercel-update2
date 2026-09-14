// Script de execução única. A "Área de pesquisa e avaliação
// Lyxus" mudou de escala na v2: cada critério passou de 1-10
// pra 1-4 (ver utils/avaliacaoLyxus.js). Este script converte as
// notas já cadastradas no banco pra nova escala, usando a mesma
// fórmula aplicada na migração do protótipo Lovable:
//
//   nota4 = arredondar(1 + (nota10 - 1) / 3), limitada a 1..4
//
// Uso (a partir da raiz do projeto):
//   node scripts/migrarNotasAvaliacaoParaEscala4.js
//
// Rode uma única vez, depois do deploy da v2. Rodar de novo não
// tem efeito adicional (o script marca cada empresa migrada e
// pula quem já foi convertido).

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import EmpresaAvaliada from "../models/EmpresaAvaliada.js";

function converterNota10Para4(valor){

    const n = Number(valor);

    if(!Number.isFinite(n)) return null;

    const convertida = Math.round(1 + (n - 1) / 3);

    return Math.max(1, Math.min(4, convertida));

}

async function main(){

    await mongoose.connect(process.env.MONGO_URI);

    // Já migradas (têm o marcador abaixo) não são tocadas de novo.
    const empresas = await EmpresaAvaliada.find({ notasMigradasEscala4:{ $ne:true } });

    console.log(`Encontradas ${empresas.length} empresa(s) para migrar.`);

    for(const empresa of empresas){

        const notasAntigas = empresa.notas || {};
        const notasNovas = {};

        for(const [criterio, valor] of Object.entries(notasAntigas)){

            const convertida = converterNota10Para4(valor);

            if(convertida !== null) notasNovas[criterio] = convertida;

        }

        empresa.notas = notasNovas;
        empresa.notasMigradasEscala4 = true;

        await empresa.save();

        console.log(`✅ Migrada: ${empresa.nome}`);

    }

    await mongoose.disconnect();

    console.log("Concluído.");

}

main().catch(err => {
    console.error("Erro ao migrar notas da avaliação:", err);
    process.exit(1);
});
