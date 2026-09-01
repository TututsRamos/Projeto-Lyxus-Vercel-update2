import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    titulo:String,

    slug:{
        type:String,
        unique:true
    },

    resumo:String,

    conteudo:String,

    imagem:{
    type:String,
    default:"padrao.png"
},

   categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true
},

    autor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },

    visualizacoes:{
        type:Number,
        default:0
    },

    publicado:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

export default mongoose.model("Post",postSchema);