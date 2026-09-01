import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

const usuarioService = {

    async listarTodos(){

        return Usuario.find().sort({ createdAt:-1 });

    },

    async buscarPorId(id){

        return Usuario.findById(id);

    },

    async buscarPorEmail(email){

        return Usuario.findOne({ email });

    },

    async criar(dados){

        if(dados.senha){

            dados.senha = await bcrypt.hash(dados.senha, 10);

        }

        return Usuario.create(dados);

    },

    async atualizar(id, dados){

        if(dados.senha){

            dados.senha = await bcrypt.hash(dados.senha, 10);

        }else{

            delete dados.senha;

        }

        return Usuario.findByIdAndUpdate(id, dados, { new:true });

    },

    async excluir(id){

        return Usuario.findByIdAndDelete(id);

    }

};

export default usuarioService;
