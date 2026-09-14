import mongoose from "mongoose";

// ==========================================================
// Evidências (provas) que sustentam a nota de uma empresa na
// "Área de pesquisa e avaliação Lyxus" — um print, um link ou
// uma nota de observação, anexados a uma categoria ou a um
// critério específico da rubrica.
//
// Feature nova da v2 (baseada no EvidenceManager do protótipo
// Lovable): cada nota de 1 a 4 deve poder ser justificada com
// uma prova documentada. Só o master (ou staff com a permissão
// "avaliacoes") acessa este material — não aparece na área
// pública.
//
// O arquivo, quando enviado, é guardado como Data URI base64
// (mesmo padrão de utils/imagemBase64.js) porque a Vercel roda
// o projeto como função serverless com sistema de arquivos
// somente leitura — não dá pra gravar em disco.
// ==========================================================

const avaliacaoEvidenciaSchema = new mongoose.Schema({

    empresa:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"EmpresaAvaliada",
        required:true
    },

    // "categoria" quando a prova cobre a área inteira da rubrica;
    // "criterio" quando é específica de um item dentro dela.
    escopo:{
        type:String,
        enum:["categoria","criterio"],
        required:true
    },

    // Nome exato da categoria ou do critério (ver RUBRICA em
    // utils/avaliacaoLyxus.js).
    chave:{
        type:String,
        required:true
    },

    arquivo:{
        type:String,
        default:null
        // Data URI base64 da imagem/PDF enviado, se houver.
    },

    url:{
        type:String,
        default:""
    },

    ferramenta:{
        type:String,
        default:""
        // Ex: "PageSpeed Insights", "Google Business Profile"...
    },

    capturadoEm:{
        type:Date,
        default:Date.now
    },

    observacao:{
        type:String,
        default:""
    },

    criadoPor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    }

},{
    timestamps:true
});

avaliacaoEvidenciaSchema.index({ empresa:1, escopo:1, chave:1 });

export default mongoose.model("AvaliacaoEvidencia", avaliacaoEvidenciaSchema);
