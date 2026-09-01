import Post from "../models/Post.js";

const postService = {

    async listarPublicados(){

        return Post.find({ publicado:true })
            .populate("categoria")
            .populate("autor")
            .sort({ createdAt:-1 });

    },

    async listarTodos(){

        return Post.find()
            .populate("categoria")
            .populate("autor")
            .sort({ createdAt:-1 });

    },

    async buscarPorSlug(slug){

        return Post.findOne({ slug, publicado:true })
            .populate("categoria")
            .populate("autor");

    },

    async buscarPorId(id){

        return Post.findById(id);

    },

    async criar(dados){

        return Post.create(dados);

    },

    async atualizar(id, dados){

        return Post.findByIdAndUpdate(id, dados, { new:true });

    },

    async excluir(id){

        return Post.findByIdAndDelete(id);

    }

};

export default postService;
