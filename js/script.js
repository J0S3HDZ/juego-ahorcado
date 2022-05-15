var arr = ["PYTHON","AZUCAR","MEXICO","RADIO","BITCOIN","ANGULAR","PENSAR","LOCURA","FIESTA","TEQUILA","PERRO"];
var intentos = 10;
var sel = [];
var ctrl = false;
var rValue;
var badWord = [];
var auxLinea;
/* Canvas Ajuste */
var canvas = document.getElementById("cvDraw");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#E0DDAA";
        ctx.strokeStyle = "#E0DDAA";
/*Ocultar sección de juego*/
window.onload = function() {
    const  ctn = document.getElementById("juego");
    ctn.style.display = "none"
};
function upper(){
    var input = document.getElementById('palabra');
        input.onkeyup = function(){
            this.value = this.value.toUpperCase();
            var ip = document.getElementById('palabra').value;
        }
}
function valida(){
    var p = document.getElementById("palabra").value;
    if(!p.match(/[A-Z\u00D1]/g)){
        alert("Revisa el formato solicitado...");
    }else{
    guarda(p);
    var y = document.getElementById("toast-qr");
    y.className = "hide";
    var y = document.getElementById("toast-qr");
    
    }
}
function guarda(p){
    /*Guardar Nueva Palabra y Empezar a Jugar*/
    arr[arr.length] = p;
    /*Activar key event y iniciar juego*/
    ctrl = true;
    jugar();
}
function jugar(){
    document.getElementById("tcl").style.display = "visible";
    /* Selecciona una palabra aleatoria del array */
    var rand = Math.floor(Math.random()*arr.length);
    rValue = arr[rand];
    /* activar keypressed */
    ctrl=true;
    /*mostrar juego*/
    var ctn = document.getElementById("juego");
    ctn.style.display = "block"
    /* Vuelve visible el juego y oculta los botones de inicio */
    var btn1 = document.getElementById('inicio').style.display = "none";
    /* Guarda cada letra en un espacio del array */
    for(var i = 0; i < rValue.length; i++){
        /* Si tiene espacios en blanco */
        if(rValue.charAt(i) == " "){
            sel[i] = "•";
        }else{
            sel[i] = rValue.charAt(i);
        }
    }
    /*Crear lineas de palabra*/
    var aux = 0;
    while(aux < sel.length){
        var element = document.createElement("span");
        if(sel[aux] == "•"){
            element.classList.add("spaceline");
            element.setAttribute('id','line'+aux);
            element.innerHTML = "•";
        }else{
            element.classList.add("line");
            element.setAttribute('id','line'+aux);
        }
        document.getElementById('words').appendChild(element);
        aux++;
    }
}
/* Obtiene letra clickeada cuando esté en el juego*/
    document.onkeypress = function(evt) {
    if(ctrl ){  
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode);
        if(charStr.match(/[a-zA-Z\u00D1\u00F1]/g) ){
            getLetter(charStr.toUpperCase());
        }
    };
}
/*Obtiene la letra y hace la validacion */
function getLetter(valor){
    var k = 0;
    if(sel.indexOf(valor) >= 0){
        while(k < sel.length){
            if(sel[k] == valor){
                var html = document.getElementById('line'+k).innerHTML = valor;
            }
            k++;
            }
    }else{
        /* Actualizar intentos y canvas */
        intentos--;
        document.getElementById('intent').innerHTML = 'Intentos: '+intentos;
        if(badWord.indexOf(valor) < 0){
        badWord[badWord.length] = valor;
        document.getElementById('pUsadas').style.display = "contents";
        document.getElementById('pUsadas').innerHTML = badWord.join(" ").toString();
        }
        /* get canvas */
        var canvas = document.getElementById("cvDraw");
        ctx.beginPath();
        if(intentos == 9){
            ctx.fillRect(0,190,200,10);
        }else if(intentos == 8){
            ctx.fillRect(40,0,10,200);
        }else if(intentos == 7){
            ctx.fillRect(40,0,80,10);
        }else if(intentos == 6){
            ctx.fillRect(110,0,10,40);
        }else if(intentos == 5){
            ctx.lineWidth = 8;
            ctx.arc(114, 58, 20, 0, 2 * Math.PI);
            ctx.stroke();
        }else if(intentos == 4){
            ctx.fillRect(110,80,10,40);
        }else if(intentos == 3){
            ctx.beginPath();
            ctx.moveTo(114, 118);
            ctx.lineTo(90, 150);
            ctx.stroke();
        }else if(intentos == 2){
            ctx.beginPath();
            ctx.moveTo(114, 118);
            ctx.lineTo(134, 150);
            ctx.stroke();
        }else if(intentos == 1){
            ctx.beginPath();
            ctx.moveTo(114, 80);
            ctx.lineTo(90, 100);
            ctx.stroke();
        }else if(intentos == 0){
            ctx.beginPath();
            ctx.moveTo(114, 80);
            ctx.lineTo(134, 100);
            ctx.stroke();
        }
        /*end canvas*/
        if(intentos == 0){
            document.getElementById("lose").style.display = "block";
            finGame();
        }
    }       
        for(var ax1 = 0; ax1 < sel.length; ax1++){
            var vl = document.getElementById('line'+ax1).innerText; 
            if(vl != sel[ax1]){
                break;
            }
            if(ax1 > sel.length-2){
                document.getElementById("win").style.display = "block";
                document.getElementById("tcl").style.display = "none";
                ctrl = false;
                
            }   
        }
}
function addWord(){
    var y = document.getElementById("toast-qr");
    y.className = "show";
}
function cancelAdd(){
    var y = document.getElementById("toast-qr");
    y.className = "hide";
}
function finGame(){
    document.getElementById("lose").style.display = "block";
    document.getElementById("lose2").innerHTML = "La palabra es: "+rValue;
    document.getElementById("lose2").style.display = "contents";
    document.getElementById("tcl").style.display = "none";
    ctrl = false;
}
function newJuego(){
    auxLinea = 0;
    /*  Ajuste lineas  */
    while(auxLinea < sel.length){
        var rem = document.getElementById('line'+auxLinea);
        rem.remove();
        auxLinea++;
    }
    document.getElementById("pUsadas").innerHTML="";
    document.getElementById("lose").style.display = "none";
    document.getElementById("lose2").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("tcl").style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('intent').innerHTML = 'Intentos: '+intentos;
    intentos = 10;
    sel = [];
    badWord = [];
    jugar();
}
        
        