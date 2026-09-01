// ==========================================================
// Rubrica de avaliação da "Área de pesquisa e avaliação Lyxus"
// (Pique Michelan). Baseado no protótipo validado no Lovable
// (avaliandolyx-main) — mesma estrutura de categorias e
// critérios, agora operando sobre notas reais cadastradas
// pelo master em vez de dados de exemplo.
// ==========================================================

export const CATEGORIAS = [
    "Mecânica",
    "Hospital",
    "Lojas de roupas",
    "Lojas de calçados",
    "Restaurantes",
    "Lancherias",
    "Empórios",
    "Sorveterias",
    "Governamental",
    "Eletrônicos",
    "Lojas de móveis",
    "Bares e Pubs",
    "Doces e Salgados",
    "Confeitarias",
    "Farmácias",
    "Floriculturas",
    "Barbearia",
    "Serviços empresariais",
    "Beleza e cuidados"
];

export const RUBRICA = [
    {
        categoria:"Website e experiência",
        criterios:[
            "Performance e velocidade",
            "Responsividade mobile",
            "Clareza de proposta e navegação",
            "Conversão e CTAs",
            "Segurança e conformidade básica",
            "Acessibilidade e usabilidade"
        ]
    },
    {
        categoria:"Busca local e descoberta",
        criterios:[
            "Google Business Profile completo",
            "SEO on-page básico",
            "Presença local e mapas/diretórios",
            "Consistência NAP (nome, endereço, telefone)",
            "Indexação e rastreabilidade"
        ]
    },
    {
        categoria:"Conteúdo e autoridade",
        criterios:[
            "Qualidade das páginas principais",
            "Provas de autoridade",
            "Atualização e consistência de conteúdo",
            "Cobertura de dúvidas do cliente",
            "Identidade verbal e clareza da mensagem"
        ]
    },
    {
        categoria:"Redes e consistência de marca",
        criterios:[
            "Perfis ativos e completos",
            "Consistência visual e verbal",
            "Frequência mínima de atualização",
            "Integração com site e canais",
            "Qualidade percebida do conteúdo"
        ]
    },
    {
        categoria:"Reputação e relacionamento digital",
        criterios:[
            "Volume e média de avaliações públicas",
            "Recência e consistência das avaliações",
            "Taxa de resposta a avaliações/comentários",
            "Clareza dos canais de contato",
            "Sinais de confiança e transparência"
        ]
    }
];

// Lista plana de todos os critérios, na ordem — usada pra
// montar o formulário de cadastro/edição no console do master.
export function todosCriterios(){

    return RUBRICA.flatMap(grupo => grupo.criterios);

}

function limitar1a10(valor){

    return Math.max(1, Math.min(10, Math.round(valor || 0)));

}

// Nota (1 a 10) de um grupo da rubrica: média das notas dos
// critérios daquele grupo.
export function notaGrupo(empresa, nomeGrupo){

    const grupo = RUBRICA.find(g => g.categoria === nomeGrupo);

    if(!grupo) return 0;

    const notas = empresa.notas || {};

    const soma = grupo.criterios.reduce((acc, c) => acc + (Number(notas[c]) || 0), 0);

    return limitar1a10(soma / grupo.criterios.length);

}

// Nota geral (1 a 10): média das notas de cada grupo.
export function notaGeral(empresa){

    const valores = RUBRICA.map(g => notaGrupo(empresa, g.categoria));

    return limitar1a10(valores.reduce((a, b) => a + b, 0) / valores.length);

}

export function temSeloQualidade(empresa){

    return notaGeral(empresa) >= 9;

}

// Os N maiores destaques (por nota geral) dentre uma lista de
// empresas — usado na aba "Destaques do mês".
export function destaques(empresas, quantidade = 3){

    return [...empresas]
        .sort((a, b) => notaGeral(b) - notaGeral(a))
        .slice(0, quantidade);

}

// ---------------- Badges (mérito / alerta) ----------------

const REGRAS_MERITO = [
    { rotulo:"Mobile Ready", descricao:"Site funciona muito bem no celular.", criterio:"Responsividade mobile", min:8 },
    { rotulo:"Fast Site", descricao:"Performance forte.", criterio:"Performance e velocidade", min:8 },
    { rotulo:"Google Business Completo", descricao:"Perfil local bem estruturado.", criterio:"Google Business Profile completo", min:8 },
    { rotulo:"Marca Consistente", descricao:"Identidade forte entre canais.", criterio:"Consistência visual e verbal", min:8 },
    { rotulo:"Atendimento Responsivo", descricao:"Canais digitais respondem rápido.", criterio:"Taxa de resposta a avaliações/comentários", min:8 },
    { rotulo:"Conteúdo Ativo", descricao:"Mantém conteúdo recente e útil.", criterio:"Atualização e consistência de conteúdo", min:8 },
    { rotulo:"Confiança Digital", descricao:"Sinais de reputação e transparência fortes.", criterio:"Sinais de confiança e transparência", min:8 },
    { rotulo:"Conversão Clara", descricao:"Fluxo de contato/orçamento bem construído.", criterio:"Conversão e CTAs", min:8 }
];

const REGRAS_ALERTA = [
    { rotulo:"Segurança Comprometida", descricao:"Segurança básica do site comprometida.", criterio:"Segurança e conformidade básica", max:4 },
    { rotulo:"Presença Incompleta", descricao:"Perfis e canais com lacunas.", criterio:"Perfis ativos e completos", max:5 },
    { rotulo:"Google Business Fraco", descricao:"Perfil local pouco estruturado.", criterio:"Google Business Profile completo", max:5 },
    { rotulo:"Conteúdo Desatualizado", descricao:"Conteúdo sem atualização recente.", criterio:"Atualização e consistência de conteúdo", max:5 },
    { rotulo:"Baixa Conversão", descricao:"Fluxo de contato pouco claro.", criterio:"Conversão e CTAs", max:5 },
    { rotulo:"Mobile Comprometido", descricao:"Experiência ruim no celular.", criterio:"Responsividade mobile", max:5 },
    { rotulo:"Marca Inconsistente", descricao:"Identidade varia entre canais.", criterio:"Consistência visual e verbal", max:5 }
];

export function badges(empresa){

    const notas = empresa.notas || {};

    const merito = REGRAS_MERITO
        .filter(r => (Number(notas[r.criterio]) || 0) >= r.min)
        .map(r => ({ rotulo:r.rotulo, descricao:r.descricao }));

    const alerta = REGRAS_ALERTA
        .filter(r => (Number(notas[r.criterio]) || 0) <= r.max && (Number(notas[r.criterio]) || 0) > 0)
        .map(r => ({ rotulo:r.rotulo, descricao:r.descricao }));

    if(notaGeral(empresa) >= 8){
        merito.push({ rotulo:"Presença Estruturada", descricao:"Boa coerência geral." });
    }

    return { merito, alerta };

}
