const toggleSenha = document.querySelector(".toggle-senha");

if(toggleSenha){

    const campoSenha = document.getElementById("senha");
    const icone = toggleSenha.querySelector("i");

    toggleSenha.addEventListener("click", () => {

        const visivel = campoSenha.type === "text";

        campoSenha.type = visivel ? "password" : "text";

        icone.classList.toggle("ri-eye-line", visivel);
        icone.classList.toggle("ri-eye-off-line", !visivel);

        toggleSenha.setAttribute(
            "aria-label",
            visivel ? "Mostrar senha" : "Ocultar senha"
        );

    });

}

const carrossel = document.querySelector(".login-destaque-carousel");

if(carrossel){

    const slides = Array.from(carrossel.querySelectorAll(".login-destaque-slide"));
    const pontos = Array.from(carrossel.querySelectorAll(".login-destaque-dot"));

    if(slides.length > 1){

        const intervaloMs = 5000;
        let atual = 0;
        let timer = null;

        const irPara = (indice) => {

            slides[atual].classList.remove("is-ativo");
            pontos[atual]?.classList.remove("is-ativo");

            atual = indice;

            slides[atual].classList.add("is-ativo");
            pontos[atual]?.classList.add("is-ativo");

        };

        const iniciarAutoplay = () => {

            timer = setInterval(() => {
                irPara((atual + 1) % slides.length);
            }, intervaloMs);

        };

        iniciarAutoplay();

        pontos.forEach((ponto, indice) => {

            ponto.addEventListener("click", () => {

                if(indice === atual) return;

                clearInterval(timer);
                irPara(indice);
                iniciarAutoplay();

            });

        });

    }

}
