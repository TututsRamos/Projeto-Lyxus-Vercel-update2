const menuBtn = document.querySelector(".menu-mobile");

const menu = document.querySelector(".nav-menu");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        menu.classList.toggle("ativo");

    });

}