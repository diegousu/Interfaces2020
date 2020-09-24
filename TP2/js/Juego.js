"use strict";
class Juego{
    constructor(context, filas, columnas, espaciado, canvas, imgs){
        this.context=context;
        this.filas=filas*1.0;
        this.columnas=columnas*1.0;
        this.espaciado=espaciado;
        this.jugador=1;
        this.canvas=canvas;
        this.mousePosX;
        this.mousePosY;
        this.imgs=imgs;
        this.fichaSelec=null;
        this.tablero=new Tablero(filas, columnas, espaciado, context);
        this.cantFichas=filas*columnas;
        //this.cantFichas=4;
        this.fichas=new Array();
        this.generarFichas(this.fichas,10,1,espaciado.horizontal*(columnas*1.0+1)+10,2);
        this.draw();
    }
    
    generarFichas(arreglo, posx1, jugador1, posx2, jugador2){
        for (let i=0;i<Math.ceil(this.cantFichas/2);i++){
            let posy=(this.espaciado.vertical/2)+Math.round(Math.random()*(this.espaciado.vertical*(this.filas-1.5)));
            arreglo.push(new Ficha(this.context, jugador1, this.espaciado, posx1, posy, this.imgs[0]));
        }
        
        for (let i=Math.ceil(this.cantFichas/2);i<this.cantFichas;i++){
            let posy=(this.espaciado.vertical/2)+Math.round(Math.random()*(this.espaciado.vertical*(this.filas-1.5)));
            arreglo.push(new Ficha(this.context, jugador2, this.espaciado, posx2, posy, this.imgs[1]));
        }
    }

    makeJugada=(e)=>{
        let x=this.mousePosX; let y=this.mousePosY;
        let ficha=this.buscarFicha(x,y, this.jugador);
        let self=this;
        if (ficha!=-1){
            //mover la ficha 
            this.fichaSelec=ficha;
            this.canvas.addEventListener("mousemove", ()=>{this.moverficha()});
            this.canvas.addEventListener("mouseup", ()=>{this.checkJugada()});
        }
        else
            console.log("Jugador eligio ficha equivocada o ninguna");
    }

    cambiarJugador(){
        if (this.jugador==1)
            this.jugador=2;
        else this.jugador=1;
    }

    dibujarFichas(){
        for(let i=0;i<this.fichas.length;i++){
            this.fichas[i].draw();
        }
    }

    draw(){
        this.tablero.draw();
        this.dibujarFichas();
    }

    buscarFicha(x,y){
        for (let i=this.fichas.length-1;i>=0;i--){
            if (this.fichas[i].getJugador()==this.jugador){
                if (this.fichas[i].isSelected(x,y))
                    return i;
            }
        }
        return -1;
    }

    actualizarPosMouse=(e)=>{
        this.mousePosX=e.offsetX;
        this.mousePosY=e.offsetY;
    }

    moverficha(){
        let ficha=this.fichaSelec;
        let posficha=this.fichas[ficha].getPosicion;
        let x=this.mousePosX; let y=this.mousePosY;
        this.fichas[ficha].setPosicion(x,y);
        this.draw();
    }
    
    checkJugada(){
        console.log("mouse up");
        let clone=this.canvas.cloneNode(true);
        this.canvas=clone;
        canvas.addEventListener("mousedown", ()=>{this.makeJugada});
    }
}
