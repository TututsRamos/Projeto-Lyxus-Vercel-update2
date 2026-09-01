import Banner from "../models/Banner.js";

const bannerService = {

    async listarAtivos(){

        return Banner.find({ ativo:true }).sort({ ordem:1 });

    },

    async listarTodos(){

        return Banner.find().sort({ ordem:1 });

    },

    async buscarPorId(id){

        return Banner.findById(id);

    },

    async criar(dados){

        return Banner.create(dados);

    },

    async atualizar(id, dados){

        return Banner.findByIdAndUpdate(id, dados, { new:true });

    },

    async excluir(id){

        return Banner.findByIdAndDelete(id);

    }

};

export default bannerService;
