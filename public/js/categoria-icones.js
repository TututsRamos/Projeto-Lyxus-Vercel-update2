// Seletor visual de ícones (Remix Icon) pro formulário de
// categoria do blog (dashboard). Não é a biblioteca inteira (são
// milhares de ícones), mas cobre bem os temas mais comuns de um
// blog de tecnologia/apps/design/marketing. O campo de texto
// continua aceitando qualquer classe da biblioteca digitada na mão
// — este seletor só existe pra dar uma prévia visual e evitar erro
// de digitação, que era o motivo do ícone nunca aparecer no site.

const LYXUS_ICONES_CATEGORIA = [

    // Negócios / Finanças
    { classe:"ri-briefcase-line", rotulo:"negócios" },
    { classe:"ri-line-chart-line", rotulo:"gráfico crescimento" },
    { classe:"ri-bar-chart-line", rotulo:"gráfico barras" },
    { classe:"ri-bar-chart-2-line", rotulo:"gráfico barras" },
    { classe:"ri-pie-chart-line", rotulo:"gráfico pizza" },
    { classe:"ri-money-dollar-circle-line", rotulo:"dinheiro" },
    { classe:"ri-wallet-3-line", rotulo:"carteira" },
    { classe:"ri-bank-card-line", rotulo:"cartão pagamento" },
    { classe:"ri-exchange-dollar-line", rotulo:"câmbio" },
    { classe:"ri-funds-line", rotulo:"investimento" },
    { classe:"ri-hand-coin-line", rotulo:"moeda" },
    { classe:"ri-store-2-line", rotulo:"loja" },
    { classe:"ri-store-3-line", rotulo:"loja" },
    { classe:"ri-shopping-bag-line", rotulo:"sacola compras" },
    { classe:"ri-shopping-cart-line", rotulo:"carrinho compras" },
    { classe:"ri-price-tag-3-line", rotulo:"etiqueta preço" },
    { classe:"ri-building-2-line", rotulo:"empresa prédio" },
    { classe:"ri-building-4-line", rotulo:"empresa prédio" },
    { classe:"ri-government-line", rotulo:"governo" },
    { classe:"ri-stack-line", rotulo:"pilha" },
    { classe:"ri-suitcase-line", rotulo:"maleta" },

    // Marketing / Crescimento
    { classe:"ri-megaphone-line", rotulo:"marketing anúncio" },
    { classe:"ri-rocket-line", rotulo:"lançamento foguete" },
    { classe:"ri-rocket-2-line", rotulo:"lançamento foguete" },
    { classe:"ri-target-line", rotulo:"meta alvo" },
    { classe:"ri-focus-3-line", rotulo:"foco" },
    { classe:"ri-magnet-line", rotulo:"ímã atração" },
    { classe:"ri-share-line", rotulo:"compartilhar" },
    { classe:"ri-share-forward-line", rotulo:"compartilhar" },
    { classe:"ri-thumb-up-line", rotulo:"curtir" },
    { classe:"ri-heart-3-line", rotulo:"coração" },
    { classe:"ri-star-line", rotulo:"estrela" },
    { classe:"ri-award-line", rotulo:"prêmio" },
    { classe:"ri-medal-line", rotulo:"medalha" },
    { classe:"ri-trophy-line", rotulo:"troféu" },
    { classe:"ri-gift-line", rotulo:"presente" },
    { classe:"ri-coupon-3-line", rotulo:"cupom desconto" },
    { classe:"ri-percent-line", rotulo:"porcentagem" },
    { classe:"ri-user-star-line", rotulo:"cliente destaque" },
    { classe:"ri-group-line", rotulo:"grupo pessoas" },
    { classe:"ri-team-line", rotulo:"equipe" },
    { classe:"ri-customer-service-2-line", rotulo:"atendimento" },
    { classe:"ri-hand-heart-line", rotulo:"cuidado" },

    // Web / Apps / Dev
    { classe:"ri-code-s-slash-line", rotulo:"código" },
    { classe:"ri-code-line", rotulo:"código" },
    { classe:"ri-terminal-line", rotulo:"terminal" },
    { classe:"ri-terminal-box-line", rotulo:"terminal" },
    { classe:"ri-bug-line", rotulo:"bug erro" },
    { classe:"ri-cpu-line", rotulo:"processador" },
    { classe:"ri-database-2-line", rotulo:"banco de dados" },
    { classe:"ri-server-line", rotulo:"servidor" },
    { classe:"ri-cloud-line", rotulo:"nuvem" },
    { classe:"ri-global-line", rotulo:"internet global" },
    { classe:"ri-window-line", rotulo:"janela" },
    { classe:"ri-window-2-line", rotulo:"janela navegador" },
    { classe:"ri-layout-line", rotulo:"layout" },
    { classe:"ri-layout-grid-line", rotulo:"layout grade" },
    { classe:"ri-apps-line", rotulo:"aplicativos" },
    { classe:"ri-apps-2-line", rotulo:"aplicativos" },
    { classe:"ri-smartphone-line", rotulo:"celular" },
    { classe:"ri-tablet-line", rotulo:"tablet" },
    { classe:"ri-computer-line", rotulo:"computador" },
    { classe:"ri-macbook-line", rotulo:"notebook" },
    { classe:"ri-git-branch-line", rotulo:"git versão" },
    { classe:"ri-git-merge-line", rotulo:"git versão" },
    { classe:"ri-git-commit-line", rotulo:"git versão" },
    { classe:"ri-github-line", rotulo:"github" },
    { classe:"ri-html5-line", rotulo:"html" },
    { classe:"ri-css3-line", rotulo:"css" },
    { classe:"ri-reactjs-line", rotulo:"react" },
    { classe:"ri-links-line", rotulo:"link" },
    { classe:"ri-wifi-line", rotulo:"wifi" },
    { classe:"ri-bluetooth-line", rotulo:"bluetooth" },
    { classe:"ri-plug-line", rotulo:"integração" },
    { classe:"ri-shield-check-line", rotulo:"segurança" },
    { classe:"ri-shield-line", rotulo:"segurança" },
    { classe:"ri-lock-line", rotulo:"cadeado" },
    { classe:"ri-lock-2-line", rotulo:"cadeado" },
    { classe:"ri-key-2-line", rotulo:"chave senha" },
    { classe:"ri-fingerprint-line", rotulo:"biometria" },
    { classe:"ri-eye-line", rotulo:"visualização" },
    { classe:"ri-eye-off-line", rotulo:"privacidade" },

    // Design
    { classe:"ri-palette-line", rotulo:"design paleta" },
    { classe:"ri-brush-line", rotulo:"design pincel" },
    { classe:"ri-brush-2-line", rotulo:"design pincel" },
    { classe:"ri-pen-nib-line", rotulo:"caneta design" },
    { classe:"ri-quill-pen-line", rotulo:"escrita" },
    { classe:"ri-image-line", rotulo:"imagem" },
    { classe:"ri-image-2-line", rotulo:"imagem" },
    { classe:"ri-gallery-line", rotulo:"galeria" },
    { classe:"ri-camera-line", rotulo:"câmera foto" },
    { classe:"ri-camera-2-line", rotulo:"câmera foto" },
    { classe:"ri-crop-line", rotulo:"recortar" },
    { classe:"ri-contrast-2-line", rotulo:"contraste" },
    { classe:"ri-drop-line", rotulo:"cor gota" },
    { classe:"ri-shape-line", rotulo:"forma" },
    { classe:"ri-shapes-line", rotulo:"formas" },
    { classe:"ri-scissors-cut-line", rotulo:"cortar" },
    { classe:"ri-magic-line", rotulo:"mágica efeito" },
    { classe:"ri-artboard-line", rotulo:"prancheta" },
    { classe:"ri-layout-3-line", rotulo:"layout" },
    { classe:"ri-pantone-line", rotulo:"cor pantone" },

    // Comunicação / Mídia
    { classe:"ri-mail-line", rotulo:"email" },
    { classe:"ri-mail-send-line", rotulo:"enviar email" },
    { classe:"ri-message-3-line", rotulo:"mensagem" },
    { classe:"ri-message-2-line", rotulo:"mensagem" },
    { classe:"ri-chat-1-line", rotulo:"chat" },
    { classe:"ri-chat-3-line", rotulo:"chat" },
    { classe:"ri-phone-line", rotulo:"telefone" },
    { classe:"ri-notification-3-line", rotulo:"notificação" },
    { classe:"ri-notification-2-line", rotulo:"notificação" },
    { classe:"ri-mic-line", rotulo:"microfone" },
    { classe:"ri-video-line", rotulo:"vídeo" },
    { classe:"ri-vidicon-line", rotulo:"vídeo câmera" },
    { classe:"ri-live-line", rotulo:"ao vivo" },
    { classe:"ri-broadcast-line", rotulo:"transmissão" },
    { classe:"ri-tv-2-line", rotulo:"televisão" },
    { classe:"ri-radio-line", rotulo:"rádio" },
    { classe:"ri-headphone-line", rotulo:"fone áudio" },
    { classe:"ri-music-2-line", rotulo:"música" },
    { classe:"ri-play-circle-line", rotulo:"reproduzir" },

    // Conteúdo / Documentos
    { classe:"ri-file-text-line", rotulo:"documento texto" },
    { classe:"ri-file-list-3-line", rotulo:"lista documento" },
    { classe:"ri-article-line", rotulo:"artigo" },
    { classe:"ri-newspaper-line", rotulo:"notícia jornal" },
    { classe:"ri-book-open-line", rotulo:"livro" },
    { classe:"ri-book-2-line", rotulo:"livro" },
    { classe:"ri-edit-2-line", rotulo:"editar" },
    { classe:"ri-draft-line", rotulo:"rascunho" },
    { classe:"ri-file-edit-line", rotulo:"editar arquivo" },
    { classe:"ri-bookmark-line", rotulo:"favorito" },
    { classe:"ri-bookmark-3-line", rotulo:"favorito" },
    { classe:"ri-folder-2-line", rotulo:"pasta" },
    { classe:"ri-folder-open-line", rotulo:"pasta aberta" },
    { classe:"ri-clipboard-line", rotulo:"prancheta" },
    { classe:"ri-survey-line", rotulo:"pesquisa formulário" },

    // Sistema / Geral
    { classe:"ri-settings-3-line", rotulo:"configurações" },
    { classe:"ri-settings-4-line", rotulo:"configurações" },
    { classe:"ri-tools-line", rotulo:"ferramentas" },
    { classe:"ri-hammer-line", rotulo:"martelo" },
    { classe:"ri-flask-line", rotulo:"experimento" },
    { classe:"ri-test-tube-line", rotulo:"teste laboratório" },
    { classe:"ri-microscope-line", rotulo:"pesquisa" },
    { classe:"ri-recycle-line", rotulo:"reciclagem" },
    { classe:"ri-leaf-line", rotulo:"sustentabilidade" },
    { classe:"ri-sun-line", rotulo:"sol" },
    { classe:"ri-cloud-windy-line", rotulo:"vento" },
    { classe:"ri-thunderstorm-line", rotulo:"tempestade" },
    { classe:"ri-rainy-line", rotulo:"chuva" },
    { classe:"ri-plane-line", rotulo:"avião viagem" },
    { classe:"ri-car-line", rotulo:"carro" },
    { classe:"ri-truck-line", rotulo:"caminhão entrega" },
    { classe:"ri-ship-line", rotulo:"navio" },
    { classe:"ri-flag-2-line", rotulo:"bandeira" },
    { classe:"ri-checkbox-circle-line", rotulo:"concluído" },
    { classe:"ri-question-line", rotulo:"dúvida" },
    { classe:"ri-error-warning-line", rotulo:"alerta erro" },
    { classe:"ri-information-line", rotulo:"informação" },
    { classe:"ri-alert-line", rotulo:"alerta" },
    { classe:"ri-time-line", rotulo:"tempo relógio" },
    { classe:"ri-calendar-line", rotulo:"calendário" },
    { classe:"ri-calendar-event-line", rotulo:"evento" },
    { classe:"ri-alarm-line", rotulo:"alarme" },
    { classe:"ri-history-line", rotulo:"histórico" },
    { classe:"ri-earth-line", rotulo:"mundo global" },
    { classe:"ri-map-pin-line", rotulo:"localização" },
    { classe:"ri-compass-3-line", rotulo:"bússola" },
    { classe:"ri-lightbulb-line", rotulo:"ideia" },
    { classe:"ri-lightbulb-flash-line", rotulo:"ideia inovação" },
    { classe:"ri-seedling-line", rotulo:"crescimento planta" },
    { classe:"ri-user-line", rotulo:"usuário" },
    { classe:"ri-user-3-line", rotulo:"usuário" }

];

document.addEventListener("DOMContentLoaded", ()=>{

    const campoIcone = document.getElementById("icone");
    const previewIcone = document.getElementById("preview-icone");

    if(!campoIcone || !previewIcone) return;

    function atualizarPreview(){

        const classe = (campoIcone.value || "").trim() || "ri-folder-2-line";

        previewIcone.innerHTML = `<i class="${classe}"></i>`;

    }

    campoIcone.addEventListener("input", atualizarPreview);

    atualizarPreview();

    // Grade de ícones dentro do modal seletor

    const grade = document.getElementById("grade-icones");
    const busca = document.getElementById("busca-icone");

    if(!grade) return;

    function renderizarGrade(filtro){

        const termo = (filtro || "").toLowerCase().trim();

        const filtrados = LYXUS_ICONES_CATEGORIA.filter(icone=>

            !termo ||
            icone.classe.includes(termo) ||
            icone.rotulo.includes(termo)

        );

        grade.innerHTML = "";

        if(!filtrados.length){

            grade.innerHTML = '<div class="categoria-icone-vazio">Nenhum ícone encontrado. Você ainda pode digitar a classe manualmente no campo acima.</div>';

            return;

        }

        filtrados.forEach(icone=>{

            const botao = document.createElement("button");

            botao.type = "button";
            botao.className = "categoria-icone-item";
            botao.title = icone.rotulo;
            botao.innerHTML = `<i class="${icone.classe}"></i>`;

            botao.addEventListener("click", ()=>{

                campoIcone.value = icone.classe;

                atualizarPreview();

                const modal = document.getElementById("modal-icones");

                if(modal) modal.classList.remove("aberto");

            });

            grade.appendChild(botao);

        });

    }

    renderizarGrade("");

    if(busca){

        busca.addEventListener("input", ()=> renderizarGrade(busca.value));

    }

});
