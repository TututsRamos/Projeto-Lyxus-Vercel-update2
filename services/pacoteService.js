    import Pacote from "../models/Pacote.js";

const pacoteService = {

    async listarAtivos(){

        return Pacote.find({ ativo:true }).sort({ preco:1 });

    },

    async listarTodos(){

        return Pacote.find().sort({ preco:1 });

    },

    async buscarPorId(id){

        return Pacote.findById(id);

    },

    async criar(dados){

        return Pacote.create(dados);

    },

    async atualizar(id, dados){

        return Pacote.findByIdAndUpdate(id, dados, { new:true });

    },

    async excluir(id){

        return Pacote.findByIdAndDelete(id);

    }

};

export default pacoteService;
