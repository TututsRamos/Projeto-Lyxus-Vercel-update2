import mongoose from "mongoose";

const pagamentoSchema = new mongoose.Schema({

    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },

    pacote:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pacote"
    },

    valor:Number,

    metodo:String,

    status:{
        type:String,
        enum:[
            "pendente",
            "aprovado",
            "cancelado"
        ],
        default:"pendente"
    },

    transactionId:String

},{
    timestamps:true
});

export default mongoose.model("Pagamento",pagamentoSchema);