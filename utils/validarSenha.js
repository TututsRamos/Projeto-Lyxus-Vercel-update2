// Regra de senha forte usada em todo o sistema (cadastro de
// cliente, criação/edição de usuários no dashboard, etc).
//
// Requisitos:
//   - mínimo de 6 caracteres
//   - pelo menos 1 letra maiúscula
//   - pelo menos 1 caractere especial
//
// Mantido num único lugar pra login/cadastro e o dashboard de
// usuários nunca ficarem com regras diferentes por engano.

const REGEX_MAIUSCULA = /[A-ZÀ-Ý]/;
const REGEX_ESPECIAL = /[^A-Za-z0-9À-ÿ]/;

export default function validarSenha(senha){

    if(typeof senha !== "string" || senha.length < 6){

        return {
            valida:false,
            mensagem:"A senha deve ter no mínimo 6 caracteres."
        };

    }

    if(!REGEX_MAIUSCULA.test(senha)){

        return {
            valida:false,
            mensagem:"A senha deve conter pelo menos uma letra maiúscula."
        };

    }

    if(!REGEX_ESPECIAL.test(senha)){

        return {
            valida:false,
            mensagem:"A senha deve conter pelo menos um caractere especial (ex: ! @ # $ % *)."
        };

    }

    return { valida:true, mensagem:null };

}
