// Efeito simples de entrada nos cards do blog conforme o usuário rola a página

const cardsBlog = document.querySelectorAll(".post-card");

if(cardsBlog.length){

    const observer = new IntersectionObserver((entradas)=>{

        entradas.forEach(entrada=>{

            if(entrada.isIntersecting){

                entrada.target.classList.add("fade");
                observer.unobserve(entrada.target);

            }

        });

    }, { threshold:.15 });

    cardsBlog.forEach(card=> observer.observe(card));

}
