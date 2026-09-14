// ==========================================================
// Cache em memória pra dados lidos em TODA requisição do site.
//
// middleware/locals.js roda antes de qualquer rota e, pra montar
// res.locals, buscava Configuracao e Destaque no MongoDB em toda
// única página vista (inclusive chamadas de API) — 2 idas ao banco
// que se repetiam sem parar, mesmo esses dados quase não mudando
// (configuração só muda quando o master salva em
// /dashboard/configuracoes; destaques só quando alguém mexe em
// /dashboard/destaque).
//
// Aqui guardamos o resultado por CACHE_TTL_MS e reusamos em vez de
// buscar de novo. Duas garantias contra dado desatualizado:
//   1) TTL curto (1 minuto) — pior caso, uma mudança leva até 1
//      minuto pra aparecer pro próximo visitante.
//   2) Os controllers que alteram esses dados chamam
//      invalidarConfiguracao()/invalidarDestaques() logo depois de
//      salvar, então na prática a mudança aparece na hora, e o TTL
//      é só uma rede de segurança.
//
// Observação sobre Vercel/serverless: cada container mantém seu
// próprio cache (não é compartilhado entre instâncias diferentes),
// mas isso não atrapalha — o ganho é evitar repetir a MESMA consulta
// dentro do mesmo container várias vezes seguidas, que é justamente
// o caso comum (um container "quente" atendendo vários visitantes).
// ==========================================================

import Configuracao from "../models/Configuracao.js";
import Destaque from "../models/Destaque.js";

const CACHE_TTL_MS = 60 * 1000;

let configuracaoCache = null;
let configuracaoCacheEm = 0;

let destaquesCache = null;
let destaquesCacheEm = 0;

export async function obterConfiguracao(){

    const agora = Date.now();

    if(configuracaoCache && (agora - configuracaoCacheEm) < CACHE_TTL_MS){

        return configuracaoCache;

    }

    let configuracao = await Configuracao.findOne();

    if(!configuracao){

        configuracao = await Configuracao.create({ empresa:"principal" });

    }

    configuracaoCache = configuracao;
    configuracaoCacheEm = agora;

    return configuracao;

}

// Chamado pelo configController assim que o master salva as
// configurações, pra próxima requisição já vir com o dado novo em
// vez de esperar o TTL expirar sozinho.
export function invalidarConfiguracao(){

    configuracaoCache = null;

}

export async function obterDestaquesAtivos(){

    const agora = Date.now();

    if(destaquesCache && (agora - destaquesCacheEm) < CACHE_TTL_MS){

        return destaquesCache;

    }

    const destaques = await Destaque.find({ ativo:true })
        .sort({ createdAt:-1 });

    destaquesCache = destaques;
    destaquesCacheEm = agora;

    return destaques;

}

// Chamado pelo destaqueController ao criar/editar/excluir um destaque.
export function invalidarDestaques(){

    destaquesCache = null;

}
