class Ficha{
    constructor(context, jugador, espaciado, posX, posY, img){
        this.ctx=context;
        this.jugador=jugador;
        this.espaciado=espaciado;
        this.usada=false;
        this.posX=posX;
        this.posY=posY;
        this.img=img;
    }

    getPosicion(){
        return {x:this.posX, y:this.posY};
    }
    
    setPosicion(x,y){
        this.posX=x;
        this.posY=y;
    }

    setUsada(){
        this.usada=true;
    }

    getEstado(){
        return this.usada;
    }

    getJugador(){
        return this.jugador;
    }

    draw() {
        this.ctx.drawImage(this.img,this.posX,this.posY, this.espaciado.horizontal-24,this.espaciado.vertical-24);
    }
    
    isSelected(x,y){
        let radio=this.espaciado.horizontal/2;
        let posx=this.posX+radio; let posy=this.posY+radio;
        let longLinea=Math.sqrt(Math.pow(x-posx,2)+Math.pow(y-posy,2));
        return longLinea<=radio;
    }

}