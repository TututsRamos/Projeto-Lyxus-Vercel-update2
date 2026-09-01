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
