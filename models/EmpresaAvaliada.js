import mongoose from "mongoose";

// ==========================================================
// "Área de pesquisa e avaliação Lyxus" (apelido interno:
// Pique Michelan). Cada documento é uma empresa avaliada
// pela equipe LYXUS, com notas de 1 a 4 por critério da
// rubrica (ver utils/avaliacaoLyxus.js) — escala atualizada
// na v2, a partir do protótipo validado no Lovable (antes
// era 1 a 10, com nota geral por média direta).
//
// O site começa vazio — só o usuário MASTER cadastra novas
// empresas, em /dashboard/console/avaliacoes.
// ==========================================================

const empresaAvaliadaSchema = new mongoose.Schema({

    nome:{
        type:String,
        required:true
    },

    categoria:{
        type:String,
        required:true
        // uma das chaves de CATEGORIAS em utils/avaliacaoLyxus.js
    },

    localizacao:{
        type:String,
        default:""
    },

    googleRating:{
        type:Number,
        default:0
        // nota do Google (0 a 5, com decimal — ex: 4.7)
    },

    googleReviews:{
        type:Number,
        default:0
        // quantidade de avaliações no Google
    },

    descricao:{
        type:String,
        default:""
    },

    // Notas de 1 a 4 por critério, chaveadas pelo nome exato
    // do critério (ver RUBRICA em utils/avaliacaoLyxus.js).
    // Ex: { "Performance e velocidade": 3, "SEO on-page básico": 2, ... }
    notas:{
        type:Object,
        default:{}
    },

    // Badges do catálogo (AvaliacaoBadge) atribuídas manualmente
    // a esta empresa — mérito ou alerta.
    badges:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AvaliacaoBadge"
    }],

    // Selo de qualidade Lyxus concedido manualmente pelo master,
    // além do critério automático (nota geral ≥ 9).
    seloManual:{
        type:Boolean,
        default:false
    },

    // "Em alta" — chip especial e resplendor no card, marcado
    // manualmente pelo master.
    emAlta:{
        type:Boolean,
        default:false
    },

    // Marca a empresa como destaque do mês. Quando nenhuma
    // empresa está marcada, a aba "Destaques do mês" cai para o
    // top por nota geral automaticamente.
    destaqueManual:{
        type:Boolean,
        default:false
    },

    // Ordem manual de exibição (menor primeiro) nas listagens do
    // console — não afeta a ordenação por nota na área pública.
    ordem:{
        type:Number,
        default:999
    },

    // Marcador interno usado por scripts/migrarNotasAvaliacaoParaEscala4.js
    // pra não converter a mesma empresa duas vezes. Não é exibido
    // em lugar nenhum da interface.
    notasMigradasEscala4:{
        type:Boolean,
        default:false
    },

    // Permite ocultar da pesquisa pública sem excluir o
    // cadastro (ex: enquanto a avaliação ainda está em
    // andamento).
    ativo:{
        type:Boolean,
        default:true
    },

    criadoPor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    }

},{
    timestamps:true
});

export default mongoose.model("EmpresaAvaliada", empresaAvaliadaSchema);
