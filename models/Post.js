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

// Índices pras consultas mais comuns do site (home, /blog e
// /blog/categoria/:slug): todas filtram por "publicado" e ordenam
// por "createdAt" — e a de categoria ainda filtra por "categoria"
// junto. Sem índice o MongoDB teria que varrer a coleção inteira
// de posts a cada visita; com a coleção crescendo isso fica cada
// vez mais lento, o índice mantém a busca rápida independente do
// tamanho da coleção.
postSchema.index({ publicado:1, createdAt:-1 });
postSchema.index({ categoria:1, publicado:1 });

export default mongoose.model("Post",postSchema);