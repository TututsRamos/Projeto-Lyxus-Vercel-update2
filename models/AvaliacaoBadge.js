import mongoose from "mongoose";

// ==========================================================
// Catálogo de badges da "Área de pesquisa e avaliação Lyxus".
//
// Antes da v2, as badges eram calculadas automaticamente por
// regras fixas de nota (ver histórico de utils/avaliacaoLyxus.js).
// Agora elas são cadastradas aqui pelo master e atribuídas
// manualmente, uma a uma, a cada empresa avaliada — igual ao
// protótipo validado no Lovable.
// ==========================================================

const avaliacaoBadgeSchema = new mongoose.Schema({

    rotulo:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    descricao:{
        type:String,
        default:""
    },

    tipo:{
        type:String,
        enum:["merito","alerta"],
        default:"merito"
    },

    ordem:{
        type:Number,
        default:0
    }

},{
    timestamps:true
});

export default mongoose.model("AvaliacaoBadge", avaliacaoBadgeSchema);
