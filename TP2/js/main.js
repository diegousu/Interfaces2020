let canvas=document.querySelector("#canvas");
let ctx=canvas.getContext("2d");
let cargaTerminada=false;
cargarImgs();
let turno=document.querySelector("#turno");
let timer=document.querySelector("#timer");
let timer1;

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
        backupPos:0,
        tiempoJugada:0
    };


//Listeners
let botoninicio=document.querySelector("#btnIniciar");
    botoninicio.addEventListener("click", iniciarJuego);
    
function iniciarJuego(){
    if (cargaTerminada){
        botoninicio.removeEventListener("click", iniciarJuego);
        botoninicio.addEventListener("click", function(){location.reload()});
        let cantFilas=document.querySelector("#numFilas").value*1.0;
        let cantColumnas=document.querySelector("#numColumnas").value*1.0;
        document.querySelector("#tamTablero").classList.add("hidden");
        botoninicio.innerHTML="Reiniciar partida";
        canvas.classList.remove("hidden");
        juego.tiempoJugada=parseInt(document.querySelector("#tiempoJugada").value)
        if (juego.tiempoJugada!=0)
            timer.classList.remove("hidden");
        timer.classList.add("timer");
        let espacio;
        if (cantFilas<cantColumnas){
            canvas.width=window.innerWidth*0.7;
            espacio=Math.floor(canvas.width/(cantColumnas+2));
            canvas.height=espacio*cantFilas;
        }
        else{
            canvas.height=window.innerHeight*0.9;
            espacio=Math.floor(canvas.height/cantFilas);
            canvas.width=espacio*(cantColumnas+2);
        }
        timer.width=espacio*(cantColumnas+2);
        //"Instanciado" del juego
        theresawinner=false;
        theresatie=false;
        juego.jugador=1;
        turno.innerHTML="Turno jugador "+juego.jugador;
        turno.style.color="blue";
        juego.filas=cantFilas;
        juego.columnas=cantColumnas;
        juego.cantFichas=juego.columnas*juego.filas;
        juego.espaciado=espacio;
        juego.tablero=new Tablero(juego.filas, juego.columnas, juego.espaciado, ctx, juego.imgs[2], juego.imgs[3], juego.imgs[4], juego.imgs[5]);
        canvas.addEventListener("mousedown", makeJugada);
        canvas.addEventListener("mousemove", actualizarPosMouse);
        generarFichas(juego.espaciado*0.5,1,canvas.width-(juego.espaciado*0.5),2);
        draw();
        if (juego.tiempoJugada>0)
            timer1=setInterval(timerfunc, 1000);
    }
    else 
        botoninicio.innerHTML="Cargando imágenes";
}



function makeJugada(e){
    let x=e.offsetX; let y=e.offsetY;
    let ficha=buscarFicha(x,y, juego.jugador);
    if (ficha>=0){//Encontró ficha para mover
        juego.fichaSelec=ficha;
        juego.backupPos=juego.fichas[ficha].getPosicion();
        canvas.addEventListener("mousemove", moverficha);
        canvas.addEventListener("mouseup", checkJugada);
    }
}

function cambiarJugador(){
    if (juego.jugador==1){
        juego.jugador=2;
        turno.style.color="red";
    }
    else{
        juego.jugador=1;
        turno.style.color="blue";
    }
    if (juego.tiempoJugada>0){
        clearInterval(timer1);
        timer.style.backgroundColor="black";
        timer.width=canvas.width;
        timer.style.width=timer.width+"px";
        timer1=setInterval(timerfunc, 1000);
    }
    turno.innerHTML="Turno jugador "+juego.jugador;
}

function dibujarFichas(){
    for(let i=0;i<juego.fichas.length;i++){
        juego.fichas[i].draw();
    }
}

function draw(){
    juego.tablero.drawBack(juego.jugador);
    dibujarFichas();
    juego.tablero.drawCover();
}

function drawFichasArriba(){
    juego.tablero.drawBack(juego.jugador);
    juego.tablero.drawCover();
    juego.tablero.dibujarJugada(juego.mousePosX);
    dibujarFichas();
    turno.innerHTML="Turno jugador "+juego.jugador;
}

function buscarFicha(x,y){
    for (let i=juego.fichas.length-1;i>=0;i--){
        if (juego.fichas[i].getJugador()==juego.jugador){
            if (juego.fichas[i].isSelected(x,y)){
                if (!juego.fichas[i].isUsada()){
                    let temp=juego.fichas[juego.fichas.length-1]
                    juego.fichas[juego.fichas.length-1]=juego.fichas[i]
                    juego.fichas[i]=temp;
                    return juego.fichas.length-1;
                }
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
    drawFichasArriba();
}

function checkJugada(){
    if (juego.fichaSelec!=null){
        let jugada=juego.tablero.makeJugada(juego.mousePosX, juego.mousePosY, juego.jugador);
        if (jugada.exito){
            juego.fichas[juego.fichaSelec].setUsada();
            let nuevapos={x:juego.espaciado+juego.espaciado/1.98+(jugada.x*juego.espaciado), y:juego.espaciado/1.98+(jugada.y)*(juego.espaciado)};
            juego.fichas[juego.fichaSelec].setPosicion(nuevapos.x, nuevapos.y);
            if (juego.tablero.checkJugada(jugada.y,jugada.x,juego.jugador)){
                turno.innerHTML="¡Ganó Jugador "+juego.jugador+"!";
                canvas.removeEventListener("mousedown", makeJugada);
                theresawinner=true;
            }
            else{
                if (juego.tablero.contarFichas()==juego.cantFichas)//empate
                    theresatie=true;
                else
                    cambiarJugador();
            }
        }
        else
            juego.fichas[juego.fichaSelec].setPosicion(juego.backupPos.x,juego.backupPos.y);
        juego.backupPos=0;
        juego.fichaSelec=null;
        canvas.removeEventListener("mousemove", moverficha);
        canvas.removeEventListener("mouseup", checkJugada);
        draw();
        if (theresawinner){
            if (juego.tiempoJugada>0)
                clearInterval(timer1);
            timer.classList.add("hidden");
            juego.tablero.dibujarTrofeo(juego.jugador);
            juego.tablero.pintarJugadaGanadora(jugada.y, jugada.x, juego.jugador);
        }
        if (theresatie){
            if (juego.tiempoJugada>0)
                clearInterval(timer1);
            timer.classList.add("hidden");
            turno.style.color="black"
            turno.innerHTML="Juego Empatado";
            canvas.removeEventListener("mousedown", makeJugada);
            juego.tablero.drawGris();
        }
    }
}



//HELPERS

function actualizarPosMouse(e){
    juego.mousePosX=e.offsetX;
    juego.mousePosY=e.offsetY;
}

function generarFichas(posx1, jugador1, posx2, jugador2){
    juego.fichas=new Array();
    for (let i=0;i<Math.ceil(juego.cantFichas/2)+2;i++){
        let posy=(juego.espaciado/2)+Math.round(Math.random()*(juego.espaciado*(juego.filas-1.5)));
        juego.fichas.push(new Ficha(ctx, jugador1, juego.espaciado, posx1, posy, juego.imgs[0]));
    }
    
    for (let i=Math.ceil(juego.cantFichas/2);i<juego.cantFichas+2;i++){
        let posy=(juego.espaciado/2)+Math.round(Math.random()*(juego.espaciado*(juego.filas-1.5)));
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
                                let trofeo=new Image();
                                trofeo.src="./img/trofeo.png";
                                trofeo.onload=function(){
                                    juego.imgs.push(trofeo);
                                    let loose=new Image();
                                    loose.src="./img/looser.png";
                                    loose.onload=function(){
                                    juego.imgs.push(loose);
                                    cargaTerminada=true;
                                    botoninicio.innerHTML="Iniciar Juego";
                                }
                                }
                            }
                        }
                }
        }
}

function timerfunc(){
    let bloque=canvas.width/juego.tiempoJugada;
    timer.width-=bloque;
    timer.style.width=timer.width+"px";
    if (timer.width<(canvas.width/3))
        timer.style.backgroundColor="red";
    if (timer.width<=0){
        if (juego.fichaSelec!=null){
            juego.fichas[juego.fichaSelec].setPosicion(juego.backupPos.x,juego.backupPos.y);
            juego.backupPos=0;
            juego.fichaSelec=null;
            canvas.removeEventListener("mousemove", moverficha);
            canvas.removeEventListener("mouseup", checkJugada);
            cambiarJugador();
            draw();
        }
        else{
            cambiarJugador();
            draw();
        }
    }
}