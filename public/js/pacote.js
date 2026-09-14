// Validação/formatação de telefone. Usado no checkout e também nos
// formulários institucionais (Trabalhe Conosco, Torne-se Parceiro,
// Suporte, Proposta da Comunidade e Torne-se Apoiador).
//
// Antes, quem digitava o número com o DDI (ex: +55 53 99183-8611)
// tinha o final do número cortado, porque o campo só aceitava 11
// dígitos no total e o "55" do Brasil entrava nessa conta. Agora o
// DDI é removido antes de formatar, e também passamos a aceitar
// telefone fixo (10 dígitos), além do celular (11 dígitos).

const campoTelefone = document.getElementById("telefone");

if(campoTelefone){

    campoTelefone.addEventListener("input", ()=>{

        let numeros = campoTelefone.value.replace(/\D/g, "");

        // Remove o DDI (55) quando sobrarem dígitos demais pra ser só
        // DDD + número local.
        if(numeros.length > 11 && numeros.startsWith("55")){

            numeros = numeros.slice(2);

        }

        numeros = numeros.slice(0, 11);

        if(numeros.length > 10){

            // Celular: (53) 99183-8611
            numeros = numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");

        }else if(numeros.length > 6){

            // Fixo: (53) 3241-2233
            numeros = numeros.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");

        }else if(numeros.length > 2){

            numeros = numeros.replace(/(\d{2})(\d{0,5})/, "($1) $2");

        }

        campoTelefone.value = numeros;

    });

}
