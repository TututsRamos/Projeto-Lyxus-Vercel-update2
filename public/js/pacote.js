// Validação simples de telefone no checkout (formatação básica)

const campoTelefone = document.getElementById("telefone");

if(campoTelefone){

    campoTelefone.addEventListener("input", ()=>{

        let numeros = campoTelefone.value.replace(/\D/g, "").slice(0, 11);

        if(numeros.length > 6){

            numeros = numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");

        }else if(numeros.length > 2){

            numeros = numeros.replace(/(\d{2})(\d{0,5})/, "($1) $2");

        }

        campoTelefone.value = numeros;

    });

}
