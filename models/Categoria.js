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

    ativo: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

export default mongoose.model("Categoria", categoriaSchema);