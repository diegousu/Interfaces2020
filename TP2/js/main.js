let canvas=document.querySelector("#canvas");
let ctx=canvas.getContext("2d");
let juego;
let imgs=new Array();
cargarImgs();
//Listeners
let botoninicio=document.querySelector("#btnIniciar");
    botoninicio.addEventListener("click", iniciarJuego);

    
    function iniciarJuego(){
        let cantFilas=document.querySelector("#numFilas").value;
        let cantColumnas=document.querySelector("#numColumnas").value;
        document.querySelector("#tamTablero").classList.add("hidden");
        botoninicio.innerHTML="Reiniciar partida";
        canvas.classList.remove("hidden");
        canvas.width=128*(cantColumnas*1.0+2);
    canvas.height=128*cantFilas;
    let espaciado={horizontal:Math.floor((canvas.width-256)/cantColumnas), vertical:Math.floor(canvas.height/cantFilas)};
    juego=new Juego(ctx, cantFilas, cantColumnas, espaciado, canvas, imgs);
    canvas.addEventListener("mousedown", juego.makeJugada);
    canvas.addEventListener("mousemove", juego.actualizarPosMouse);
}

function cargarImgs(){
    let ficha1=new Image();
        ficha1.src="./img/ficha1.png";
        ficha1.onload=function(){
            imgs.push(ficha1);
            let ficha2=new Image();
                ficha2.src="./img/ficha2.png";
                ficha2.onload=function(){
                    imgs.push(ficha2);
                }
        }
}