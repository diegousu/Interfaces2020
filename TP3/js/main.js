document.addEventListener("DOMContentLoaded", function(){
let posCarru=1;
let page=document.querySelector(".pagina");
let cards=document.querySelector("#cards");
let slider=document.querySelector("#slider");
let portada=document.querySelector("#portada");
let calendar=document.querySelector("#calendar");
let comentarios=document.querySelector("#comentarios");
document.querySelector("#menu").addEventListener("click", function(){
    document.querySelector(".menu").classList.toggle("oculto");
    });
setSpinner(3000,"portada");
setInterval(countDown,200);

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
document.querySelector("#link1").addEventListener("click", function(){setSpinner(1000, "portada")});
document.querySelector("#link2").addEventListener("click", function(){setSpinner(1000, "cards")});
document.querySelector("#link3").addEventListener("click", function(){setSpinner(1000, "slider")});
document.querySelector("#link4").addEventListener("click", function(){setSpinner(1000, "calendar")});
document.querySelector("#link5").addEventListener("click", function(){setSpinner(1000, "comentarios")});

document.querySelector("#next").addEventListener("click", function(){moverCarrusel(1)});
document.querySelector("#prev").addEventListener("click", function(){moverCarrusel(-1)});
let enviar=document.querySelector("#btnEnviar");
    enviar.addEventListener("click", animarForm);
document.querySelector("#btnOtro").addEventListener("click",nuevoMensaje);

//funciones de hover para las Cards
let pers=document.querySelector("#personaje");
for(let i=1;i<cards.childElementCount;i++){
    cards.children[i].addEventListener("mousemove",function(e){
        let x=e.layerX;
        let y=e.layerY;
        let yRotation = 20 * ((x - this.width / 2) / this.width)
        let xRotation = -20 * ((y - this.height / 2) / this.height)
        let string='perspective(500px) scale(1.02) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
        this.style.transform=string;
        this.style.border="2px solid white";
        pers.innerHTML=cards.children[i].alt;
    });
    cards.children[i].addEventListener("mouseleave",function(){
        let string="perspective(0) scale(1) rotateX(0deg) rotateY(0deg)";
        this.style.transform=string;
        this.style.border="";
        pers.innerHTML="Personajes";
    });
}
    //hover para las img del Calendar
let imgsCal=document.querySelectorAll(".calImg");
for(let i=0;i<imgsCal.length;i++){
    for (let j=0;j<imgsCal[i].childElementCount;j++){
        imgsCal[i].children[j].addEventListener("mousemove",function(e){
            let x=e.layerX;
            let y=e.layerY;
            let yRotation = 25 * ((x - this.width / 2) / this.width)
            let xRotation = -20 * ((y - this.height / 2) / this.height)
            let string='perspective(500px) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
            this.style.transform=string;
        });
        imgsCal[i].children[j].addEventListener("mouseleave",function(){
            let string="perspective(0) rotateX(0deg) rotateY(0deg)";
            this.style.transform=string;
        });
    }
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
    document.addEventListener("wheel", scrollea);
    nivScroll=0;
    if (dest=="cards")
        nivScroll=1101;
    if (dest=="slider")
        nivScroll=1500;
    if (dest=="calendar")
        nivScroll=1700;
    if (dest=="comentarios")
        nivScroll=1900;
        window.scrollTo(0,nivScroll);
        checkVisible(nivScroll);
        if (nivScroll<1000){
            animarPortada(nivScroll);
            return;
        }
        if (nivScroll<1500){
            animarcards(nivScroll);
        }
        if (nivScroll>1300)
            animarSlider(nivScroll);
        if (nivScroll>1500)
            animarCalendar(nivScroll);
        if (nivScroll>1800)
            animarComents(nivScroll);
}

let nivScroll=0;
function scrollea(e){
    let cant=102;
    if(nivScroll>=1000 && nivScroll<1100)
        cant=102;
    if (nivScroll>=750)
        cant=20;
    if (e.deltaY>0)
        nivScroll+=cant;
    else
        nivScroll-=cant;
    if (nivScroll<0)
        nivScroll=0;
    window.scrollTo(0,nivScroll);
    checkVisible(nivScroll);
    if (nivScroll<1000){
        animarPortada(nivScroll);
        return;
    }
    if (nivScroll<1500){
        animarcards(nivScroll);
    }
    if (nivScroll>1300)
        animarSlider(nivScroll);
    if (nivScroll>1500)
        animarCalendar(nivScroll);
    if (nivScroll>1800)
        animarComents(nivScroll);
}    
//#region animacion_portada
function animarPortada(scroll){
    if (scroll<800)
        portada.style.left=0;
    if (scroll<700){
        portada.removeEventListener("mousemove", animarKillBill);
        l8.style.animation="";
    }
    regresiva.style.visibility="hidden";
    portada.style.top=scroll+"px";
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
            l7.style.top="calc(80vw/3.3)";
            l7.style.backgroundSize="100%";
            l7.style.left=0;
        }
        if (scroll>200&&scroll<300){//desaparecen
            l7.style.opacity=0;
        }
        if (scroll>300&&scroll<500){//Avanzan
            l7.style.opacity=1;
            l7.style.backgroundSize="20%";
            l7.style.top="calc(80vw/2.35)";
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
        if (scroll>800){
            portada.style.left=scroll*0.5-406+"%";
        }
    }
}

function animarKillBill(e){
    let ancho=window.innerWidth;
    l6d.style.visibility="hidden";
    l6d.style.opacity="0";
    let posx=((100/(ancho*0.9)) * e.offsetX)*0.2;
    l8.style.transform="translateY("+posx*(-1)+"px)";
    l9.style.transform="translateY("+posx+"px)";
    if (posx>12){
        l8.style.animation="bloodyKill 1s infinite";
    }
    else{
        l8.style.animation="";
    }
}
//#endregion animacion_portada

function animarcards(scroll){
    cards.style.top=scroll+25+"px";
    if (scroll>1100){
        cards.style.marginLeft=(scroll*0.28)-314+"%";
    }
}

function animarSlider(scroll){
    if (scroll<1500)
        slider.style.top=(-3*scroll)+6000+"px";
    else{
        slider.style.top=scroll+"px";
        slider.style.left="0%";
    }    
    if (scroll>1550 && scroll<1700){
        slider.style.left=(scroll*0.8)-1240+"%";
    }
}

function animarCalendar(scroll){
    if (scroll<1700)
        calendar.style.top=(-8*scroll)+15300+"px";
    else{
        calendar.style.top=scroll+25+"px";
        calendar.style.left="0%";
    }
    if (scroll>1750 && scroll<1900){
        calendar.style.left=(scroll*0.8)-1400+"%";
    }
}

function animarComents(scroll){
    
    if (scroll<1900){
        comentarios.style.top=(-11*scroll)+22800+"px";
        let giro=(3.6*scroll)-6480;
        comentarios.style.transform=`rotateZ(${giro}deg)`;
    }
    else{
        comentarios.style.transform=`rotateZ(0deg)`;
        comentarios.style.top=scroll+25+"px";
    }
}

function animarForm(){
    for (let i=1; i<comentarios.children[0].children.length;i+=2){
        comentarios.children[0].children[i].style.transition="margin-left 1s";    
        comentarios.children[0].children[i].style.marginLeft="-150%";

    }
    for (let i=2; i<comentarios.children[0].children.length;i+=2){
        comentarios.children[0].children[i].style.transition="margin-left 1s";    
        comentarios.children[0].children[i].style.marginLeft="150%";
    }
    setTimeout(function(){
        let enviado=document.querySelector(".sentSucces");
        enviado.style.display="block";
        enviado.style.marginLeft="25%";
        enviado.style.top="25%";
    }, 500);
}

function nuevoMensaje(){
    for (let i=1; i<comentarios.children[0].children.length;i+=2){
        comentarios.children[0].children[i].style.marginLeft="0%";
    }
    for (let i=2; i<comentarios.children[0].children.length;i+=2){
        comentarios.children[0].children[i].style.marginLeft="0%";
    }
    let enviado=document.querySelector(".sentSucces");
    enviado.style.display="none";
    setTimeout(function(){
        for (let i=1; i<comentarios.children[0].children.length;i++)
            comentarios.children[0].children[i].style.transition="font-size .4s linear";
    }, 1000);
}

function checkVisible(sy){
    if (sy<1000){//portada
        portada.style.opacity="1";
        portada.style.display="block";
        cards.style.opacity="0";
        cards.style.display="none";
        slider.style.opacity="0";
        slider.style.display="none";
        calendar.style.opacity="0";
        calendar.style.display="none";
        comentarios.style.opacity="0";
        comentarios.style.display="none";
    }
    if (sy<1500&&sy>=1000){//cards
        portada.style.transition="opacity ease-out 1s";
        portada.style.opacity="0";
        portada.style.display="none";
        cards.style.opacity="1";
        cards.style.display="block";
        slider.style.opacity="0";
        slider.style.display="none";
        calendar.style.opacity="0";
        calendar.style.display="none";
        comentarios.style.opacity="0";
        comentarios.style.display="none";
        if (sy>1300){
            slider.style.opacity="1";    
            slider.style.display="block";
        }
    }
    if (sy>=1500){//slider
        slider.style.opacity="1";
        slider.style.display="block";
        portada.style.opacity="0";
        portada.style.display="none";
        cards.style.opacity="0";
        cards.style.display="none";
        calendar.style.opacity="0";
        calendar.style.display="none";
        if (sy>1600){
            calendar.style.opacity="1";
            calendar.style.display="block";
        }
    }
    if (sy>=1700){//Calendar
        slider.style.opacity="0";    
        slider.style.display="none";
        portada.style.opacity="0";
        portada.style.display="none";
        cards.style.opacity="0";
        cards.style.display="none";
        calendar.style.opacity="1";
        calendar.style.display="block";
        comentarios.style.opacity="0";
        comentarios.style.display="none";
        if (sy>1800){
            comentarios.style.opacity="1";
            comentarios.style.display="block";
        }
    }
    if (sy>=1900){//comments
        slider.style.opacity="0";    
        slider.style.display="none";
        portada.style.opacity="0";
        portada.style.display="none";
        cards.style.opacity="0";
        cards.style.display="none";
        calendar.style.opacity="0";
        calendar.style.display="none";
        comentarios.style.opacity="1";
        comentarios.style.display="block";
    }
    if (sy>2200){
        slider.style.opacity="0";
        slider.style.display="none";
        portada.style.opacity="0";
        portada.style.display="none";
        cards.style.opacity="0";
        cards.style.display="none";
        calendar.style.opacity="0";
        calendar.style.display="none";
        comentarios.style.opacity="0";
        comentarios.style.display="none";
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
    cLay1.style.backgroundImage=`url(./img/carrusel/${ant}.jpg)`;
    cLay2.style.backgroundImage=`url(./img/carrusel/${posCarru}.jpg)`;
    cLay3.style.backgroundImage=`url(./img/carrusel/${sig}.jpg)`;
}

});