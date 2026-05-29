let microfono;
let delay;
let distortion;
let imgBocaCerrada;
let imgBocaAbierta;
let umbralSonido = 0.05; 

function preload() {
  imgBocaCerrada = loadImage('img/boca.png'); 
  imgBocaAbierta = loadImage('img/boca_abierta.png');
}

function setup() {
  // Creamos el lienzo con el tamaño de la boca
  let canvas = createCanvas(400, 220);
  canvas.id('canvasBoca'); 

  // AHURRADA DE CÓDIGO: Cuando el usuario hace clic EN CUALQUIER PARTE del canvas (la boca),
  // se ejecuta la función iniciarAudio.
  canvas.mousePressed(iniciarAudio);

  // Buscamos el botón "Volver" del HTML para controlar cuándo se va el usuario
  let botonVolver = select('.nav-volver a');
  if (botonVolver) {
    botonVolver.mousePressed(limpiarAudio);
  }
}

function limpiarAudio() {
  if (microfono) {
    microfono.stop(); // Apaga el hardware del micrófono
    remove();         // Destruye por completo el lienzo de p5.js y libera la memoria
  }
}

function draw() {
  background(0); 
  
  if (microfono) {
    let volumen = microfono.getLevel();
    
    // Si hay sonido, muestra la boca abierta, si no, la cerrada
    if (volumen > umbralSonido) {
      image(imgBocaAbierta, 0, 0, width, height);
    } else {
      image(imgBocaCerrada, 0, 0, width, height);
    }
  } else {
    // Si todavía no hicieron clic para iniciar el audio, se muestra la boca cerrada por defecto
    image(imgBocaCerrada, 0, 0, width, height);
  }
}

function iniciarAudio() {
  // Evitamos inicializar el micrófono múltiples veces si vuelven a hacer clic
  if (!microfono) {
    userStartAudio();
    microfono = new p5.AudioIn();
    microfono.start();

    distortion = new p5.Distortion(0.9);
    delay = new p5.Delay();

    microfono.connect(distortion);
    distortion.process(microfono);
    delay.process(distortion, 0.3, 0.8, 3000);
  }
}