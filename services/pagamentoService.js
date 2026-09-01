import Pagamento from "../models/Pagamento.js";

const pagamentoService = {

    async listarTodos(){

        return Pagamento.find()
            .populate("usuario")
            .populate("pacote")
            .sort({ createdAt:-1 });

    },

    async listarPorUsuario(usuarioId){

        return Pagamento.find({ usuario:usuarioId })
            .populate("pacote")
            .sort({ createdAt:-1 });

    },

    async buscarPorId(id){

        return Pagamento.findById(id)
            .populate("usuario")
            .populate("pacote");

    },

    async criar(dados){

        return Pagamento.create(dados);

    },

    async atualizarStatus(id, status){

        return Pagamento.findByIdAndUpdate(id, { status }, { new:true });

    }

};

export default pagamentoService;
