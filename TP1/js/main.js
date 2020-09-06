let canvas= document.querySelector("#canvas");
let canvasito= document.querySelector("#canvasito");
let ctx=document.querySelector("#canvas").getContext("2d");
let minictx=document.querySelector("#canvasito").getContext("2d");
let posmouse = {x: 0, y: 0};
let input = document.querySelector('.input1');
let ancho=document.querySelector("#ancho");
let alto=document.querySelector("#alto");
let imgBack; let aplicoFiltro=false;
let herramienta="pincel";
actualizarCanvasito();
canvasBlanco();


//mini canvas preview
document.querySelector("#tamaño").addEventListener("change",actualizarCanvasito);
document.querySelector("#html5colorpicker").addEventListener("change",actualizarCanvasito);

ancho.addEventListener("change", updateCanvas);
alto.addEventListener("change", updateCanvas);
document.querySelector("#filtro").addEventListener("change",setFiltro);
document.querySelector("#parametro").addEventListener("change",setFiltro);
document.querySelector("#aplicar").addEventListener("click",aplicarFiltro);


canvas.addEventListener('mousemove', function(e) {
    posmouse.x = e.pageX - this.offsetLeft;
    posmouse.y = e.pageY - this.offsetTop;
  }, false);

canvas.addEventListener('mousedown', function(e) {
    cambiarherramienta();
    ctx.beginPath();
    canvas.addEventListener('mousemove', pintando, false);
    ctx.moveTo(posmouse.x, posmouse.y);
    ctx.lineWidth = document.querySelector("#tamaño").value;
    if (herramienta=="pincel"){
        ctx.lineJoin = 'bevel';
        ctx.lineCap = 'round';
        ctx.strokeStyle = document.querySelector("#html5colorpicker").value;
    }
    if (herramienta=="borrador"){
        ctx.lineJoin = 'bevel';
        ctx.lineCap = 'round';
        ctx.strokeStyle = "white";
    }
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', pintando, false);
    imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);//hace backup del canvas
    }, false);
 
let pintando = function() {
    ctx.lineTo(posmouse.x, posmouse.y);
    ctx.stroke();
    
};

document.querySelector("#nuevo").addEventListener("click", canvasBlanco);

function canvasBlanco(){
    canvas.width=ancho.value;
    canvas.height=alto.value;
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);//hace backup del canvas
}

function getCoords(){
    canvas.addEventListener("mousemove", dibujar);
}

function cambiarherramienta(){
    herramienta=document.querySelector("#herramienta").value;
}


function actualizarCanvasito(){
    minictx.fillStyle="white";
    minictx.fillRect(0,0,canvasito.width,canvasito.height);
    minictx.beginPath();
    minictx.fillStyle=document.querySelector("#html5colorpicker").value;
    minictx.beginPath();
    let size=document.querySelector("#tamaño").value;
    minictx.ellipse(canvasito.width/2, canvasito.height/2, size/2, size/2, 2*Math.PI, 0, 2 * Math.PI);
    minictx.fill();
}

//carga de imagen
input.onchange = e => {

    // getting a hold of the file reference
    let file = e.target.files[0];

    // setting up the reader
    let reader = new FileReader();
    reader.readAsDataURL(file); // this is reading as data url

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
        let content = readerEvent.target.result; // this is the content!

        image = new Image();
        image.src = content;

        image.onload = function () {
            canvas.width=this.width;
            canvas.height=this.height;
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
            imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);//hace backup del canvas
            ancho.value=this.width;
            alto.value=this.height;
        }
    }
    document.querySelector("#filtro").value="Ninguno";
}

//resize
function updateCanvas(){
    canvas.height=alto.value;
    canvas.width=ancho.value;
    ctx.putImageData(imgBack,0,0);
}


function download(){
    let download = document.getElementById("download");
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);

}

//FILTROS

function setFiltro(){
    let filtro=document.querySelector("#filtro").value;
    let desc="";
    if (filtro=="ninguno"){
        limpiarFiltro();
    }
    if (filtro=="negativo"){
        goNegative();
        desc="Invierte los colores de la imagen";
    }
    if (filtro=="sepia"){
        goSepia();
        desc="Genera tonos sepia en base a la escala de grises de la imagen";
    }
    if (filtro=="saturacion"){
        goSaturation();
        desc="Convierte la información RGB a HSL y aumenta la saturación </br> en proporción al parámetro seleccionado";
    }
    if (filtro=="brillo"){
        cambiarBrillo();
        desc="Aumenta el brillo de cada canal en proporción </br> al parámetro seleccionado";
    }
    if (filtro=="binarizacion"){
        goBinary();
        desc="El parámetro funciona como umbral a partir del cual </br>el pixel toma el valor del color elegido</br> o negro en caso de no superarlo.";
    }
    if (filtro=="sobel"){
        goSobel();
        //desc="El parámetro funciona como umbral a partir del cual </br>el pixel toma el valor del color elegido</br> o negro en caso de no superarlo.";
    }
    document.querySelector("#descripcion").innerHTML=desc;
    let slider= document.querySelector("#parametro");
    document.querySelector("#valorparam").innerHTML=Math.round(slider.value*100)+"%";
}

function goNegative(){
    if (aplicoFiltro)
        ctx.putImageData(imgBack,0,0);
    else{
        imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);//hace backup
    }
    let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
     for (y=0;y<canvas.height;y++){
        for (x=0;x<canvas.width;x++){
            index=(x+y*imageData.width)*4;
            imageData.data[index+0]=255-imageData.data[index+0];
            imageData.data[index+1]=255-imageData.data[index+1];
            imageData.data[index+2]=255-imageData.data[index+2];
        }
     }
    ctx.putImageData(imageData,0,0);
    aplicoFiltro=true;

}

function goSepia(){
    if (aplicoFiltro)
        ctx.putImageData(imgBack,0,0);
    else{
        imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);//hace backup
    }
    let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
    for (let j = 0; j < imageData.height; j++) {
        for (let i = 0; i < imageData.width; i++) {
                  let index = (i + imageData.width * j) * 4;
                  let newRed=0.393*imageData.data[index + 0]+0.769*imageData.data[index + 1]+0.189*imageData.data[index + 2];
                      if (newRed>255) newRed=255;
                  let newGreen=0.349*imageData.data[index + 0]+0.686*imageData.data[index + 1]+0.168*imageData.data[index + 2];
                      if (newGreen>255) newGreen=255;
                  let newBlue=0.272*imageData.data[index + 0]+0.534*imageData.data[index + 1]+0.131*imageData.data[index + 2];
                      if (newBlue>255) newBlue=255;
                  imageData.data[index + 0] = newRed;
                  imageData.data[index + 1] = newGreen;
                  imageData.data[index + 2] = newBlue;
              }
      }
    ctx.putImageData(imageData, 0, 0);
    aplicoFiltro=true;
}

function goSaturation(){
    if (aplicoFiltro)
        ctx.putImageData(imgBack,0,0);
    else{
        imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);//hace backup
    }
    let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
    let param=document.querySelector("#parametro").value*1.0+0.01;
     for (y=0;y<canvas.height;y++){
        for (x=0;x<canvas.width;x++){
            index=(x+y*imageData.width)*4;
            let hsl=rgbToHsl(imageData.data[index+0],imageData.data[index+1],imageData.data[index+2]);
            hsl[1]=param;
            let nuevoRGB=hslToRgb(hsl[0],hsl[1],hsl[2]);
            imageData.data[index+0]=nuevoRGB[0];
            imageData.data[index+1]=nuevoRGB[1];
            imageData.data[index+2]=nuevoRGB[2];
        }
     }
    ctx.putImageData(imageData,0,0);
    aplicoFiltro=true;
}

function limpiarFiltro(){
    ctx.putImageData(imgBack,0,0);
}

function aplicarFiltro(){
    imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);
    aplicoFiltro=false;
    filtro.value="ninguno";
}

function cambiarBrillo(){
    if (aplicoFiltro)
        ctx.putImageData(imgBack,0,0);
    else{
        imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);//hace backup
    }
    let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
    let param=document.querySelector("#parametro").value*1.0*256-128;//lineal
    for (y=0;y<canvas.height;y++){
        for (x=0;x<canvas.width;x++){
            index=(x+y*imageData.width)*4;
            imageData.data[index+0]=trunc(param+imageData.data[index+0]);
            imageData.data[index+1]=trunc(param+imageData.data[index+1]);
            imageData.data[index+2]=trunc(param+imageData.data[index+2]);
        }
    }
    ctx.putImageData(imageData,0,0);
    aplicoFiltro=true;
}

function goBinary(){
    if (aplicoFiltro)
        ctx.putImageData(imgBack,0,0);
    else{
        imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);//hace backup
    }
    let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
    let param=document.querySelector("#parametro").value*1.0*255;
    let colori=document.querySelector("#html5colorpicker").value.slice(1,7);
    let color=hexToRgb(colori);
    for (y=0;y<canvas.height;y++){
        for (x=0;x<canvas.width;x++){
            index=(x+y*imageData.width)*4;
            let promedio=(imageData.data[index+0]+imageData.data[index+1]+imageData.data[index+2])/3;
            if (promedio>=param){
                imageData.data[index+0]=color.r;
                imageData.data[index+1]=color.g;
                imageData.data[index+2]=color.b;
            }
            else{
                imageData.data[index+0]=0;
                imageData.data[index+1]=0;
                imageData.data[index+2]=0;
            }
        }
    }
    ctx.putImageData(imageData,0,0);
    aplicoFiltro=true;
}

function goSobel(){
    let kernel=[[1,1,1],[1,1,1],[1,1,1]];
    if (aplicoFiltro)
        ctx.putImageData(imgBack,0,0);
    else{
        imgBack=ctx.getImageData(0,0,canvas.width,canvas.height);//hace backup
    }
    let imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
    let result=imageData; let vecinos;
    for (y=0;y<canvas.height;y++){
        for (x=0;x<canvas.width;x++){
            index=(x+y*imageData.width)*4;
            vecinos=getVecinos(imageData,x,y);
            let valorR=0; let valorG=0; let valorB=0;
            for (let i = 0; i <=2; i++) {
                for (let j = 0; j <=0; j++) {
                    valorR+=vecinos[i][j].data[0]*kernel[j][i];
                    valorG+=vecinos[i][j].data[1]*kernel[j][i];
                    valorB+=vecinos[i][j].data[2]*kernel[j][i];
                }
            }
            result.data[index]=valorR;
            result.data[index+1]=valorG;
            result.data[index+2]=valorB;
        }
    }
    ctx.putImageData(result,0,0);
    aplicoFiltro=true;
}


//SOBEL

function getVecinos(imageData, x,y){
    let result=new Array(3);
    for (let a = 0; a < result.length; a++)
        result[a]=new Array(3);
    let pixel;
    let outofbounds={data:[0,0,0]};
    let index=(x+y*imageData.width)*4;
    for (let i = -1; i <=1; i++) {
        for (let j = -1; j <=1; j++) {
            if (x+i>=0 && y+j>=0 && x+i<=imageData.width && y+j<=imageData.height)
                pixel={data:[imageData.data[index+0],imageData.data[index+1],imageData.data[index+2]]};
            else pixel=outofbounds;
            result[i+1][j+1]=pixel;
        }
    }
    return result;
}
    



//HELPERS


function hslToRgb (h, s, l) {
    // Achromatic
    if (s === 0) return [l, l, l]
    h /= 360
  
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s
    var p = 2 * l - q
  
    return [
      Math.round(hueToRgb(p, q, h + 1/3) * 255),
      Math.round(hueToRgb(p, q, h) * 255),
      Math.round(hueToRgb(p, q, h - 1/3) * 255)
    ]
  }
  
  function hueToRgb (p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
  
    return p
  }

  function trunc(value){
      if (value<0)
        return 0;
      if (value>255)
        return 255;
      else return value;
  }

  function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d ; break;
            case g: h = 2 + ( (b - r) / d); break;
            case b: h = 4 + ( (r - g) / d); break;
        }
        h*=60;
        if (h < 0) h +=360;
    }
   return([h, s, l]);
} 

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }