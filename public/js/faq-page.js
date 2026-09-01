// Accordion da página própria de FAQ (/faq). Diferente do FAQ da
// home (balões flutuantes ao lado de um painel visual), aqui as
// perguntas ficam fechadas por padrão e abrem uma a uma ao clicar
// — antes todas vinham abertas de uma vez, o que deixava a página
// enorme e pesada no mobile.

document.querySelectorAll(".faq-page-grid .faq-bubble").forEach(bolha=>{

    bolha.addEventListener("click", ()=>{

        bolha.classList.toggle("aberto");

    });

});
