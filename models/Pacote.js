import mongoose from "mongoose";

const pacoteSchema = new mongoose.Schema({

    nome:{
        type:String,
        trim:true,
        maxlength:[60, "O título do pacote pode ter no máximo 60 caracteres."]
    },

    descricao:String,

   preco:{
    type:Number,
    required:true
},

  beneficios: [{
    type: String,
    trim: true
}],
    imagem:String,

    destaque:{
        type:Boolean,
        default:false
    },

    ativo:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

// Home, /pacotes e a tela de assinaturas sempre filtram por "ativo"
// e ordenam por "preco" — índice composto cobre os dois de uma vez.
pacoteSchema.index({ ativo:1, preco:1 });

export default mongoose.model("Pacote",pacoteSchema);