import mongoose from "mongoose";

// ==========================================================
// "Aba de propostas à comunidade": iniciativas/propostas
// abertas da LYXUS para a comunidade em geral — diferente da
// Proposta (models/Proposta.js), que é individual e vinculada
// a um cliente específico já cadastrado.
//
// Cadastro exclusivo do master, em /dashboard/console/comunidade.
// Visível publicamente em /comunidade.
// ==========================================================

// Uma opção dentro de uma proposta do tipo "votação".
const opcaoVotacaoSchema = new mongoose.Schema({

    texto:{
        type:String,
        required:true
    },

    votos:{
        type:Number,
        default:0
    }

},{ _id:true });

const propostaComunidadeSchema = new mongoose.Schema({

    titulo:{
        type:String,
        required:true
    },

    // "participacao" -> mostra o formulário de interesse (nome/e-mail/
    // telefone/mensagem), fixo no topo do post.
    // "votacao" -> mostra as opções abaixo pra comunidade votar.
    tipo:{
        type:String,
        enum:["participacao","votacao"],
        default:"participacao"
    },

    categoria:{
        type:String,
        default:""
        // ex: "Parceria", "Projeto social", "Condição especial"
    },

    resumo:{
        type:String,
        default:""
        // linha curta pro card da listagem
    },

    descricao:{
        type:String,
        required:true
        // texto completo, exibido na página de detalhe
    },

    imagem:{
        type:String,
        default:""
        // Data URI base64 (ver utils/imagemBase64.js), imagem de capa do post
    },

    // Data real (não mais texto livre) até quando a proposta fica
    // disponível — corrige o bug de aceitar datas inválidas como
    // "34/42/1945" no campo antigo de texto livre.
    dataLimite:{
        type:Date,
        default:null
    },

    textoBotao:{
        type:String,
        default:"Quero participar"
    },

    // Só usado quando tipo === "votacao".
    opcoes:[opcaoVotacaoSchema],

    // Preenchido pelo master quando uma votação é encerrada — vira o
    // "post sobre o vitorioso", exibido na seção de resultados logo
    // abaixo das votações ativas em /comunidade.
    resultado:{

        titulo:{
            type:String,
            default:""
        },

        texto:{
            type:String,
            default:""
        },

        imagem:{
            type:String,
            default:""
        }

    },

    status:{
        type:String,
        enum:["aberta","encerrada"],
        default:"aberta"
    },

    ativo:{
        type:Boolean,
        default:true
        // permite ocultar da listagem pública sem excluir
    },

    criadoPor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    }

},{
    timestamps:true
});

export default mongoose.model("PropostaComunidade", propostaComunidadeSchema);
