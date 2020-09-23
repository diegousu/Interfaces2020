class Tablero{
    constructor(filas, columnas, espaciado, context){
        this.filas=filas*1.0;
        this.columnas=columnas*1.0;
        this.espaciado=espaciado;
        this.ctx=context;
        this.matrizJuego=new Array();        
        for (let i=0; i<this.filas;i++){
            this.matrizJuego[i]=new Array();
            for (let j=0; j<this.columnas;j++){
                this.matrizJuego[i][j]=0;
            }
        }
    }

    // let fondo=new Image();
    // fondo.src="img/back.jpg";
    // fondo.onload=function () {
    //     ctx.drawImage(fondo,0,0,canvas.width, canvas.height);
    // }

    makejugada(x,y,jugador){
        let pos=this.getPosicion(x,y);
        if (this.checkColumna(pos.x)){
            let posdibujo=getPosJugada(pos.x);
            let imagen=img1;
            if (jugador==2)
            imagen=img2;
            ctx.drawImage(imagen,posdibujo.x+1,posdibujo.y+1,espaciado.horizontal-2,espaciado.vertical-2);
            let posfinal=getPosicion(posdibujo.x,posdibujo.y);
            juego[posfinal.y][posfinal.x]=jugador;
        }
    }

    checkColumna(x){
        return (this.matrizJuego[0][x]==0);
    }
    
    getPosicion(x,y){
        return ({x:Math.floor(x/this.espaciado.horizontal),y:Math.floor(y/this.espaciado.vertical)});
    }
    
    getPosJugada(x){
        let i=0;
        while (this.matrizJuego[i][x]==0 && i<this.filas-1)
            i++;
            if (this.matrizJuego[i][x]!=0)
            i--;
        return ({x:x*this.espaciado.horizontal,y:i*this.espaciado.vertical});
    }
    
    draw(){
        this.drawGrid();
    }

    drawGrid(){
        let ctx=this.ctx;    
        ctx.fillStyle="white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.lineWidth=1;
        ctx.lineJoin = 'bevel';
        ctx.lineCap = 'round';
        ctx.strokeStyle = "black";
        for (let i=0;i<=this.columnas+1;i++){
            ctx.beginPath();
            ctx.moveTo(this.espaciado.horizontal+(this.espaciado.horizontal*i),0);
            ctx.lineTo(this.espaciado.horizontal+(this.espaciado.horizontal*i),this.espaciado.vertical*this.filas);
            ctx.stroke();
        }
        for (let j=0;j<=this.filas;j++){
            ctx.beginPath();
            ctx.moveTo(this.espaciado.horizontal,this.espaciado.vertical+(this.espaciado.vertical*j));
            ctx.lineTo(this.espaciado.horizontal*this.columnas+this.espaciado.horizontal,this.espaciado.vertical+(this.espaciado.vertical*j));
            ctx.stroke();
        }
    }
}