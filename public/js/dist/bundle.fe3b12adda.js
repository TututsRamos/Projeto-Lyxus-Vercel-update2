/* ---- js/theme.js ---- */
(function () {

    // Chave com sufixo "-v2": se o navegador já tinha um tema antigo
    // salvo (ex: "padrao" de antes do escuro virar o padrão), ele é
    // ignorado e todo mundo volta a cair no tema escuro por padrão.
    var CHAVE = "lyxus-tema-v2";

    var TEMAS = ["padrao", "escuro", "invertido"];

    var TEMA_PADRAO = "escuro";

    function temaSalvo() {
        try {
            var t = localStorage.getItem(CHAVE);
            return TEMAS.indexOf(t) !== -1 ? t : TEMA_PADRAO;
        } catch (e) {
            return TEMA_PADRAO;
        }
    }

    function aplicarTema(tema) {
        if (TEMAS.indexOf(tema) === -1) tema = "padrao";

        if (tema === "padrao") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", tema);
        }

        try { localStorage.setItem(CHAVE, tema); } catch (e) {}

        document
            .querySelectorAll("[data-tema-opcao]")
            .forEach(function (btn) {
                btn.classList.toggle(
                    "ativo",
                    btn.getAttribute("data-tema-opcao") === tema
                );
            });
    }

    document.addEventListener("DOMContentLoaded", function () {

        aplicarTema(temaSalvo());

        document
            .querySelectorAll("[data-tema-opcao]")
            .forEach(function (btn) {
                btn.addEventListener("click", function () {
                    aplicarTema(btn.getAttribute("data-tema-opcao"));
                });
            });

        document
            .querySelectorAll("[data-tema-toggle]")
            .forEach(function (btn) {
                btn.addEventListener("click", function () {
                    var atual = temaSalvo();
                    var proximo =
                        TEMAS[(TEMAS.indexOf(atual) + 1) % TEMAS.length];
                    aplicarTema(proximo);
                });
            });
    });
})();


/* ---- js/navbar.js ---- */
const navbar=document.querySelector(".navbar");

const nav=document.querySelector(".nav-menu");

if(navbar){

    window.addEventListener("scroll",()=>{

        if(window.scrollY>40){

            navbar.classList.add("scrolled");

        }else{

            navbar.classList.remove("scrolled");

        }

    });

}

document.addEventListener("click",(evento)=>{

    const link=evento.target.closest("[data-abrir-tawk]");

    if(!link) return;

    if(window.Tawk_API && typeof Tawk_API.maximize==="function"){

        evento.preventDefault();

        Tawk_API.maximize();

        return;

    }

    // Widget ainda não carregado (ex: visitante não decidiu sobre
    // cookies ainda). Clicar em "Suporte" já é o próprio visitante
    // pedindo pra falar com alguém, então carregamos o tawk.to agora
    // e maximizamos assim que ele terminar de carregar, em vez de só
    // deixar a página estática de contato abrir.
    if(typeof window.iniciarTawk === "function"){

        evento.preventDefault();

        window.iniciarTawk(function(){

            if(window.Tawk_API && typeof Tawk_API.maximize === "function"){

                Tawk_API.maximize();

            }

        });

        return;

    }

    // Se nem isso existir (tawk.to não configurado no dashboard), o
    // link segue normalmente pra página /suporte, que continua
    // existindo como fallback com e-mail, WhatsApp e formulário.

});

document.querySelectorAll(".bloqueado-visitante").forEach((elemento)=>{

    elemento.addEventListener("click",(evento)=>{

        evento.preventDefault();
        evento.stopPropagation();

        const mensagem = elemento.dataset.bloqueadoMsg ||
            "Essa área ainda não está disponível pra você. Aguarde a aprovação da sua conta.";

        const aviso=document.createElement("div");

        aviso.className="aviso-visitante-toast";
        aviso.innerHTML=`<i class="ri-lock-2-line"></i><span>${mensagem}</span>`;

        document.body.appendChild(aviso);

        requestAnimationFrame(()=> aviso.classList.add("visivel"));

        setTimeout(()=>{

            aviso.classList.remove("visivel");

            setTimeout(()=> aviso.remove(), 300);

        }, 4000);

    });

});

const navDropdown=document.querySelector("[data-nav-dropdown]");

const navDropdownCaret=document.querySelector("[data-nav-dropdown-caret]");

if(navDropdown && navDropdownCaret){

    navDropdownCaret.addEventListener("click",(evento)=>{

        evento.preventDefault();
        evento.stopPropagation();

        navDropdown.classList.toggle("aberto");

    });

    document.addEventListener("click",(evento)=>{

        if(!navDropdown.contains(evento.target)){

            navDropdown.classList.remove("aberto");

        }

    });

    navDropdown.querySelectorAll(".nav-dropdown-menu a").forEach((link)=>{

        link.addEventListener("click",()=>{

            navDropdown.classList.remove("aberto");
            nav.classList.remove("active");

        });

    });

}

/* ---- js/hero.js ---- */
const centralHero = document.getElementById("central-hero");
const iconesHero = document.querySelectorAll(".hero-visual .circle[data-icone]");

const ordemSlots = ["top", "right", "bottom", "left"];

/* Clique no círculo central: gira os 4 ícones no sentido horário
   (o de cima vai pro lado direito, o da direita vai pro de baixo,
   o de baixo vai pro esquerdo, e o da esquerda vai pro de cima) */

function girarIconesHero(){

    iconesHero.forEach(icone=>{

        const atual = ordemSlots.find(slot => icone.classList.contains("slot-" + slot));

        if(!atual) return;

        const proximo = ordemSlots[(ordemSlots.indexOf(atual) + 1) % ordemSlots.length];

        icone.classList.remove("slot-" + atual);
        icone.classList.add("slot-" + proximo);

    });

}

if(centralHero){

    centralHero.addEventListener("click", girarIconesHero);

}

/* Clique em um dos ícones brancos: dispara a mini animação dele
   (funciona mesmo clicando várias vezes seguidas, forçando reflow) */

function tocarEfeitoHero(icone){

    const elementos = icone.querySelectorAll(".notif-badge, .bit, .gota, .stonks");

    elementos.forEach(el=>{

        el.classList.remove("tocado");

        void el.offsetWidth;

        el.classList.add("tocado");

    });

}

iconesHero.forEach(icone=>{

    icone.addEventListener("click", ()=> tocarEfeitoHero(icone));

});


/* ---- js/conta-drawer.js ---- */
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


/* ---- js/cookies.js ---- */
// Banner de consentimento de cookies (Aceitar / Recusar).
//
// A decisão do usuário é salva num cookie ("lyxus_cookie_consent"),
// não em localStorage, porque o servidor (middleware/locals.js)
// também precisa ler esse valor antes de decidir se inclui o script
// do Google Analytics no <head> (ver partials/head.ejs) — cookie é
// enviado automaticamente em toda requisição, localStorage não.
//
// Ao aceitar, recarregamos a página: assim o servidor já renderiza
// o <head> com o Analytics habilitado, sem precisar duplicar essa
// lógica de "carregar script sob consentimento" aqui no cliente.

(function(){

    function definirCookie(nome, valor, dias){

        const dataExpira = new Date();

        dataExpira.setTime(dataExpira.getTime() + dias * 24 * 60 * 60 * 1000);

        document.cookie =
            nome + "=" + encodeURIComponent(valor) +
            "; expires=" + dataExpira.toUTCString() +
            "; path=/; SameSite=Lax";

    }

    const banner = document.getElementById("cookie-banner");

    if(!banner) return;

    const botaoAceitar = document.getElementById("cookie-aceitar");
    const botaoRecusar = document.getElementById("cookie-recusar");

    if(botaoAceitar){

        botaoAceitar.addEventListener("click", ()=>{

            definirCookie("lyxus_cookie_consent", "aceito", 180);

            window.location.reload();

        });

    }

    if(botaoRecusar){

        botaoRecusar.addEventListener("click", ()=>{

            definirCookie("lyxus_cookie_consent", "recusado", 180);

            banner.remove();

        });

    }

})();
