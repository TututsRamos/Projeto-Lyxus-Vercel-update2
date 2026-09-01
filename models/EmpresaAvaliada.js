import mongoose from "mongoose";

// ==========================================================
// "Área de pesquisa e avaliação Lyxus" (apelido interno:
// Pique Michelan). Cada documento é uma empresa avaliada
// pela equipe LYXUS, com notas de 1 a 10 por critério da
// rubrica (ver utils/avaliacaoLyxus.js).
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

    // Notas de 1 a 10 por critério, chaveadas pelo nome exato
    // do critério (ver RUBRICA em utils/avaliacaoLyxus.js).
    // Ex: { "Performance e velocidade": 8, "SEO on-page básico": 6, ... }
    notas:{
        type:Object,
        default:{}
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
