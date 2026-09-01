// Abre/fecha o painel lateral de "Minha Conta" (disponível em
// qualquer página pública através do botão no rodapé)

const contaDrawer = document.getElementById("conta-drawer");
const contaDrawerOverlay = document.getElementById("conta-drawer-overlay");
const contaDrawerFechar = document.getElementById("conta-drawer-fechar");
const contaDrawerBotoes = document.querySelectorAll("[data-abrir-conta-drawer]");

// "overflow:hidden" sozinho não trava o scroll em iOS Safari — o
// conteúdo de trás continua rolável com o painel aberto. Fixamos
// o body no lugar guardando a posição do scroll, e devolvemos a
// posição exata ao fechar.

let scrollAntesDoDrawer = 0;

function abrirContaDrawer(){

    if(!contaDrawer || !contaDrawerOverlay) return;

    scrollAntesDoDrawer = window.scrollY;

    contaDrawer.classList.add("aberto");
    contaDrawerOverlay.classList.add("aberto");

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollAntesDoDrawer}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

}

function fecharContaDrawer(){

    if(!contaDrawer || !contaDrawerOverlay) return;

    contaDrawer.classList.remove("aberto");
    contaDrawerOverlay.classList.remove("aberto");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";

    window.scrollTo(0, scrollAntesDoDrawer);

}

contaDrawerBotoes.forEach(botao=>{

    botao.addEventListener("click", (e)=>{

        e.preventDefault();
        abrirContaDrawer();

    });

});

if(contaDrawerFechar){

    contaDrawerFechar.addEventListener("click", fecharContaDrawer);

}

if(contaDrawerOverlay){

    contaDrawerOverlay.addEventListener("click", fecharContaDrawer);

}
