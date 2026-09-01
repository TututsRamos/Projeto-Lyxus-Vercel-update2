import mongoose from "mongoose";

// "Destaque da semana" — cards que aparecem no lugar do texto
// de marketing genérico nas telas de login e cadastro. Pode
// ser um post do blog em destaque ou uma assinatura/pacote em
// promoção. Podem existir vários ao mesmo tempo, cada um
// mirando o login, o cadastro ou os dois — editados pelo
// marketing ou pelo master/admin em /dashboard/destaque.

const destaqueSchema = new mongoose.Schema({

    ativo:{
        type:Boolean,
        default:false
    },

    // Em qual(is) tela(s) o card aparece — ver o filtro em
    // middleware/locals.js (destaquesLogin / destaquesCadastro).
    exibirEm:{
        type:String,
        enum:["login","cadastro","ambos"],
        default:"ambos"
    },

    tipo:{
        type:String,
        enum:["post","assinatura","outro"],
        default:"post"
    },

    titulo:{
        type:String,
        default:""
    },

    descricao:{
        type:String,
        default:""
    },

    imagem:{
        type:String,
        default:""
    },

    // Link pro qual o botão do card aponta — pode ser a URL
    // de um post do blog (/blog/slug-do-post) ou da página de
    // assinaturas/pacotes, por exemplo.
    link:{
        type:String,
        default:""
    },

    textoBotao:{
        type:String,
        default:"Ver mais"
    },

    atualizadoPor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    }

},{
    timestamps:true
});

export default mongoose.model("Destaque", destaqueSchema);