function activateConfetti(){party.confetti(document.getElementById("win"),{count:100,spread:1e3})}var rValue,auxLinea,arr=[],intentos=10,sel=[],ctrl=!1,badWord=[],match=0,clickeados=[];function playind(){let e=document.querySelectorAll("#menubtn");e.forEach(e=>{e.disabled=!1}),match=1,document.getElementById("intent").innerHTML="Intentos: "+intentos,fetch("words/es.json").then(e=>e.json()).then(e=>{let t=e[Math.floor(Math.random()*e.length)].toUpperCase();rValue=t=t.replace(/[ÁÉÍÓÚ]/g,e=>{switch(e){case"\xc1":return"A";case"\xc9":return"E";case"\xcd":return"I";case"\xd3":return"O";case"\xda":return"U";default:return e}});let a=document.getElementById("main");document.getElementById("main").classList.remove("animate__animated","animate__fadeOutUp"),document.getElementById("main").classList.add("animate__animated","animate__fadeOutLeft"),a.style.opacity=0,a.style.zIndex=-1;let n=document.getElementById("gamev");isElementVisible(n)?n.classList.contains("animate__pulse")||(n.classList.remove("animate__animated","animate__fadeOutRight"),n.classList.remove("animate__animated","animate__fadeInRight"),n.classList.add("animate__animated","animate__pulse")):(n.classList.remove("animate__animated","animate__pulse"),n.classList.remove("animate__animated","animate__fadeOutRight"),n.classList.add("animate__animated","animate__fadeInRight"),n.style.opacity=1,n.style.zIndex=1),ctrl=!0;for(var i=0;i<rValue.length;i++)" "==rValue.charAt(i)?sel[i]="•":sel[i]=rValue.charAt(i);for(var l=0;l<sel.length;){var s=document.createElement("span");"•"==sel[l]?(s.classList.add("spaceline"),s.setAttribute("id","line"+l),s.innerHTML="•"):(s.classList.add("line"),s.setAttribute("id","line"+l)),document.getElementById("words").appendChild(s),l++}}).catch(e=>console.error(e))}function isElementVisible(e){let t=window.getComputedStyle(e).getPropertyValue("opacity");return"1"===t}function playcustom(){document.getElementById("customMatch").classList.remove("animate__animated","animate__fadeOutUp"),document.getElementById("customMatch").classList.add("animate__animated","animate__fadeInUp"),document.getElementById("customMatch").style.opacity=1,document.getElementById("customMatch").style.zIndex=2;let e=document.querySelectorAll("#menubtn");e.forEach(e=>{e.disabled=!0})}function readyCG(){document.getElementById("customMatch").classList.remove("animate__animated","animate__fadeInUp"),document.getElementById("customMatch").classList.add("animate__animated","animate__fadeOutUp"),document.getElementById("customMatch").style.opacity=0,document.getElementById("customMatch").style.zIndex=-1;let e=document.querySelectorAll("#menubtn");e.forEach(e=>{e.disabled=!0});let t=document.getElementById("opc1");if(t.checked)playind();else{let a=document.getElementById("myList");a.classList.remove("animate__animated","animate__fadeOutUp"),a.classList.add("animate__animated","animate__fadeInUp"),a.style.opacity=1,a.style.zIndex=2;let n=document.querySelectorAll("#menubtn");n.forEach(e=>{e.disabled=!0})}}const myTextarea=document.getElementById("taList"),saveButton=document.getElementById("saveList");function closeCard(){let e=document.querySelectorAll(".alert_card");e.forEach(function(e){e.style.opacity=0,e.classList.add("animate__animated","animate__fadeOutUp"),setTimeout(function(){e.style.zIndex=250},1)});let t=document.querySelectorAll("#menubtn");t.forEach(e=>{e.disabled=!1})}function playcust(){let e=document.querySelectorAll("#menubtn");e.forEach(e=>{e.disabled=!1}),document.getElementById("intent").innerHTML="Intentos: "+intentos,match=2,rValue=arr[Math.floor(Math.random()*arr.length)];let t=document.getElementById("main");document.getElementById("main").classList.remove("animate__animated","animate__fadeOutUp"),document.getElementById("main").classList.add("animate__animated","animate__fadeOutLeft"),t.style.opacity=0,t.style.zIndex=-1;let a=document.getElementById("gamev");isElementVisible(a)?a.classList.contains("animate__pulse")||(a.classList.remove("animate__animated","animate__fadeOutRight"),a.classList.remove("animate__animated","animate__fadeInRight"),a.classList.add("animate__animated","animate__pulse")):(a.classList.remove("animate__animated","animate__pulse"),a.classList.remove("animate__animated","animate__fadeOutRight"),a.classList.add("animate__animated","animate__fadeInRight"),a.style.opacity=1,a.style.zIndex=1),ctrl=!0;for(var n=0;n<rValue.length;n++)" "==rValue.charAt(n)?sel[n]="•":sel[n]=rValue.charAt(n);for(var i=0;i<sel.length;){var l=document.createElement("span");"•"==sel[i]?(l.classList.add("spaceline"),l.setAttribute("id","line"+i),l.innerHTML="•"):(l.classList.add("line"),l.setAttribute("id","line"+i)),document.getElementById("words").appendChild(l),i++}}myTextarea.addEventListener("keydown",function(e){"Enter"===e.key&&e.preventDefault()}),myTextarea.value="",saveButton.addEventListener("click",()=>{let e=myTextarea.value.split(",").map(e=>e.trim());arr.length=0;let t=/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;e.forEach(e=>{if(t.test(e)){let a=e.normalize("NFD").replace(/[\u0300-\u036f]/g,"");""!==a&&arr.push(a.toUpperCase())}}),myTextarea.value="";let a=document.getElementById("myList");a.classList.remove("animate__animated","animate__fadeInUp"),a.classList.add("animate__animated","animate__fadeOutUp"),a.style.opacity=0,a.style.zIndex=-1,arr.length<=0?(alert("Has dejado la lista vac\xeda, se utilizar\xe1 la lista del sistema."),playind()):playcust()}),document.onkeypress=function(e){if(ctrl){var t=String.fromCharCode((e=e||window.event).keyCode||e.which);t.match(/[a-zA-Z\u00D1\u00F1]/g)&&getLetter(t.toUpperCase())}};var canvas=document.getElementById("cvDraw"),ctx=canvas.getContext("2d");function getLetter(e){if(0>badWord.indexOf(e)&&0>clickeados.indexOf(e)){if(sel.indexOf(e)>=0){clickeados.push(e);let t=document.getElementById(e);t.classList.add("goodWord");for(var a=0;a<sel.length;)sel[a]==e&&(document.getElementById("line"+a).innerHTML=e),a++}else{badWord.push(e);let n=document.getElementById(e);n.classList.add("badWord"),intentos--,document.getElementById("intent").innerHTML="Intentos: "+intentos}}if(document.getElementById("cvDraw"),ctx.beginPath(),9==intentos?ctx.fillRect(0,190,200,10):8==intentos?ctx.fillRect(40,0,10,200):7==intentos?ctx.fillRect(40,0,80,10):6==intentos?ctx.fillRect(110,0,10,40):5==intentos?(ctx.lineWidth=8,ctx.arc(114,58,20,0,2*Math.PI),ctx.stroke()):4==intentos?ctx.fillRect(110,80,10,40):3==intentos?(ctx.beginPath(),ctx.moveTo(114,118),ctx.lineTo(90,150),ctx.stroke()):2==intentos?(ctx.beginPath(),ctx.moveTo(114,118),ctx.lineTo(134,150),ctx.stroke()):1==intentos?(ctx.beginPath(),ctx.moveTo(114,80),ctx.lineTo(90,100),ctx.stroke()):0==intentos&&(ctx.beginPath(),ctx.moveTo(114,80),ctx.lineTo(134,100),ctx.stroke()),intentos<=0){document.getElementById("lose").style.opacity=1,document.getElementById("lose").style.zIndex=2,document.getElementById("lose").classList.add("animate__animated","animate__zoomIn"),document.querySelectorAll("#finalw").forEach(function(e){e.innerHTML=rValue});let i=document.getElementById("gamev");i.opacity=0,ctrl=!1}for(var l=0;l<sel.length&&document.getElementById("line"+l).innerText==sel[l];l++){;if(l>sel.length-2){document.getElementById("win").style.opacity=1,document.getElementById("win").style.zIndex=2,document.getElementById("win").classList.add("animate__animated","animate__zoomIn"),document.querySelectorAll("#finalw").forEach(function(e){e.innerHTML=rValue});let s=document.getElementById("gamev");s.opacity=0,ctrl=!1,activateConfetti()}}}function playAgain(){for(auxLinea=0;auxLinea<sel.length;)document.getElementById("line"+auxLinea).remove(),auxLinea++;ctx.clearRect(0,0,canvas.width,canvas.height),document.getElementById("lose").style.opacity=0,document.getElementById("lose").style.zIndex=-1,document.getElementById("lose").classList.remove("animate__animated","animate__zoomIn"),document.getElementById("win").style.opacity=0,document.getElementById("win").style.zIndex=-1,document.getElementById("win").classList.remove("animate__animated","animate__zoomIn"),document.getElementById("finalw").innerHTML="",document.getElementById("gamev").classList.remove("animate__animated","animate__fadeInRight"),document.getElementById("gamev").classList.remove("animate__animated","animate__pulse");let e=document.querySelectorAll(".keyb");e.forEach(e=>e.classList.remove("badWord")),e.forEach(e=>e.classList.remove("goodWord"));let t=document.querySelectorAll(".keyb button");t.forEach(e=>e.removeAttribute("disabled")),sel=[],badWord=[],intentos=10,ctrl=!0,2==match?playcust():playind()}function gotoMenu(){for(auxLinea=0;auxLinea<sel.length;)document.getElementById("line"+auxLinea).remove(),auxLinea++;ctx.clearRect(0,0,canvas.width,canvas.height),document.getElementById("lose").style.opacity=0,document.getElementById("lose").style.zIndex=-1,document.getElementById("lose").classList.remove("animate__animated","animate__zoomIn"),document.getElementById("finalw").innerHTML="",document.getElementById("win").style.opacity=0,document.getElementById("win").style.zIndex=-1,document.getElementById("win").classList.remove("animate__animated","animate__zoomIn");let e=document.querySelectorAll(".keyb");e.forEach(e=>e.classList.remove("badWord")),e.forEach(e=>e.classList.remove("goodWord"));let t=document.querySelectorAll(".keyb button");t.forEach(e=>e.removeAttribute("disabled")),sel=[],badWord=[],intentos=10,ctrl=!1;let a=document.querySelectorAll(".alert_card");a.forEach(function(e){e.style.opacity=0,e.classList.remove("animate__animated","animate__fadeOutUp"),setTimeout(function(){e.style.zIndex=-1},250)});let n=document.getElementById("gamev");n.classList.remove("animate__animated","animate__fadeInRight","animate__pulse"),n.classList.add("animate__animated","animate__fadeOutRight"),n.style.opacity=0,n.style.zIndex=-1;let i=document.getElementById("main");i.classList.remove("animate__animated","animate__fadeOutLeft"),i.classList.add("animate__animated","animate__fadeInLeft"),i.style.opacity=1,i.style.zIndex=1}function config(){let e=document.getElementById("settings");e.classList.remove("animate__animated","animate__fadeOutUp"),e.classList.add("animate__animated","animate__fadeInUp"),e.style.zIndex=1,e.style.opacity=1}function soon(){alert("En desarrollo...")}ctx.fillStyle="#00C55D",ctx.strokeStyle="#00C55D";