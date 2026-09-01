import mongoose from "mongoose";

// ==========================================================
// Cada evento do histórico de negociação da proposta.
// Guarda quem fez o quê e quando, mantendo o rastro completo:
// proposta enviada -> contraproposta do usuário ->
// contraproposta do STAFF -> ... -> aprovada/recusada/cancelada
// ==========================================================

const historicoSchema = new mongoose.Schema({

    tipo:{
        type:String,
        enum:[
            "proposta_inicial",
            "contraproposta_usuario",
            "contraproposta_staff",
            "proposta_final",
            "aprovacao",
            "recusa",
            "cancelamento"
        ],
        required:true
    },

    autor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },

    dadosAntes:{
        type:Object,
        default:{}
    },

    dadosDepois:{
        type:Object,
        default:{}
    },

    data:{
        type:Date,
        default:Date.now
    }

},{ _id:false });

const propostaSchema = new mongoose.Schema({

    // ==========================
    // Identificação da proposta
    // ==========================

    codigo:{
        type:String,
        required:true,
        unique:true
    },

    titulo:{
        type:String,
        required:true
    },

    areaAtuacao:{
        type:String,
        enum:[
            "marketing",
            "design",
            "moderacao",
            "coordenacao",
            "administracao",
            "suporte",
            "programacao",
            "outro"
        ],
        required:true
    },

    // ==========================
    // Envolvidos
    // ==========================

    staff:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },

    staffsEnvolvidos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    }],

    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },

    // ==========================
    // Contratante (pessoa física ou jurídica)
    // ==========================

    tipoPessoa:{
        type:String,
        enum:["fisica","juridica"],
        required:true
    },

    cpf:{
        type:String,
        default:""
    },

    cnpj:{
        type:String,
        default:""
    },

    nomeEmpresa:{
        type:String,
        default:""
    },

    nomePessoa:{
        type:String,
        default:""
    },

    // ==========================
    // Termos do contrato
    // ==========================

    valorContrato:{
        type:Number,
        required:true
    },

    prazo:{
        type:String,
        default:""
    },

    percentualMulta:{
        type:Number,
        default:0
    },

    percentualCorrecao:{
        type:Number,
        default:0
    },

    pagamentoInicial:{
        type:Number,
        default:0
    },

    objetivo:{
        type:String,
        default:""
    },

    detalhes:{
        type:String,
        default:""
    },

    // Lista dos nomes de campo que o cliente pode editar
    // (tudo que não estiver aqui só o STAFF edita)
    camposEditaveis:[{
        type:String
    }],

    // ==========================
    // Situação da proposta
    // ==========================

    status:{
        type:String,
        enum:["aberta","aprovada","recusada","cancelada"],
        default:"aberta"
    },

    aprovadoStaff:{
        type:Boolean,
        default:false
    },

    aprovadoUsuario:{
        type:Boolean,
        default:false
    },

    pdfGerado:{
        type:Boolean,
        default:false
    },

    historico:[historicoSchema]

},{
    timestamps:true
});

export default mongoose.model("Proposta", propostaSchema);
