// Funções utilitárias reutilizáveis em qualquer página do site.

// Formata um número para moeda brasileira (R$ 1.234,56)
function formatarMoeda(valor){

    return Number(valor || 0).toLocaleString("pt-BR", {
        style:"currency",
        currency:"BRL"
    });

}

// Formata uma data (ISO ou Date) para dd/mm/aaaa
function formatarData(data){

    return new Date(data).toLocaleDateString("pt-BR");

}

// Limita o tamanho de um texto, adicionando "..." no final
function truncarTexto(texto, limite = 120){

    if(!texto || texto.length <= limite) return texto;

    return texto.slice(0, limite).trim() + "...";

}

// Atrasa a execução de uma função (evita disparos repetidos, ex: busca ao digitar)
function debounce(fn, atraso = 300){

    let timer;

    return (...args)=>{

        clearTimeout(timer);
        timer = setTimeout(()=> fn(...args), atraso);

    };

}

// Copia um texto para a área de transferência
async function copiarTexto(texto){

    try{

        await navigator.clipboard.writeText(texto);
        return true;

    }catch(err){

        console.error("Não foi possível copiar:", err);
        return false;

    }

}
