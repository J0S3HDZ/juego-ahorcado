/* CONFETTI PARTICLES WHEN USER WIN THE MATCH */
function activateConfetti() {
  party.confetti(document.getElementById("win"), {
    count: 100,
    spread: 1000,
  });
}

/* GLOBAL VARIABLES */
var arr = []; //USER LIST (CUSTOM MATCH)
var intentos = 10; //MAX ERROR WORDS
var sel = [];
var ctrl = false;
var rValue; // WORD TO KNOW
var badWord = []; //BAD WORDS CHOSEN
var auxLinea;
var match = 0; /* IND = 1 / CUSTOM = 2 */
var clickeados = [];
var streak = 0;

/* Individual match */
function playind() {
  /* ANIMATION */
  const mb = document.querySelectorAll("#menubtn");
  mb.forEach((button) => {
    button.disabled = false;
  });

  /* ACTIVE INDIVIDUAL MATCH */
  match = 1;
  /* SHOW INTENTOS*/
  document.getElementById("intent").innerHTML = "<i class='fa-solid fa-heart'></i> " + intentos + "<span class='bubble-text'>Intentos</span>";

  /* READ WORDS JSON AND GET THE NEW WORD */
  fetch("words/es.json")
    .then((response) => response.json())
    .then((data) => {
      let randomIndex = Math.floor(Math.random() * data.length);
      let randomText = data[randomIndex].toUpperCase();
      randomText = randomText.replace(/[ÁÉÍÓÚ]/g, (match) => {
        switch (match) {
          case "Á":
            return "A";
          case "É":
            return "E";
          case "Í":
            return "I";
          case "Ó":
            return "O";
          case "Ú":
            return "U";
          default:
            return match;
        }
      });
      rValue = randomText;

      /* CLOSE MAIN NAV */
      const m = document.getElementById("main");
      m.classList.remove("animate__animated", "animate__fadeOutUp");
      m.classList.add("animate__animated", "animate__fadeOutLeft");
      m.style.opacity = 0;
      m.style.zIndex = -1;

      /* OPEN GAME VIEW */
      const gv = document.getElementById("gamev");

      if (isElementVisible(gv)) {
        // si ya es visible, ejecutar solo el animate_pulse
        if (!gv.classList.contains("animate__pulse")) {
          gv.classList.remove("animate__animated", "animate__fadeOutRight");
          gv.classList.remove("animate__animated", "animate__fadeInRight");
          gv.classList.add("animate__animated", "animate__pulse");
        }
      } else {
        // si no es visible, ejecutar fadeInRight y hacer visible
        gv.classList.remove("animate__animated", "animate__pulse");
        gv.classList.remove("animate__animated", "animate__fadeOutRight");
        gv.classList.add("animate__animated", "animate__fadeInRight");
        gv.style.opacity = 1;
        gv.style.zIndex = 1;
      }

      /* ACTIVE READ KEYS CLICKED IN KEYBOARD */
      ctrl = true;

      /* SAVE CLICKED WORDS IN SEL ARRAY*/
      for (var i = 0; i < rValue.length; i++) {
        /* Si tiene espacios en blanco */
        if (rValue.charAt(i) == " ") {
          sel[i] = "•";
        } else {
          sel[i] = rValue.charAt(i);
        }
      }

      /* CREATE WORD LINES */
      var aux = 0;
      while (aux < sel.length) {
        var element = document.createElement("span");
        if (sel[aux] == "•") {
          element.classList.add("spaceline");
          element.setAttribute("id", "line" + aux);
          element.innerHTML = "•";
        } else {
          element.classList.add("line");
          element.setAttribute("id", "line" + aux);
        }
        document.getElementById("words").appendChild(element);
        aux++;
      }
    })
    .catch((error) => console.error(error));
}
function isElementVisible(elem) {
  // verifica si el elemento tiene una opacidad de 1
  const opacity = window.getComputedStyle(elem).getPropertyValue("opacity");
  return opacity === "1";
}

/* Custom match */
/* SAVE USER LIST */

function playcustom() {
  const cm = document.getElementById("customMatch");
  cm.classList.remove("animate__animated", "animate__fadeOutUp");
  cm.classList.add("animate__animated", "animate__fadeInUp");
  cm.style.opacity = 1;
  cm.style.zIndex = 2;

  const mb = document.querySelectorAll("#menubtn");
  mb.forEach((button) => {
    button.disabled = true;
  });
}

function readyCG() {
  const cm = document.getElementById("customMatch");
  cm.classList.remove("animate__animated", "animate__fadeInUp");
  cm.classList.add("animate__animated", "animate__fadeOutUp");
  cm.style.opacity = 0;
  cm.style.zIndex = -1;
  const mb = document.querySelectorAll("#menubtn");
  mb.forEach((button) => {
    button.disabled = true;
  });
  /* LEER VALORES DE AJUSTES DE PARTIDA */
  const ch1 = document.getElementById("opc1");

  if (ch1.checked) {
    //usar lista del sistema
    playind();
  } else {
    const ml = document.getElementById("myList");
    ml.classList.remove("animate__animated", "animate__fadeOutUp");
    ml.classList.add("animate__animated", "animate__fadeInUp");
    ml.style.opacity = 1;
    ml.style.zIndex = 2;
    const mb = document.querySelectorAll("#menubtn");
    mb.forEach((button) => {
      button.disabled = true;
    });
  }
}

const myTextarea = document.getElementById("taList");
const saveButton = document.getElementById("saveList");
myTextarea.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

myTextarea.value = ""; // Limpiar el textarea.
saveButton.addEventListener("click", () => {
  const statements = myTextarea.value
    .split(",")
    .map((statement) => statement.trim());

  arr.length = 0;

  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/; // Expresión regular para comprobar si una palabra solo contiene letras.

  statements.forEach((statement) => {
    if (regex.test(statement)) {
      const normalized = statement
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // Normalizar y quitar acentos.

      if (normalized !== "") {
        // Verificar si el enunciado no es simplemente un espacio en blanco.
        arr.push(normalized.toUpperCase());
      }
    }
  });
  // Iterar por cada enunciado, validar, quitar acentos y agregarlo al arreglo general convertido a mayúsculas.

  myTextarea.value = ""; // Limpiar el textarea.

  const ml = document.getElementById("myList");
  ml.classList.remove("animate__animated", "animate__fadeInUp");
  ml.classList.add("animate__animated", "animate__fadeOutUp");
  ml.style.opacity = 0;
  ml.style.zIndex = -1;
  if (arr.length <= 0) {
    alert("Has dejado la lista vacía, se utilizará la lista del sistema.");
    playind();
  } else {
    playcust();
  }
});

function closeCard() {
  const cards = document.querySelectorAll(".alert_card");

  cards.forEach(function (card) {
    card.style.opacity = 0;
    card.classList.add("animate__animated", "animate__fadeOutUp");
    setTimeout(function () {
      card.style.zIndex = 250;
    }, 1);
  });

  const mb = document.querySelectorAll("#menubtn");
  mb.forEach((button) => {
    button.disabled = false;
  });
}

/* Open card to add words to list */
function playcust() {
  const mb = document.querySelectorAll("#menubtn");
  mb.forEach((button) => {
    button.disabled = false;
  });
  /* SHOW INTENTOS */
  document.getElementById("intent").innerHTML = "<i class='fa-solid fa-heart'></i> " + intentos + "<span class='bubble-text'>Intentos</span>";

  /* ACTIVE INDIVIDUAL MATCH */
  match = 2;
  /* READ WORDS ARRAY AND GET THE NEW WORD */
  rValue = arr[Math.floor(Math.random() * arr.length)];

  /* CLOSE MAIN NAV */
  const m = document.getElementById("main");
  m.classList.remove("animate__animated", "animate__fadeOutUp");
  m.classList.add("animate__animated", "animate__fadeOutLeft");
  m.style.opacity = 0;
  m.style.zIndex = -1;

  /* OPEN GAME VIEW */
  const gv = document.getElementById("gamev");

  if (isElementVisible(gv)) {
    // si ya es visible, ejecutar solo el animate_pulse
    if (!gv.classList.contains("animate__pulse")) {
      gv.classList.remove("animate__animated", "animate__fadeOutRight");
      gv.classList.remove("animate__animated", "animate__fadeInRight");
      gv.classList.add("animate__animated", "animate__pulse");
    }
  } else {
    // si no es visible, ejecutar fadeInRight y hacer visible
    gv.classList.remove("animate__animated", "animate__pulse");
    gv.classList.remove("animate__animated", "animate__fadeOutRight");
    gv.classList.add("animate__animated", "animate__fadeInRight");
    gv.style.opacity = 1;
    gv.style.zIndex = 1;
  }

  /* ACTIVE READ KEYS CLICKED IN KEYBOARD */
  ctrl = true;

  /* SAVE CLICKED WORDS IN SEL ARRAY*/
  for (var i = 0; i < rValue.length; i++) {
    /* Si tiene espacios en blanco */
    if (rValue.charAt(i) == " ") {
      sel[i] = "•";
    } else {
      sel[i] = rValue.charAt(i);
    }
  }
  /* CREATE WORD LINES */
  var aux = 0;
  while (aux < sel.length) {
    var element = document.createElement("span");
    if (sel[aux] == "•") {
      element.classList.add("spaceline");
      element.setAttribute("id", "line" + aux);
      element.innerHTML = "•";
    } else {
      element.classList.add("line");
      element.setAttribute("id", "line" + aux);
    }
    document.getElementById("words").appendChild(element);
    aux++;
  }
}

/* GENERAL SCRIPT */
/* GEY KEY PRESSED FROM KEYBOARD IF CTRL IS ACTIVE */
document.onkeypress = function (evt) {
  if (ctrl) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    if (charStr.match(/[a-zA-Z\u00D1\u00F1]/g)) {
      getLetter(charStr.toUpperCase());
    }
  }
};

/* CUSTOMIZE CANVAS */
var canvas = document.getElementById("cvDraw");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#00C55D";
ctx.strokeStyle = "#00C55D";

/* Obtiene la letra y hace la validacion */
function getLetter(valor) {
  /*var k = 0;

    if(sel.indexOf(valor) >= 0){
        while(k < sel.length){
            if(sel[k] == valor){
                var html = document.getElementById('line'+k).innerHTML = valor;
            }
            k++;
            }
        const l = document.getElementById(valor);
        l.classList.add("goodWord");
    }else{

        const x = document.querySelector(valor);
        if (!x.classList.contains('keyb','badWord')){
            const l = document.getElementById(valor);
            l.classList.add("badWord");
            intentos--;
        }      
        

        document.getElementById('intent').innerHTML = 'Intentos: '+intentos;
        if(badWord.indexOf(valor) < 0){
            badWord[badWord.length] = valor;
        }*/
  if (badWord.indexOf(valor) < 0 && clickeados.indexOf(valor) < 0) {
    // Si el valor no está en el array badWord y no ha sido clickeado previamente

    if (sel.indexOf(valor) >= 0) {
      // Si el valor está en el array sel, el botón se ha clickeado correctamente
      clickeados.push(valor); // Agregar el botón al array de botones clickeados

      // Aquí puedes hacer lo que necesites para indicar que el botón se ha clickeado correctamente
      // Por ejemplo, agregar la clase "goodWord" al botón correspondiente:
      const boton = document.getElementById(valor);
      boton.classList.add("goodWord");

      var k = 0;
      while (k < sel.length) {
        if (sel[k] == valor) {
          var html = (document.getElementById("line" + k).innerHTML = valor);
        }
        k++;
      }
    } else {
      // Si el valor no está en el array sel, el botón se ha clickeado incorrectamente
      badWord.push(valor); // Agregar el valor al array de palabras malas

      // Agregar la clase "badWord" al botón correspondiente y restar un intento
      const boton = document.getElementById(valor);
      boton.classList.add("badWord");
      intentos--;

      // Actualizar la etiqueta que muestra el número de intentos
      document.getElementById("intent").innerHTML = "<i class='fa-solid fa-heart'></i> " + intentos + "<span class='bubble-text'>Intentos</span>";
    }
  }

  /* get canvas */
  var canvas = document.getElementById("cvDraw");
  ctx.beginPath();
  if (intentos == 9) {
    ctx.fillRect(0, 190, 200, 10);
  } else if (intentos == 8) {
    ctx.fillRect(40, 0, 10, 200);
  } else if (intentos == 7) {
    ctx.fillRect(40, 0, 80, 10);
  } else if (intentos == 6) {
    ctx.fillRect(110, 0, 10, 40);
  } else if (intentos == 5) {
    ctx.lineWidth = 8;
    ctx.arc(114, 58, 20, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (intentos == 4) {
    ctx.fillRect(110, 80, 10, 40);
  } else if (intentos == 3) {
    ctx.beginPath();
    ctx.moveTo(114, 118);
    ctx.lineTo(90, 150);
    ctx.stroke();
  } else if (intentos == 2) {
    ctx.beginPath();
    ctx.moveTo(114, 118);
    ctx.lineTo(134, 150);
    ctx.stroke();
  } else if (intentos == 1) {
    ctx.beginPath();
    ctx.moveTo(114, 80);
    ctx.lineTo(90, 100);
    ctx.stroke();
  } else if (intentos == 0) {
    ctx.beginPath();
    ctx.moveTo(114, 80);
    ctx.lineTo(134, 100);
    ctx.stroke();
  }
  /*end canvas*/
  if (intentos <= 0) {
    const ls = document.getElementById("lose");
    ls.style.opacity = 1;
    ls.style.zIndex = 2;
    ls.classList.add("animate__animated", "animate__zoomIn");

    document.querySelectorAll("#finalw").forEach(function (element) {
      element.innerHTML = rValue;
    });
    const gvw = document.getElementById("gamev");
    gvw.opacity = 0;

    ctrl = false;

    resetStreak();
  }

  for (var ax1 = 0; ax1 < sel.length; ax1++) {
    var vl = document.getElementById("line" + ax1).innerText;
    if (vl != sel[ax1]) {
      break;
    }
    if (ax1 > sel.length - 2) {
      const wn = document.getElementById("win");
      wn.style.opacity = 1;
      wn.style.zIndex = 2;
      wn.classList.add("animate__animated", "animate__zoomIn");

      document.querySelectorAll("#finalw").forEach(function (element) {
        element.innerHTML = rValue;
      });
      const gvw = document.getElementById("gamev");
      gvw.opacity = 0;

      ctrl = false;
      activateConfetti();
      winStreak();
    }
  }
}
function winStreak(){
  streak++;
  document.getElementById("streak").innerHTML = "<i class='fa-solid fa-fire fa-lg'></i> " + streak + "<span class='bubble-text'>Racha</span>";
  
}
function resetStreak(){
  streak = 0;
  document.getElementById("streak").innerHTML = "<i class='fa-solid fa-fire fa-lg'></i> " + streak + "<span class='bubble-text'>Racha</span>";
}
function playAgain(control) {

  if(control == 1){
    resetStreak();
  }

  auxLinea = 0;
  /*  Ajuste lineas  */
  while (auxLinea < sel.length) {
    var rem = document.getElementById("line" + auxLinea);
    rem.remove();
    auxLinea++;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ls = document.getElementById("lose");
  ls.style.opacity = 0;
  ls.style.zIndex = -1;
  ls.classList.remove("animate__animated", "animate__zoomIn");

  const wn = document.getElementById("win");
  wn.style.opacity = 0;
  wn.style.zIndex = -1;
  wn.classList.remove("animate__animated", "animate__zoomIn");

  document.getElementById("finalw").innerHTML = "";

  document
    .getElementById("gamev")
    .classList.remove("animate__animated", "animate__fadeInRight");
  document
    .getElementById("gamev")
    .classList.remove("animate__animated", "animate__pulse");

  // Remover la clase "badWord" de todos los divs con clase "keyb"
  const keybDivs = document.querySelectorAll(".keyb");
  keybDivs.forEach((div) => div.classList.remove("badWord"));

  // Remover la clase "goodWord" de todos los divs con clase "keyb"
  keybDivs.forEach((div) => div.classList.remove("goodWord"));

  // Remover el atributo "disabled" de los botones con la clase "keyb"
  const keybButtons = document.querySelectorAll(".keyb button");
  keybButtons.forEach((button) => button.removeAttribute("disabled"));
  sel = [];
  badWord = [];
  intentos = 10;
  clickeados = [];
  ctrl = true;

  //winstreaks quedan guardados

  //get math number
  if (match == 2) {
    playcust();
  } else {
    playind();
  }
}
function gotoMenu() {
  auxLinea = 0;
  /*  Ajuste lineas  */
  while (auxLinea < sel.length) {
    var rem = document.getElementById("line" + auxLinea);
    rem.remove();
    auxLinea++;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ls = document.getElementById("lose");
  ls.style.opacity = 0;
  ls.style.zIndex = -1;
  ls.classList.remove("animate__animated", "animate__zoomIn");

  const wn = document.getElementById("win");
  wn.style.opacity = 0;
  wn.style.zIndex = -1;
  wn.classList.remove("animate__animated", "animate__zoomIn");

  document.getElementById("finalw").innerHTML = "";

  // Remover la clase "badWord" de todos los divs con clase "keyb"
  const keybDivs = document.querySelectorAll(".keyb");
  keybDivs.forEach((div) => div.classList.remove("badWord"));

  // Remover la clase "goodWord" de todos los divs con clase "keyb"
  keybDivs.forEach((div) => div.classList.remove("goodWord"));

  // Remover el atributo "disabled" de los botones con la clase "keyb"
  const keybButtons = document.querySelectorAll(".keyb button");
  keybButtons.forEach((button) => button.removeAttribute("disabled"));
  sel = [];
  badWord = [];
  intentos = 10;
  clickeados = [];
  ctrl = false;

  resetStreak();

  const cards = document.querySelectorAll(".alert_card");

  cards.forEach(function (card) {
    card.style.opacity = 0;
    card.classList.remove("animate__animated", "animate__fadeOutUp");
    setTimeout(function () {
      card.style.zIndex = -1;
    }, 250);
  });

  const gtmv = document.getElementById("gamev");
  gtmv.classList.remove(
    "animate__animated",
    "animate__fadeInRight",
    "animate__pulse"
  );
  gtmv.classList.add("animate__animated", "animate__fadeOutRight");
  gtmv.style.opacity = 0;
  gtmv.style.zIndex = -1;

  const gtmv1 = document.getElementById("main");
  gtmv1.classList.remove("animate__animated", "animate__fadeOutLeft");
  gtmv1.classList.add("animate__animated", "animate__fadeInLeft");
  gtmv1.style.opacity = 1;
  gtmv1.style.zIndex = 1;
}
function config() {
  const cs = document.getElementById("settings");
  cs.classList.remove("animate__animated", "animate__fadeOutUp");
  cs.classList.add("animate__animated", "animate__fadeInUp");
  cs.style.zIndex = 1;
  cs.style.opacity = 1;
}
function soon() {
  alert("En desarrollo...");
}
