let canvas=document.querySelector("#canvas");
let ctx=canvas.getContext("2d");
cargarImgs();
let turno=document.querySelector("#turno");

let juego={
    filas:0,
        columnas:0,
        espaciado:0,
        jugador:null,
        imgs:new Array(),
        fichaSelec:null,
        tablero:0,
        cantFichas:0,
        fichas:new Array(),
        cantFichas:0,
        mousePosX:0,
        mousePosY:0,
        backupPos:0
    };


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
        //"Instanciado" del juego
        juego.jugador=1;
        juego.filas=cantFilas*1.0;
        juego.columnas=cantColumnas*1.0;
        juego.cantFichas=juego.columnas*juego.filas;
        juego.espaciado=espaciado;
        juego.tablero=new Tablero(juego.filas, juego.columnas, juego.espaciado, ctx, juego.imgs[2], juego.imgs[3]);
        canvas.addEventListener("mousedown", makeJugada);
        canvas.addEventListener("mousemove", actualizarPosMouse);
        generarFichas(juego.espaciado.horizontal*0.5,1,canvas.width-(juego.espaciado.horizontal*0.5),2);
        draw();
}



function makeJugada(e){
    let x=e.offsetX; let y=e.offsetY;
    let ficha=buscarFicha(x,y, juego.jugador);
    if (ficha>=0){//Encontró ficha para mover
        juego.fichaSelec=ficha;
        juego.backupPos=juego.fichas[ficha].getPosicion();
        canvas.addEventListener("mousemove", moverficha);
        canvas.addEventListener("mousemove", dibujarJugada);
        canvas.addEventListener("mouseup", checkJugada);
    }
    else
        console.log("Eligio ficha equivocada, ninguna o usada");
}

function cambiarJugador(){
    if (juego.jugador==1)
        juego.jugador=2;
    else juego.jugador=1;
}

function dibujarFichas(){
    for(let i=0;i<juego.fichas.length;i++){
        juego.fichas[i].draw();
    }
}

function draw(){
    juego.tablero.drawBack();
    juego.tablero.drawCover();
    dibujarFichas();
    turno.innerHTML="Turno jugador "+juego.jugador;
}

function buscarFicha(x,y){
    for (let i=juego.fichas.length-1;i>=0;i--){
        if (juego.fichas[i].getJugador()==juego.jugador){
            if (juego.fichas[i].isSelected(x,y)){
                if (!juego.fichas[i].isUsada())
                    return i;
                else
                    return -2;//Ficha usada
            }
        }
    }
    return -1;
}

function moverficha(){
    let ficha=juego.fichaSelec;
    let posficha=juego.fichas[ficha].getPosicion;
    let x=juego.mousePosX; let y=juego.mousePosY;
    juego.fichas[ficha].setPosicion(x,y);
    draw();
}

function checkJugada(){
    let jugada=juego.tablero.makeJugada(juego.mousePosX, juego.mousePosY, juego.jugador);
    if (jugada.exito){
        juego.fichas[juego.fichaSelec].setUsada();
        console.log(jugada.x+","+jugada.y);
        let nuevapos={x:juego.espaciado.horizontal+juego.espaciado.horizontal/2+(jugada.x*juego.espaciado.horizontal), y:juego.espaciado.horizontal/2+(jugada.y)*(juego.espaciado.vertical)};
        juego.fichas[juego.fichaSelec].setPosicion(nuevapos.x, nuevapos.y);
        cambiarJugador();
    }
    else
        juego.fichas[juego.fichaSelec].setPosicion(juego.backupPos.x,juego.backupPos.y);
    juego.backupPos=0;
    juego.fichaSelec=null;
    canvas.removeEventListener("mousemove", moverficha);
    canvas.removeEventListener("mousemove", dibujarJugada);
    canvas.removeEventListener("mouseup", checkJugada);
    draw();
}

function dibujarJugada(){
    juego.tablero.dibujarJugada(juego.mousePosX);
}






//HELPERS

function actualizarPosMouse(e){
    juego.mousePosX=e.offsetX;
    juego.mousePosY=e.offsetY;
}

function generarFichas(posx1, jugador1, posx2, jugador2){
    juego.fichas=new Array();
    for (let i=0;i<Math.ceil(juego.cantFichas/2);i++){
        let posy=(juego.espaciado.vertical/2)+Math.round(Math.random()*(juego.espaciado.vertical*(juego.filas-1.5)));
        juego.fichas.push(new Ficha(ctx, jugador1, juego.espaciado, posx1, posy, juego.imgs[0]));
    }
    
    for (let i=Math.ceil(juego.cantFichas/2);i<juego.cantFichas;i++){
        let posy=(juego.espaciado.vertical/2)+Math.round(Math.random()*(juego.espaciado.vertical*(juego.filas-1.5)));
        juego.fichas.push(new Ficha(ctx, jugador2, juego.espaciado, posx2, posy, juego.imgs[1]));
    }
}

function cargarImgs(){
    let ficha1=new Image();
        ficha1.src="./img/ficha1.png";
        ficha1.onload=function(){
            juego.imgs.push(ficha1);
            let ficha2=new Image();
                ficha2.src="./img/ficha2.png";
                ficha2.onload=function(){
                    juego.imgs.push(ficha2);
                    let fondo=new Image();
                        fondo.src="./img/fondo.png";
                        fondo.onload=function(){
                            juego.imgs.push(fondo);
                            let tapa=new Image();
                            tapa.src="./img/tapa.png";
                            tapa.onload=function(){
                                juego.imgs.push(tapa);
                            }
                        }
                }
        }
}