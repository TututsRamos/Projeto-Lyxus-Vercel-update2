import mongoose from "mongoose";

// Código de acesso temporário que o administrador gera para
// vincular um usuário (cliente) criado por um STAFF.
// Tem duração de 1 a 24h, só pode ser usado uma única vez,
// pode ser revogado a qualquer momento, e expira sozinho
// (ver métodos estáticos abaixo, chamados pelas rotas/serviço
// responsáveis por validar o código no momento do login/acesso).

const codigoAcessoSchema = new mongoose.Schema({

    codigo:{
        type:String,
        required:true,
        unique:true
    },

    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },

    criadoPor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },

    duracaoHoras:{
        type:Number,
        required:true,
        min:1,
        max:24
    },

    expiraEm:{
        type:Date,
        required:true
    },

    status:{
        type:String,
        enum:["ativo","usado","revogado","expirado"],
        default:"ativo"
    },

    usadoEm:{
        type:Date,
        default:null
    },

    revogadoEm:{
        type:Date,
        default:null
    }

},{
    timestamps:true
});

// Marca como expirado se já passou do prazo e ainda estava "ativo".
// Chamado antes de qualquer validação de uso do código.
codigoAcessoSchema.methods.verificarExpiracao = async function(){

    if(this.status === "ativo" && this.expiraEm < new Date()){

        this.status = "expirado";
        await this.save();

    }

    return this.status;

};

export default mongoose.model("CodigoAcesso", codigoAcessoSchema);
