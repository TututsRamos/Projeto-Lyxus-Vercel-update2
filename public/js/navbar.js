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