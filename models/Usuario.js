import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({

    // ==========================
    // Identificação básica
    // ==========================

    nome:{
        type:String,
        required:true
    },

    nomeCompleto:{
        type:String,
        default:""
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    senha:{
        type:String,
        required:true
    },

    foto:{
        type:String,
        default:""
    },

    // ==========================
    // Papel do usuário no sistema
    // master     -> usuário mestre, único, cria administradores
    // admin      -> acessa o console de administrador
    // staff      -> cria/gerencia propostas para clientes
    // cliente    -> acessa apenas suas propostas liberadas
    // visitante  -> acabou de se cadastrar e ainda aguarda
    //               aprovação do usuário mestre; acesso bem
    //               limitado até virar "cliente"
    // ==========================

    tipo:{
        type:String,
        enum:["master","admin","staff","cliente","visitante"],
        default:"cliente"
    },

    // ==========================
    // Dados pessoais
    // (preenchidos principalmente por master/admin/staff;
    // opcionais para cliente, que geralmente entra via
    // código de vinculação enviado pelo STAFF)
    // ==========================

    cpf:{
        type:String,
        default:""
    },

    numeroContato:{
        type:String,
        default:""
    },

    dataNascimento:{
        type:Date,
        default:null
    },

    // ==========================
    // Específico de STAFF / ADMIN
    // ==========================

    areaAtuacao:{
        type:String,
        enum:[
            "marketing",
            "design",
            "moderacao",
            "coordenacao",
            "administracao",
            "suporte",
            "programacao",
            "outro"
        ],
        default:undefined
    },

    nivelPermissao:{
        type:Number,
        default:1
    },

    idStaff:{
        type:String,
        default:""
    },

    // ==========================
    // Sub-papel de STAFF
    // Usado só quando tipo === "staff", pra saber qual
    // "perfil de acesso" o membro da equipe tem dentro do
    // dashboard administrativo:
    //
    //   staff     -> acesso amplo ao dashboard (posts,
    //                categorias, pacotes, pagamentos), mas
    //                nunca a usuários/configurações/console,
    //                que são exclusivos do master
    //   suporte   -> acesso único à página de Suporte
    //                (respostas do tawk.to)
    //   marketing -> acesso único ao Blog (posts/categorias)
    // ==========================

    cargo:{
        type:String,
        enum:["staff","suporte","marketing"],
        default:"staff"
    },

    // Lista de permissões efetivas do usuário dentro do
    // dashboard. master/admin ignoram essa lista (têm acesso
    // total sempre). Para "staff", é o que realmente controla
    // o que ele vê/edita — o campo "cargo" acima é só o
    // rótulo/preset usado no formulário de cadastro.
    //
    // Chaves possíveis: "posts", "categorias", "pacotes",
    // "pagamentos", "suporte"
    permissoes:{
        type:[String],
        default:[]
    },

    // ==========================
    // Específico de CLIENTE
    // (vínculo criado por um STAFF através de um
    // código de acesso — ver model CodigoAcesso)
    // ==========================

    staffCriador:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usuario",
        default:null
    },

    codigoVinculacao:{
        type:String,
        default:""
    },

    codigoValidoAte:{
        type:Date,
        default:null
    },

    // ==========================
    // Status geral
    // ==========================

    ativo:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

export default mongoose.model("Usuario", usuarioSchema);
