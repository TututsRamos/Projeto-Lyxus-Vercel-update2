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

export default mongoose.model("Pacote",pacoteSchema);