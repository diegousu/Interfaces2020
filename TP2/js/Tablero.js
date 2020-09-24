class Tablero{
    constructor(filas, columnas, espaciado, context, imgfondo, imgtapa){
        this.filas=filas;
        this.columnas=columnas;
        this.espaciado=espaciado;
        this.ctx=context;
        this.imgfondo=imgfondo;
        this.imgtapa=imgtapa;
        // this.imgiz=imgiz;
        // this.imgde=imgde;
        this.matrizJuego=new Array();        
        for (let i=0; i<this.filas;i++){
            this.matrizJuego[i]=new Array();
            for (let j=0; j<this.columnas;j++){
                this.matrizJuego[i][j]=0;
            }
        }
    }

    makeJugada(x,y, jugador){
        let pos=this.getPosicion(x,y);
        if (pos.x>=0&&pos.x<this.columnas){
            if (this.checkColumna(pos.x)){
                let posFinal=this.getPosJugada(pos.x);
                this.matrizJuego[posFinal.y][posFinal.x]=jugador;
                return {exito:true, x:posFinal.x, y:posFinal.y}
            }
            else
                return {exito:false, x:-1, y:-1}
        }
        else
            return {exito:false, x:-2, y:-2};
    }

    checkColumna(x){
        return (this.matrizJuego[0][x]==0);
    }
    
    getPosicion(x,y){
        return ({x:Math.floor(x/this.espaciado.horizontal)-1,y:Math.floor(y/this.espaciado.vertical)});
    }
    
    getPosJugada(x){
        let i=0;
        while (this.matrizJuego[i][x]==0 && i<this.filas-1)
            i++;
            if (this.matrizJuego[i][x]!=0)
                i--;
        return ({x:x,y:i});
    }
    
    drawBack(){
        ctx.fillStyle="black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        let esp=this.espaciado.horizontal;
        for (let i=0;i<this.columnas;i++){
            for (let j=0;j<this.filas;j++){
                this.ctx.drawImage(this.imgfondo,esp+(esp*i),esp*j,esp,esp);
            }
        }
        //this.drawGrid();
    }

    drawCover(){
        let esp=this.espaciado.horizontal;
        for (let i=0;i<this.columnas;i++){
            for (let j=0;j<this.filas;j++){
                this.ctx.drawImage(this.imgtapa,esp+(esp*i),esp*j,esp,esp);
            }
        }
    }

    drawGrid(){
        let ctx=this.ctx;    
        ctx.beginPath();
        ctx.lineWidth=1;
        ctx.lineJoin = 'bevel';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'lightgrey';
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

    dibujarJugada(x){
        let pos=this.getPosicion(x,0);
        let context=this.ctx;
        if (pos.x>=0&&pos.x<this.columnas){
            if (this.checkColumna(pos.x)){
                let pintafila=this.getPosJugada(pos.x);
                let space=this.espaciado.horizontal;
                context.beginPath();
                context.arc(space+space*0.5+(space)*pintafila.x, space*0.5+space*pintafila.y, space*0.42, 0, 2 * Math.PI, false);
                context.fillStyle = "#00FF006A";
                context.fill();
                context.stroke();
            }
        }
    }
}