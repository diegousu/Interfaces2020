class Ficha{
    constructor(context, jugador, espaciado, posX, posY, img){
        this.ctx=context;
        this.jugador=jugador;
        this.espaciado=espaciado;
        this.usada=false;
        this.posX=posX;
        this.posY=posY;
        this.img=img;
        this.escalado=this.espaciado*0.18;
        this.offset={x:0,y:0};
        this.radio=(this.espaciado/2)-(this.escalado/2);
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

    isUsada(){
        return this.usada;
    }

    getJugador(){
        return this.jugador;
    }

    draw() {
        this.ctx.drawImage(this.img,this.posX-this.radio,this.posY-this.radio, this.espaciado-this.escalado,this.espaciado-this.escalado);
    }
    
    isSelected(x,y){
        let longLinea=Math.sqrt(Math.pow(x-this.posX,2)+Math.pow(y-this.posY,2));
        if (longLinea<=this.radio){
            return true;
        }
        else return false;
    }


}