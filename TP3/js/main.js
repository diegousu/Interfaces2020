document.addEventListener("DOMContentLoaded", function(){
let page=document.querySelector(".pagina");
let acordeon=document.querySelector("#acordeon");
let slider=document.querySelector("#slider");
let portada=document.querySelector("#portada");
setSpinner(1000,"portada");

//Zona de prueba
document.querySelector("#link1").addEventListener("click", function(){setSpinner(500, "portada")});
document.querySelector("#link2").addEventListener("click", function(){setSpinner(500, "acordeon")});
document.querySelector("#link3").addEventListener("click", function(){setSpinner(500, "slider")});
//

function setSpinner(time, dest){
    document.querySelector(".spinner").classList.remove("oculto");
    page.classList.add("oculto");
    document.removeEventListener("scroll", scrollea);
    let sangre=document.querySelector(".blood");
    sangre.style.animation="fillPool "+time/1000+"s linear";
    setTimeout(function(){loadPage(dest)}, time);
}


function loadPage(dest){//dest es el valor de scroll Y pasa saltar ahí con los links
    document.querySelector(".spinner").classList.add("oculto");
    page.classList.remove("oculto");
    document.addEventListener("scroll", scrollea);
    document.querySelector("#"+dest).scrollIntoView();

}

function scrollea(){
    let nivScroll=window.scrollY;
        console.log(nivScroll);
        if (nivScroll<(700+612)){
            acordeon.style.marginLeft=(nivScroll*(15/146)-50)+"%";
        }
        if (nivScroll>(800+612)&&nivScroll<(1632+612)){
            slider.style.marginLeft=(-1*nivScroll/8)+200+"%";
    }
    if (nivScroll>=(1632+612))
        slider.style.marginLeft=0+"%";
    
    }    
});