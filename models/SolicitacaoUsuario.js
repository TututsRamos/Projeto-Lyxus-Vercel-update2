import mongoose from "mongoose";

// Quando um STAFF precisa de um usuário novo (pra vincular a
// uma proposta, por exemplo), ele registra uma solicitação
// aqui. O admin aprova ou reprova pelo console dele — só o
// admin de fato cria o usuário e o código de acesso.

const solicitacaoUsuarioSchema = new mongoose.Schema({

    staffSolicitante:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },

    nomeUsuario:{
        type:String,
        required:true
    },

    emailUsuario:{
        type:String,
        required:true
    },

    tipoSolicitado:{
        type:String,
        enum:["staff","cliente"],
        default:"cliente"
    },

    // Dados extras que ajudam o admin a decidir/preencher o
    // cadastro (CPF, telefone, motivo do pedido, etc.)
    observacao:{
        type:String,
        default:""
    },

    status:{
        type:String,
        enum:["pendente","aprovada","reprovada"],
        default:"pendente"
    },

    // Preenchido pelo admin ao decidir
    respondidoPor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    },

    respostaAdmin:{
        type:String,
        default:""
    },

    // Se aprovada, guarda o usuário que acabou sendo criado
    usuarioCriado:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    }

},{
    timestamps:true
});

export default mongoose.model("SolicitacaoUsuario", solicitacaoUsuarioSchema);
