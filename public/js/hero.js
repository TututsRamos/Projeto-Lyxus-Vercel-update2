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
