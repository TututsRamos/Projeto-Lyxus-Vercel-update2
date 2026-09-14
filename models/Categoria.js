import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    descricao: {
        type: String,
        default: ""
    },

    cor: {
        type: String,
        default: "#A678FF"
    },

    icone: {
        type: String,
        default: ""
    },

    // Imagem enviada pelo usuário (Data URI base64, mesmo padrão de
    // Post/Pacote — ver utils/imagemBase64.js). Quando preenchida,
    // tem prioridade sobre "icone" na exibição da categoria.
    imagem: {
        type: String,
        default: ""
    },

    ativo: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

// O blog e o menu de categorias sempre filtram por "ativo".
categoriaSchema.index({ ativo:1 });

export default mongoose.model("Categoria", categoriaSchema);