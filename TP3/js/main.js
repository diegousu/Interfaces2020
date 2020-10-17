document.addEventListener("DOMContentLoaded", function(){
let posCarru=1;
let page=document.querySelector(".pagina");
let acordeon=document.querySelector("#acordeon");
let slider=document.querySelector("#slider");
let portada=document.querySelector("#portada");
document.querySelector("#menu").addEventListener("click", function(){
    document.querySelector(".menu").classList.toggle("oculto");
    });
setSpinner(400,"slider");
setInterval(countDown,2000);

function countDown(){
    let actual=new Date();
    let futura=new Date(2020,11,25);
    let result=timeLeft(futura-actual);
    regresiva.innerHTML=`Faltan ${result.dias}días ${result.horas}hr ${result.minutos}min ${result.segundos}seg para el estreno`;
}

function timeLeft(d) {
    let dias=d/(24* 60 * 60 * 1000);
    d=d%(24* 60 * 60 * 1000);
    let horas=d/(60 * 60 * 1000);
    d=d%(60 * 60 * 1000);
    let minutos=d/(60*1000);
    d=d%(60*1000);
    let segundos=d/(1000);
    return {dias:Math.floor(dias), horas: Math.floor(horas), minutos:Math.floor(minutos), segundos: Math.floor(segundos)};
}



//variables de layers
let l1=document.querySelector("#layer1");
let l2=document.querySelector("#layer2");
let l3=document.querySelector("#layer3");
let l4=document.querySelector("#layer4");
let l5=document.querySelector("#layer5");
let l6=document.querySelector("#layer6");
let l7=document.querySelector("#layer7");
let l8=document.querySelector("#layer8");
let l9=document.querySelector("#layer9");
let l6b=document.querySelector("#layer6b");
let l6c=document.querySelector("#layer6c");
let l6d=document.querySelector("#layer6d");
let regresiva=document.querySelector("#countdown");
let cLay1=document.querySelector("#Clayer1");
let cLay2=document.querySelector("#Clayer2");
let cLay3=document.querySelector("#Clayer3");


//listeners
document.querySelector("#link1").addEventListener("click", function(){setSpinner(500, "portada")});
document.querySelector("#link2").addEventListener("click", function(){setSpinner(500, "acordeon")});
document.querySelector("#link3").addEventListener("click", function(){setSpinner(500, "slider")});

document.querySelector("#next").addEventListener("click", function(){moverCarrusel(1)});
document.querySelector("#prev").addEventListener("click", function(){moverCarrusel(-1)});

//funciones de hover para las img
for(let i=0;i<acordeon.childElementCount;i++){
    acordeon.children[i].addEventListener("mousemove",function(e){
        let x=e.layerX;
        let y=e.layerY;
        let yRotation = 20 * ((x - this.width / 2) / this.width)
        let xRotation = -20 * ((y - this.height / 2) / this.height)
        let string='perspective(500px) scale(1.02) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
        this.style.transform=string;
        this.style.border="2px solid white";
    });
    acordeon.children[i].addEventListener("mouseleave",function(){
        let string="perspective(0) scale(1) rotateX(0deg) rotateY(0deg)";
        this.style.transform=string;
        this.style.border="";
    });
}


function setSpinner(time, dest){
    document.querySelector(".spinner").classList.remove("oculto");
    page.classList.add("oculto");
    document.querySelector(".menu").classList.toggle("oculto");
    document.removeEventListener("scroll", scrollea);
    let sangre=document.querySelector(".blood");
    sangre.style.animation="fillPool "+time/1000+"s linear";
    setTimeout(function(){loadPage(dest)}, time);
}

function loadPage(dest){//dest es el ID del elemento a saltar
    document.querySelector(".spinner").classList.add("oculto");
    page.classList.remove("oculto");
    document.addEventListener("scroll", scrollea);
    let nivScroll=0;
    if (dest=="acordeon")
        nivScroll=1101;
    if (dest=="slider")
        nivScroll=1500;
    window.scrollTo(0,nivScroll);
    scrollea();
}

function scrollea(){
    let nivScroll=window.scrollY;
    document.title=nivScroll;
    checkVisible(nivScroll);
    if (nivScroll<1000){
        animarPortada(nivScroll);
        return;
    }
    if (nivScroll<1500){
        animarAcordeon(nivScroll);
    }
    if (nivScroll>1300)
        animarSlider(nivScroll);
}    
//#region animacion_portada
function animarPortada(scroll){
    if (scroll<700){
        portada.removeEventListener("mousemove", animarKillBill);
        l8.style.animation="";
    }
    regresiva.style.visibility="hidden";
    portada.style.position="sticky";
    portada.style.top="0";
    l1.style.opacity=1;
    l2.style.opacity=1;
    l3.style.visibility="visible";
    l4.style.visibility="visible";
    l5.style.opacity=1;
    l6d.style.visibility="hidden";
    l7.style.opacity=0;
    l8.style.opacity=0;
    l9.style.opacity=0;
    if (scroll<500){//Calma pacífica
        l1.style.filter= "hue-rotate(0deg)";
        l3.style.filter="invert(0%)";
        l4.style.filter="invert(0%)";
        if (scroll>100){//aparecen los asesinos
            l6b.style.visibility="hidden";
            l6c.style.visibility="hidden";
            l7.style.opacity=1;
            l7.style.backgroundSize="100%";
            l7.style.left=0;
        }
        if (scroll>200&&scroll<300){//desaparecen
            l7.style.opacity=0;
        }
        if (scroll>300&&scroll<500){//Avanzan
            l7.style.opacity=1;
            l7.style.backgroundSize="20%";
            l7.style.top="60%";
            l7.style.left="40%";
            if (scroll>400){
                l7.style.opacity=0;
            }
        }
    }
    else{//funde a negro
            l6.style.opacity=0;
            l5.style.opacity=0;
            l4.style.visibility="hidden";
            l3.style.visibility="hidden";
            l2.style.opacity=0;
            l1.style.opacity=0;
            portada.style.backgroundColor="black";
            //portada.style.transition="opacity 1s linear";
        if (scroll>600){//trans a title con fondo amarillo
            l6d.style.visibility="visible";
            l8.style.transform="";
            l9.style.transform="";
            portada.style.backgroundColor="yellow";
            l8.style.opacity=1;
            l9.style.opacity=1;
            portada.style.transition="";
            portada.addEventListener("mousemove", animarKillBill)
        }
        if (scroll>700){//Animación sangrienta con countdown
            l6b.style.visibility="hidden";
            l6c.style.visibility="hidden";
            l6d.style.visibility="hidden";
            l3.style.visibility="visible";
            l4.style.visibility="visible";
            l1.style.filter= "hue-rotate(165deg)";
            l3.style.filter="invert(100%)";
            l4.style.filter="invert(100%)";
            portada.style.backgroundColor="black";
            regresiva.style.visibility="visible";
            l6.style.opacity=1;
            l5.style.opacity=1;
            l4.style.opacity=1;
            l3.style.opacity=1;
            l2.style.opacity=1;
            l1.style.opacity=1;
        }
    }
}

function animarKillBill(e){
    l6d.style.visibility="hidden";
    l6d.style.opacity="0";
    let posx=((e.clientX-portada.offsetLeft)*0.012);let posy=e.clientY*0.05-20;
    l8.style.transform="translateY("+posx*(-1)+"px)";
    l9.style.transform="translateY("+posx+"px)";
    if (posx>12){
        l8.style.animation="bloodyKill 1s infinite";
        l8.style.height="650px";
    }
    else{
        l8.style.animation="";
        l8.style.height="300px";
    }
}
//#endregion animacion_portada

function animarAcordeon(scroll){
    acordeon.style.top=scroll+25+"px";
    if (scroll>1100){
        acordeon.style.marginLeft=(scroll*0.28)-314+"%";
    }
}

function animarSlider(scroll){
    if (scroll<1500)
        slider.style.top=(-3*scroll)+6000+"px";
    else slider.style.top=scroll+20+"px";
}

function checkVisible(sy){
    if (sy<1000){//portada
        portada.style.opacity="1";
        acordeon.style.opacity="0";
        slider.style.opacity="0";
    }
    if (sy<1500&&sy>=1000){//acordeon
        portada.style.transition="opacity ease-out 1s";
        portada.style.opacity="0";
        acordeon.style.opacity="1";
        slider.style.opacity="0";
        if (sy>1300)
            slider.style.opacity="1";    
    }
    if (sy>=1500){//slider
        slider.style.opacity="1";    
        portada.style.opacity="0";
        acordeon.style.opacity="0";
    }
}

function moverCarrusel(pos){
    posCarru+=pos;
    if (posCarru==0)
        posCarru=6;
    if (posCarru==7)
        posCarru=1;
    let sig=posCarru+1;
        if (sig==7)
            sig=1;
    let ant=posCarru-1;
    if (ant==0)
        ant=6;
    cLay1.style.backgroundImage=`url(../img/carrusel/${ant}.jpg)`;
    cLay2.style.backgroundImage=`url(../img/carrusel/${posCarru}.jpg)`;
    cLay3.style.backgroundImage=`url(../img/carrusel/${sig}.jpg)`;
}

});