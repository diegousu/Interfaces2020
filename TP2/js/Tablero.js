class Tablero{
    constructor(filas, columnas, espaciado, context, imgfondo, imgtapa, imgtrofeo, imgloose){
        this.filas=filas;
        this.columnas=columnas;
        this.espaciado=espaciado;
        this.ctx=context;
        this.imgfondo=imgfondo;
        this.imgtapa=imgtapa;
        this.imgtrofeo=imgtrofeo;
        this.imgloose=imgloose;
        this.matrizJuego=new Array();        
        for (let i=0; i<this.filas;i++){
            this.matrizJuego[i]=new Array();
            for (let j=0; j<this.columnas;j++){
                this.matrizJuego[i][j]=0;
            }
        }
        this.winner=null;
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
        return ({x:Math.floor(x/this.espaciado)-1,y:Math.floor(y/this.espaciado)});
    }
    
    getPosJugada(x){
        let i=0;
        while (this.matrizJuego[i][x]==0 && i<this.filas-1)
            i++;
        if (this.matrizJuego[i][x]!=0)
            i--;
        return ({x:x,y:i});
    }
    
    
    drawBack(jugador){
        ctx.fillStyle="lightgrey";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="#00FF006A";
        if (jugador==1){
            ctx.fillRect(0,0,this.espaciado,canvas.height);
        }
        else{
            ctx.fillRect(this.espaciado*(this.columnas+1),0,this.espaciado+10,canvas.height);
        }
        let esp=this.espaciado;
        this.ctx.drawImage(this.imgfondo,esp,0,esp*this.columnas,esp*this.filas);
    }

    drawCover(){
        let esp=this.espaciado;
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
            ctx.moveTo(this.espaciado+(this.espaciado*i),0);
            ctx.lineTo(this.espaciado+(this.espaciado*i),this.espaciado*this.filas);
            ctx.stroke();
        }
        for (let j=0;j<=this.filas;j++){
            ctx.beginPath();
            ctx.moveTo(this.espaciado,this.espaciado+(this.espaciado*j));
            ctx.lineTo(this.espaciado*this.columnas+this.espaciado,this.espaciado+(this.espaciado*j));
            ctx.stroke();
        }
    }

    dibujarJugada(x){
        let pos=this.getPosicion(x,0);
        let context=this.ctx;
        if (pos.x>=0&&pos.x<this.columnas){
            if (this.checkColumna(pos.x)){
                let pintafila=this.getPosJugada(pos.x);
                let space=this.espaciado;
                context.beginPath();
                context.arc(space+space*0.5+(space)*pintafila.x, space*0.5+space*pintafila.y, space*0.42, 0, 2 * Math.PI, false);
                context.fillStyle = "#00FF006A";
                context.fill();
                context.stroke();
            }
        }
    }

    checkJugada(fila, columna, jugador){//Cada primer llamado cuenta su ficha
        let cant = this.checkVertical(fila, columna, jugador);
        if (cant==4){
            this.winner="vertical";
            return true;
        }
        cant = this.checkHorizontal(fila, columna, jugador);
        if (cant==4){
            this.winner="horizontal";
            return true;
        }
        cant = this.checkdiagonal1(fila, columna, jugador);//Diagonal que va de izquierda a derecha
        if (cant==4){
            this.winner="diagonal1";
            return true;
        }
        cant = this.checkdiagonal2(fila, columna, jugador);//Diagonal que va de derecha a izquierda 
            if (cant==4){
                this.winner="diagonal2";
                return true;
            }
        return false;
    }

    checkVertical(fila, columna, jugador){
        let cant=0;
        cant+=this.checkUp(fila, columna, jugador);
        cant+=this.checkDn(fila+1, columna, jugador);
        return cant;
    }
        checkUp(fila, columna, jugador){
            if (fila>=0){
                if (this.matrizJuego[fila][columna]==jugador)
                    return this.checkUp(fila-1, columna, jugador)+1;
                else return 0;
            }
            else return 0;
        }
        checkDn(fila, columna, jugador){
            if (fila<this.filas){
                if (this.matrizJuego[fila][columna]==jugador)
                    return this.checkDn(fila+1, columna, jugador)+1;
                else return 0;
            }
            else return 0;
        }
         

    checkHorizontal(fila, columna, jugador){
        let cant=0;
        cant+=this.checkIz(fila, columna, jugador);
        cant+=this.checkDer(fila, columna+1, jugador);
        return cant;
    }
        checkIz(fila, columna, jugador){
            if (columna>=0){
                if (this.matrizJuego[fila][columna]==jugador)
                    return this.checkIz(fila, columna-1, jugador)+1;
                else return 0;
            }
            else return 0;
        }
        checkDer(fila, columna, jugador){
            if (columna<this.columnas){
                if (this.matrizJuego[fila][columna]==jugador)
                    return this.checkDer(fila, columna+1, jugador)+1;
                else return 0;
            }
            else return 0;
        }

    checkdiagonal1(fila, columna, jugador){
        let cant=0;
        cant+=this.checkD1Up(fila, columna, jugador);
        cant+=this.checkD1Dn(fila+1, columna+1, jugador);
        return cant;
    }
        checkD1Up(fila, columna, jugador){
            if (fila>=0&&columna>=0){
                if (this.matrizJuego[fila][columna]==jugador)
                    return this.checkD1Up(fila-1, columna-1, jugador)+1;
                else return 0;
            }
            else return 0;
        }
        checkD1Dn(fila, columna, jugador){
            if (fila<this.filas&&columna<this.columnas){
                if (this.matrizJuego[fila][columna]==jugador)
                    return this.checkD1Dn(fila+1, columna+1, jugador)+1;
                else return 0;
            }
            else return 0;
        }

    checkdiagonal2(fila, columna, jugador){
        let cant=0;
        cant+=this.checkD2Up(fila, columna, jugador);
        cant+=this.checkD2Dn(fila+1, columna-1, jugador);
        return cant;
    }
        checkD2Up(fila, columna, jugador){
            if (fila>=0&&columna<this.columnas){
                if (this.matrizJuego[fila][columna]==jugador)
                    return this.checkD2Up(fila-1, columna+1, jugador)+1;
                else return 0;
            }
            else return 0;
        }
        checkD2Dn(fila, columna, jugador){
            if (fila<this.filas&&columna>=0){
                if (this.matrizJuego[fila][columna]==jugador)
                    return this.checkD2Dn(fila+1, columna-1, jugador)+1;
                else return 0;
            }
            else return 0;
        }

    dibujarTrofeo(jugador){
        if (jugador==1){
            ctx.fillStyle="lightgrey";
            ctx.fillRect(this.espaciado*(this.columnas+1),0,this.espaciado+10,canvas.height);
            ctx.drawImage(this.imgloose,this.espaciado*(this.columnas+1),(this.espaciado*this.filas)/2-this.espaciado/2,this.espaciado,this.espaciado);
            let grd = this.ctx.createLinearGradient(0, 0, this.espaciado, this.espaciado*this.filas);
            grd.addColorStop(0, "lightblue");
            grd.addColorStop(0.5, "white");
            grd.addColorStop(1, "lightblue");
            this.ctx.fillStyle=grd;
            this.ctx.fillRect(0,0,this.espaciado,canvas.height);
            this.ctx.drawImage(this.imgtrofeo,0,(this.espaciado*this.filas)/2-this.espaciado/2,this.espaciado,this.espaciado);
        }
        else{
            ctx.fillStyle="lightgrey";
            ctx.fillRect(0,0,this.espaciado,canvas.height);
            this.ctx.drawImage(this.imgloose,0,(this.espaciado*this.filas)/2-this.espaciado/2,this.espaciado,this.espaciado);
            let grd = this.ctx.createLinearGradient(this.espaciado*(this.columnas+1), 0, this.espaciado*(this.columnas+2), this.espaciado*this.filas);
            grd.addColorStop(0, "lightblue");
            grd.addColorStop(0.5, "white");
            grd.addColorStop(1, "lightblue");
            this.ctx.fillStyle=grd;
            ctx.fillRect(this.espaciado*(this.columnas+1),0,this.espaciado+10,canvas.height);
            ctx.drawImage(this.imgtrofeo,this.espaciado*(this.columnas+1),(this.espaciado*this.filas)/2-this.espaciado/2,this.espaciado,this.espaciado);
        }
    }
    pintarJugadaGanadora(fila, columna, jugador){
        if (this.winner!=null){
            if (this.winner=="horizontal")
                this.pintarHorizontal(fila, columna, jugador);
            if (this.winner=="vertical")
                this.pintarVertical(fila, columna, jugador);
            if (this.winner=="diagonal1")
                this.pintarD1(fila, columna, jugador);
            if (this.winner=="diagonal2")
                this.pintarD2(fila, columna, jugador);
        }
    }

    pintarVertical(fila, columna, jugador){
        this.pintarUp(fila, columna, jugador);
        this.pintarDn(fila+1, columna, jugador);
    }
        pintarUp(fila, columna, jugador){
            if (fila>=0){
                if (this.matrizJuego[fila][columna]==jugador){
                    this.pintarCelda(fila, columna)
                    this.checkUp(fila-1, columna, jugador)+1;
                }
            }
        }
        pintarDn(fila, columna, jugador){
            if (fila<this.filas){
                if (this.matrizJuego[fila][columna]==jugador){
                    this.pintarCelda(fila, columna);
                    this.pintarDn(fila+1, columna, jugador)+1;
                }
            }
        }
         

    pintarHorizontal(fila, columna, jugador){
        this.pintarIz(fila, columna, jugador);
        this.pintarDer(fila, columna+1, jugador);
    }
        pintarIz(fila, columna, jugador){
            if (columna>=0){
                if (this.matrizJuego[fila][columna]==jugador){
                    this.pintarCelda(fila, columna);
                    this.pintarIz(fila, columna-1, jugador)+1;
                }
            }
        }
        pintarDer(fila, columna, jugador){
            if (columna<this.columnas){
                if (this.matrizJuego[fila][columna]==jugador){
                    this.pintarCelda(fila, columna);
                    this.pintarDer(fila, columna+1, jugador)+1;
                }
            }
        }

    pintarD1(fila, columna, jugador){
        this.pintarD1Up(fila, columna, jugador);
        this.pintarD1Dn(fila+1, columna+1, jugador);
    }
        pintarD1Up(fila, columna, jugador){
            if (fila>=0&&columna>=0){
                if (this.matrizJuego[fila][columna]==jugador){
                    this.pintarCelda(fila, columna);
                    this.pintarD1Up(fila-1, columna-1, jugador)+1;
                }
            }
        }
        pintarD1Dn(fila, columna, jugador){
            if (fila<this.filas&&columna<this.columnas){
                if (this.matrizJuego[fila][columna]==jugador){
                    this.pintarCelda(fila, columna);
                    this.pintarD1Dn(fila+1, columna+1, jugador)+1;
                }
            }
        }

    pintarD2(fila, columna, jugador){
        this.pintarD2Up(fila, columna, jugador);
        this.pintarD2Dn(fila+1, columna-1, jugador);
    }
        pintarD2Up(fila, columna, jugador){
            if (fila>=0&&columna<this.columnas){
                if (this.matrizJuego[fila][columna]==jugador){
                    this.pintarCelda(fila, columna);
                    this.pintarD2Up(fila-1, columna+1, jugador)+1;
                }
            }
        }
        pintarD2Dn(fila, columna, jugador){
            if (fila<this.filas&&columna>=0){
                if (this.matrizJuego[fila][columna]==jugador){
                    this.pintarCelda(fila, columna);
                    this.pintarD2Dn(fila+1, columna-1, jugador)+1;
                }
            }
        }

    pintarCelda(fila, columna){
        let context=this.ctx;
        let space=this.espaciado;
        context.beginPath();
        context.arc(space+space*0.5+(space)*columna, space*0.5+space*fila, space*0.42, 0, 2 * Math.PI, false);
        context.fillStyle = "#00FF00EE";
        context.fill();
        context.stroke();
    }

    contarFichas(){
        let cant=0;
        for(let fila=0;fila<this.filas;fila++){
            for (let columna=0;columna<this.columnas;columna++){
                if (this.matrizJuego[fila][columna]!=0)
                    cant++;
            }
        }
        return cant;
    }

    drawGris(){
        this.ctx.fillStyle="lightgrey";
        this.ctx.fillRect(0,0,this.espaciado,canvas.height);
        this.ctx.fillRect(this.espaciado*(this.columnas+1),0,this.espaciado+10,canvas.height);
    }

}