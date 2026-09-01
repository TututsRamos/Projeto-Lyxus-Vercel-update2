import mongoose from "mongoose";

// Registro geral de ações importantes do sistema, exibido no
// console "Logs Gerais" do admin.

const logSchema = new mongoose.Schema({

    tipo:{
        type:String,
        required:true
        // ex: "usuario_criado", "usuario_editado", "usuario_excluido",
        // "solicitacao_aprovada", "solicitacao_reprovada",
        // "codigo_gerado", "codigo_revogado", "codigo_expirado",
        // "proposta_aprovada", "proposta_recusada", "proposta_cancelada"
    },

    autor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    },

    descricao:{
        type:String,
        required:true
    },

    dados:{
        type:Object,
        default:{}
    }

},{
    timestamps:true
});

export default mongoose.model("Log", logSchema);
