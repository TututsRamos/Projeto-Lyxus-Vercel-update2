// ==========================================================
// Rubrica de avaliação da "Área de pesquisa e avaliação Lyxus"
// (Pique Michelan).
//
// Versão 2 — atualizada a partir do protótipo do Lovable
// (avaliandolyx-main). Mudanças em relação à v1:
//
//   • Cada critério agora é avaliado numa escala de 1 a 4
//     (antes era 1 a 10), sempre com evidência documentada
//     (ver models/AvaliacaoEvidencia.js).
//   • A nota de cada categoria é a média (contínua) dos seus
//     critérios; a nota geral é a média das categorias — e só
//     no final é convertida pra escala 1 a 10 (1→1, 4→10),
//     arredondada pela regra "0,5 sempre pra cima".
//   • O selo de qualidade Lyxus, "em alta" e "destaque do mês"
//     passam a poder ser marcados manualmente pelo master,
//     além do critério automático por nota.
//   • Badges deixaram de ser calculadas por regras fixas — agora
//     são um catálogo cadastrado no console (ver
//     models/AvaliacaoBadge.js) e atribuídas manualmente, uma a
//     uma, a cada empresa.
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

// Arredondamento padrão do Score Lyxus: 0,00–0,49 pra baixo;
// 0,50–0,99 pra cima (igual ao "roundHalfUp" do protótipo).
export function arredondarMeioParaCima(valor){

    return Math.floor((valor || 0) + 0.5);

}

// Nota de um critério, sempre na escala 1 a 4. Critério ainda
// não avaliado (ou valor inválido) conta como 1 — a pior nota —
// até que o master registre a avaliação com evidência.
export function notaCriterio(empresa, criterio){

    const bruta = Number((empresa.notas || {})[criterio]);

    if(!Number.isFinite(bruta)) return 1;

    return Math.max(1, Math.min(4, bruta));

}

// Média contínua (1 a 4, sem arredondar) dos critérios de uma
// categoria — usada internamente pra compor a nota geral.
export function notaCategoriaBruta(empresa, nomeCategoria){

    const grupo = RUBRICA.find(g => g.categoria === nomeCategoria);

    if(!grupo || !grupo.criterios.length) return 1;

    const soma = grupo.criterios.reduce((acc, c) => acc + notaCriterio(empresa, c), 0);

    return soma / grupo.criterios.length;

}

// Nota da categoria arredondada, na escala 1 a 4 — é essa que
// aparece na tela de detalhe, por área.
export function notaCategoria(empresa, nomeCategoria){

    return Math.max(1, Math.min(4, arredondarMeioParaCima(notaCategoriaBruta(empresa, nomeCategoria))));

}

// Nota geral em escala 1 a 4 (média das categorias, arredondada).
export function notaGeral4(empresa){

    const bruta = RUBRICA.reduce((acc, g) => acc + notaCategoriaBruta(empresa, g.categoria), 0) / RUBRICA.length;

    return Math.max(1, Math.min(4, arredondarMeioParaCima(bruta)));

}

// Conversão linear da escala 1-4 pra escala 1-10 (1→1, 4→10).
export function paraEscala10(valor4){

    return 1 + (valor4 - 1) * 3;

}

// Nota geral do Score Lyxus, na escala 1 a 10 (a que aparece em
// destaque nos cards e no cabeçalho da ficha da empresa).
export function notaGeral(empresa){

    return Math.max(1, Math.min(10, arredondarMeioParaCima(paraEscala10(notaGeral4(empresa)))));

}

// Selo de qualidade Lyxus: concedido manualmente pelo master ou
// automaticamente quando a nota geral atinge 9 ou mais.
export function temSeloQualidade(empresa){

    return Boolean(empresa.seloManual) || notaGeral(empresa) >= 9;

}

// Os N maiores destaques do mês. Se o master marcou empresas como
// "destaque" manualmente (campo destaqueManual), usa só essas;
// caso contrário cai no top por nota geral — igual ao protótipo.
export function destaques(empresas, quantidade = 3){

    const marcados = empresas.filter(e => e.destaqueManual);

    const base = marcados.length > 0 ? marcados : empresas;

    return [...base]
        .sort((a, b) => notaGeral(b) - notaGeral(a))
        .slice(0, quantidade);

}

// ---------------- Badges (catálogo + atribuição manual) ----------------
//
// As badges deixaram de ser calculadas por regras fixas de nota.
// Agora existe um catálogo cadastrado no console (AvaliacaoBadge)
// e cada empresa guarda só os ids das badges que recebeu
// (empresa.badges). Esta função cruza as duas coisas.
//
// catalogoBadges: lista de documentos AvaliacaoBadge (lean),
// cada um com _id, rotulo, descricao, tipo ("merito" | "alerta").
export function badgesDaEmpresa(empresa, catalogoBadges){

    const idsAtribuidos = new Set((empresa.badges || []).map(id => String(id)));

    const atribuidas = (catalogoBadges || []).filter(b => idsAtribuidos.has(String(b._id)));

    return {
        merito: atribuidas.filter(b => b.tipo !== "alerta"),
        alerta: atribuidas.filter(b => b.tipo === "alerta")
    };

}
