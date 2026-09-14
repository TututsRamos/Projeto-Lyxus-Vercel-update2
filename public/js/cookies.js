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
