import mongoose from "mongoose";

// ==========================================================
// Contrato institucional — o contrato "cru" (sem empresa/cliente
// específico) que a LYXUS mostra publicamente no site, com as
// especificações e artigos explicados no sumário.
//
// Documento único (singleton): sempre existe no máximo 1 registro
// nesta coleção. Totalmente independente do model Contrato (que
// arquiva contratos FECHADOS com empresas específicas + logs de
// modificação) — os dois não têm nenhuma relação entre si.
// ==========================================================

const contratoModeloSchema = new mongoose.Schema({

    paragrafos:[{

        texto:{
            type:String,
            default:""
        },

        artigo:{
            type:String,
            default:""
        }

    }],

    glossario:[{

        artigo:{
            type:String,
            default:""
        },

        descricao:{
            type:String,
            default:""
        }

    }],

    atualizadoPor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    }

},{
    timestamps:true
});

export default mongoose.model("ContratoModelo", contratoModeloSchema);
