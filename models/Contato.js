import mongoose from "mongoose";

// Captação genérica de interesse, usada pelos formulários das
// páginas institucionais: Torne-se Apoiador, Parceiros,
// Trabalhe Conosco e Suporte.

const contatoSchema = new mongoose.Schema({

    tipo:{
        type:String,
        enum:["apoiador","parceiro","trabalhe-conosco","suporte","comunidade"],
        required:true
    },

    nome:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    telefone:{
        type:String,
        default:""
    },

    mensagem:{
        type:String,
        default:""
    },

    // Campos extras específicos de cada tipo (ex: área de
    // interesse em "trabalhe conosco", nome da empresa em
    // "parceiro" etc.) guardados de forma flexível.
    detalhes:{
        type:Object,
        default:{}
    },

    status:{
        type:String,
        enum:["novo","em-andamento","concluido"],
        default:"novo"
    }

},{
    timestamps:true
});

export default mongoose.model("Contato", contatoSchema);
