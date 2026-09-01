// Abrir/fechar sidebar no mobile

const menuDash = document.querySelector(".dash-menu-mobile");
const sidebarDash = document.querySelector(".sidebar");

if(menuDash && sidebarDash){

    // Overlay criado por código pra não precisar mexer em todas
    // as views que usam esse sidebar (dashboard, staff, painel).
    // Sem ele, o sidebar fica sobreposto (position:fixed), mas o
    // <body> continua rolando por baixo — dá pra "arrastar" o
    // conteúdo de trás enquanto o menu tá aberto.
    //
    // "overflow:hidden" sozinho não é suficiente no Safari/iOS
    // (o scroll de trás continua funcionando por toque). A trava
    // que funciona em qualquer navegador é fixar o body na
    // posição exata do scroll e devolver essa posição ao fechar.
    const overlayDash = document.createElement("div");
    overlayDash.className = "dash-sidebar-overlay";
    document.body.appendChild(overlayDash);

    let scrollAntesSidebarDash = 0;

    function fecharSidebarDash(){

        sidebarDash.classList.remove("aberta");
        overlayDash.classList.remove("visivel");

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        window.scrollTo(0, scrollAntesSidebarDash);

    }

    menuDash.addEventListener("click", ()=>{

        const vaiAbrir = !sidebarDash.classList.contains("aberta");

        sidebarDash.classList.toggle("aberta", vaiAbrir);
        overlayDash.classList.toggle("visivel", vaiAbrir);

        if(vaiAbrir){

            scrollAntesSidebarDash = window.scrollY;

            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollAntesSidebarDash}px`;
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";

        }else{

            fecharSidebarDash();

        }

    });

    overlayDash.addEventListener("click", fecharSidebarDash);

    sidebarDash.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click", fecharSidebarDash);

    });

}

// Confirmação antes de excluir qualquer item do painel

document.querySelectorAll(".tabela-acoes a.excluir").forEach(link=>{

    link.addEventListener("click", (e)=>{

        const confirmado = confirm("Tem certeza que deseja excluir este item? Essa ação não pode ser desfeita.");

        if(!confirmado){
            e.preventDefault();
        }

    });

});

// Preview de imagem antes do upload (usado nos formulários do dashboard)

document.querySelectorAll("input[type='file'][data-preview]").forEach(input=>{

    input.addEventListener("change", ()=>{

        const alvo = document.querySelector(input.dataset.preview);

        if(!alvo || !input.files[0]) return;

        alvo.src = URL.createObjectURL(input.files[0]);
        alvo.style.display = "block";

    });

});
