import Usuario from "../models/Usuario.js";
import hashSenha from "./hashSenha.js";

// Cria as contas padrão de equipe (staff, marketing e suporte)
// na primeira vez que o servidor sobe, caso elas ainda não
// existam. Todas nascem com senha temporária e devem trocá-la
// no primeiro acesso — a senha e as credenciais NUNCA ficam
// registradas em comentário ou log, só no banco (já com hash).
//
// Presets de permissão espelham o PRESET_POR_CARGO usado em
// controllers/usuarioController.js. Se um dos dois mudar, o
// outro precisa ser atualizado junto.
const CONTAS_PADRAO = [
    {
        cargo: "staff",
        email: "staff@lyxus.com.br",
        nome: "Staff",
        permissoes: ["posts", "categorias", "pacotes", "pagamentos"]
    },
    {
        cargo: "marketing",
        email: "marketing@lyxus.com.br",
        nome: "Marketing",
        permissoes: ["posts", "categorias"]
    },
    {
        cargo: "suporte",
        email: "suporte@lyxus.com.br",
        nome: "Suporte",
        permissoes: ["suporte"]
    }
];

const SENHA_TEMPORARIA = "LyXuS0826";

export async function criarContasPadraoEquipe(){

    for(const conta of CONTAS_PADRAO){

        try{

            const existente = await Usuario.findOne({ email: conta.email });

            if(existente){
                continue;
            }

            const senhaCriptografada = await hashSenha(SENHA_TEMPORARIA);

            await Usuario.create({
                nome: conta.nome,
                nomeCompleto: conta.nome,
                email: conta.email,
                senha: senhaCriptografada,
                tipo: "staff",
                cargo: conta.cargo,
                permissoes: conta.permissoes,
                nivelPermissao: 1,
                ativo: true
            });

            console.log(`✅ Conta padrão criada: ${conta.email} (senha temporária — troque no primeiro acesso)`);

        }catch(err){

            console.error(`Erro ao criar conta padrão ${conta.email}:`, err.message);

        }

    }

}
