let canvas= document.querySelector("#canvas");
let canvasito= document.querySelector("#canvasito");
let ctx=document.querySelector("#canvas").getContext("2d");
let minictx=document.querySelector("#canvasito").getContext("2d");
let pos=document.querySelector("#pos");//parrafo donde muestro la posición del mouse
let posmouse = {x: 0, y: 0};

//mini canvas preview
document.querySelector("#tamaño").addEventListener("change",actualizarCanvasito);
document.querySelector("#html5colorpicker").addEventListener("change",actualizarCanvasito);

document.querySelector("#herramienta").addEventListener("change", cambiarherramienta);
canvas.addEventListener('mousemove', function(e) {
    posmouse.x = e.pageX - this.offsetLeft;
    posmouse.y = e.pageY - this.offsetTop;
  }, false);

  canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    canvas.addEventListener('mousemove', pintando, false);
    ctx.moveTo(posmouse.x, posmouse.y);
    ctx.lineWidth = document.querySelector("#tamaño").value;
    ctx.lineJoin = 'bevel';
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.querySelector("#html5colorpicker").value;
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', pintando, false);
}, false);
 
let pintando = function() {
    ctx.lineTo(posmouse.x, posmouse.y);
    ctx.stroke();
};

document.querySelector("#nuevo").addEventListener("click", function(){
        ctx.fillStyle="white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
    })

function getCoords(){
    canvas.addEventListener("mousemove", dibujar);
}

function cambiarherramienta(){

}

actualizarCanvasito();
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