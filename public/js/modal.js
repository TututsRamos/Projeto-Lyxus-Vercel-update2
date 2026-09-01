// Modal genérico e reutilizável.
//
// Como usar:
// <button data-modal-abrir="meu-modal">Abrir</button>
//
// <div class="modal" id="meu-modal">
//     <div class="modal-conteudo">
//         <button data-modal-fechar><i class="ri-close-line"></i></button>
//         ... conteúdo ...
//     </div>
// </div>

document.querySelectorAll("[data-modal-abrir]").forEach(botao=>{

    botao.addEventListener("click", ()=>{

        const modal = document.getElementById(botao.dataset.modalAbrir);

        if(modal){
            modal.classList.add("aberto");
        }

    });

});

document.querySelectorAll(".modal").forEach(modal=>{

    // fecha clicando no X
    modal.querySelectorAll("[data-modal-fechar]").forEach(botao=>{

        botao.addEventListener("click", ()=>{
            modal.classList.remove("aberto");
        });

    });

    // fecha clicando fora do conteúdo
    modal.addEventListener("click", (e)=>{

        if(e.target === modal){
            modal.classList.remove("aberto");
        }

    });

});

// fecha com a tecla ESC

document.addEventListener("keydown", (e)=>{

    if(e.key === "Escape"){

        document.querySelectorAll(".modal.aberto").forEach(modal=>{
            modal.classList.remove("aberto");
        });

    }

});
