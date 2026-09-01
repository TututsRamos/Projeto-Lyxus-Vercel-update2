import mongoose from "mongoose";

// ==========================================================
// "Seção de registro de serviços e logs de modificação".
// Cada documento é um contrato/projeto arquivado da LYXUS,
// com um histórico de logs de modificação escritos
// manualmente pela equipe.
//
// Visível apenas no dashboard interno (admin sempre, staff
// só com a permissão "contratos" — ver config/auth.js e
// controllers/usuarioController.js).
//
// Numeração dos logs (ver utils/numerarLogs.js): contam
// 1, 2, 3... na ordem em que foram criados. O botão "X"
// (exclusivo de admin/master) exclui o log de verdade — os
// restantes fecham a numeração automaticamente.
// ==========================================================

const logContratoSchema = new mongoose.Schema({

    texto:{
        type:String,
        required:true
        // conteúdo escrito manualmente pela equipe, pode ter
        // várias linhas (ex: "Modificação da home\nCorreção de links")
    },

    autor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    }

},{
    timestamps:true
});

const contratoSchema = new mongoose.Schema({

    // Nome do serviço/projeto (ex: "Website Institucional")
    tituloServico:{
        type:String,
        default:""
    },

    // Nome fantasia da empresa cliente (ex: "Imobiliária Caju")
    nomeEmpresa:{
        type:String,
        required:true
    },

    cnpj:{
        type:String,
        default:""
    },

    // Gerado automaticamente pelo site na criação (ex: LYX-2026-0001)
    codigo:{
        type:String,
        required:true,
        unique:true
    },

    // Data de início do contrato
    dataContrato:{
        type:Date,
        required:true
    },

    equipeResponsavel:{
        type:String,
        default:"LYXUS"
    },

    gerenteProjeto:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["em_andamento","concluido","arquivado"],
        default:"em_andamento"
    },

    // Contrato e Sumário — visão que o CLIENTE vê (público,
    // acessado pelo código do contrato em /contrato/:codigo).
    // Cada parágrafo pode referenciar um artigo (ex: "Art. 30");
    // o glossário explica cada artigo citado. Ainda sem dados
    // reais — telas prontas pra receber o conteúdo real depois.
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

    logs:[logContratoSchema],

    criadoPor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    }

},{
    timestamps:true
});

export default mongoose.model("Contrato", contratoSchema);
