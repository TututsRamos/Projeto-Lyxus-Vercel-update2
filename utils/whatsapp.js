// ==========================================================
// Gera um link "https://wa.me/..." a partir de um número de
// telefone em qualquer formato (com espaços, parênteses,
// traços, com ou sem "+55" na frente).
//
// Se nenhum número for informado, usa o número padrão da
// LYXUS como fallback — assim o botão de contato sempre leva
// a algum lugar, mesmo antes do admin configurar o campo
// "WhatsApp" no painel (dashboard/configuracoes).
// ==========================================================

const NUMERO_PADRAO = "+55 53 9183-8611";

export function gerarLinkWhatsapp(numero, mensagem){

    const numeroBruto = numero && numero.trim() ? numero : NUMERO_PADRAO;

    let apenasDigitos = numeroBruto.replace(/\D/g, "");

    // Se não veio com o código do país, assume Brasil (55).
    if(!apenasDigitos.startsWith("55")){

        apenasDigitos = "55" + apenasDigitos;

    }

    const texto = mensagem
        ? `?text=${encodeURIComponent(mensagem)}`
        : "";

    return `https://wa.me/${apenasDigitos}${texto}`;

}

export default gerarLinkWhatsapp;
