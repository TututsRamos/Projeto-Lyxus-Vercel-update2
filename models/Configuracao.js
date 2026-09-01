import mongoose from "mongoose";

const configuracaoSchema = new mongoose.Schema({

    nomeEmpresa:String,

    descricao:String,

    logo:String,

    banner:String,

    telefone:String,

    whatsapp:String,

    email:String,

    instagram:String,

    facebook:String,

    linkedin:String,

    playStore:String,

    appStore:String,

    versaoApp:String,

    empresa:{
    type:String,
    default:"principal"
},
    corPrimaria:{
        type:String,
        default:"#1D173F"
    },

    corSecundaria:{
        type:String,
        default:"#A678FF"
    },

    // Dados usados para gerar a cobrança Pix real no checkout.
    // A chave pode ser qualquer chave Pix válida (CPF/CNPJ, e-mail,
    // telefone ou aleatória) cadastrada em qualquer banco, inclusive
    // uma conta pessoal — é só trocar aqui quando tiver a conta
    // definitiva da empresa.
    pixChave:String,

    pixNomeRecebedor:String,

    pixCidade:String,

    // Link do dashboard de atendimento do tawk.to (o link que
    // abre a caixa de conversas pra responder o chat). Usado
    // na página /dashboard/suporte, que é a única área que o
    // usuário de suporte enxerga.
    tawkDashboardUrl:{
        type:String,
        default:"https://dashboard.tawk.to/"
    },

    // Property ID e Widget ID do widget de chat (tawk.to) que aparece
    // pro visitante em todas as páginas do site (ver views/partials/footer.ejs).
    // Não confundir com tawkDashboardUrl, que é só o link pra tela de
    // atendimento que o suporte usa pra responder.
    tawkPropertyId:{
        type:String,
        default:"6a8e3d6eb37bbb3447aea39e"
    },

    tawkWidgetId:{
        type:String,
        default:"1k0tpvubj"
    }
    },{
    timestamps:true
});


export default mongoose.model("Configuracao",configuracaoSchema);