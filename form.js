// form.js
let imgFondo;
let video; 
let foto = null; 
let sonidoFondo; 

let textoTitulo = "<CREA TU USUARIO>";
let indiceLetra = 0;
let anteriorCuadro = [];

function preload() {
  imgFondo = loadImage('img/inicio.jpg');
  
  sonidoFondo = loadSound('sonidos/tele.sin.senal.mp3'); 
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); 
  
  userStartAudio().then(() => {
    sonidoFondo.loop();
    sonidoFondo.setVolume(0.1); 
  });

  video = createCapture(VIDEO); 
  video.size(220, 160); 
  video.parent('camara'); 
  
  let btnFoto = select('#btnFoto');
  if (btnFoto) btnFoto.mousePressed(sacarFoto);

  let btnEntrar = select('#btnEntrar');
  if (btnEntrar) btnEntrar.mousePressed(entrarPagina);

  let tituloElemento = document.querySelector('.titulo');
  if (tituloElemento) tituloElemento.innerText = ""; 
  
  setTimeout(escribirTitulo, 600); 
}

function escribirTitulo() {
  let tituloElemento = document.querySelector('.titulo');
  if (!tituloElemento) return;

  if (indiceLetra < textoTitulo.length) {
    tituloElemento.innerText += textoTitulo.charAt(indiceLetra);
    indiceLetra++;
    setTimeout(escribirTitulo, 80); 
  } else {
    let formulario = document.querySelector('.formulario');
    if (formulario) formulario.classList.add('visible');
  }
}

function draw() {
  image(imgFondo, 0, 0, width, height);
  let movimientoTotal = 0;

  if (foto === null) {
    video.loadPixels();
    if (video.pixels.length > 0) {
      if (anteriorCuadro.length === 0) {
        anteriorCuadro = new Uint8Array(video.pixels);
      }
      for (let i = 0; i < video.pixels.length; i += 16) {
        let diferencia = dist(video.pixels[i], video.pixels[i+1], video.pixels[i+2], anteriorCuadro[i], anteriorCuadro[i+1], anteriorCuadro[i+2]);
        if (diferencia > 40) movimientoTotal += diferencia;
      }
      anteriorCuadro.set(video.pixels);
    }
  }

  let factorGlitch = pow(map(movimientoTotal, 0, 45000, 0, 1, true), 2);

  if (sonidoFondo.isPlaying() && foto === null) {
    sonidoFondo.setVolume(map(factorGlitch, 0, 1, 0.1, 0.9), 0.1);
    sonidoFondo.rate(map(factorGlitch, 0, 1, 1.0, 1.6));
  }

  if (random(0, 1) < 0.4 + (factorGlitch * 0.55)) { 
    let cantidadCortes = floor(random(4, 10 + (factorGlitch * 15))); 
    for (let i = 0; i < cantidadCortes; i++) {
      let yRandom = random(0, height);
      let altoCorte = random(10, 30 + (factorGlitch * 150)); 
      let desfasajeX = random(-40 - (factorGlitch * 220), 40 + (factorGlitch * 220)); 
      copy(0, yRandom, width, altoCorte, desfasajeX, yRandom, width, altoCorte);
    }
  }

  stroke(0, 0, 0, 35 + (factorGlitch * 45)); 
  makeLines();
}

function makeLines() {
  strokeWeight(1);
  for (let i = (frameCount % 4); i < height; i += 4) {
    line(0, i, width, i);
  }
  let cantidadGranos = 5000 + (pow(map(mouseX, 0, width, 0, 1, true), 2) * 4000); 
  for (let i = 0; i < cantidadGranos; i++) {
    let gris = random(50, 255);
    stroke(gris, gris, gris, random(15, 40));
    point(random(0, width), random(0, height));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function sacarFoto() {
  if (foto === null) {
    foto = video.get(); 
    video.hide();

    if (sonidoFondo.isPlaying()) sonidoFondo.stop();

    let camContainer = document.getElementById('camara');
    camContainer.innerHTML = ''; 

    // Extraemos la foto original limpia (sin romper)
    let dataURLOriginal = foto.canvas.toDataURL("image/png");

    let vistaFoto = document.createElement('img');
    vistaFoto.src = dataURLOriginal;
    vistaFoto.style.width = "100%";  
    vistaFoto.style.height = "100%";
    vistaFoto.style.objectFit = "cover";
    camContainer.appendChild(vistaFoto);

    // 🔥 LA CLAVE: Guardamos la foto limpia original en el almacenamiento local
    localStorage.setItem('foto_original', dataURLOriginal);

    select('#btnFoto').html('[ FOTO TOMADA ]');
  } else {
    alert('<Ya te has tomado la foto>');
  }
}

function entrarPagina() {
  if (foto === null) {
    alert('<ERROR: Es obligatorio tomarse una foto antes de ingresar>');
    return; 
  }

  let email = document.getElementById('email').value; 
  let nombre = document.getElementById('nombre').value; 

  if (email === '' || nombre === '') {
    alert('<Completá tu email y nombre antes de entrar>');
    return; 
  }

  localStorage.setItem('email', email);
  localStorage.setItem('nombre', nombre);
  
  // Entramos directo sin demoras. La subida se resolverá en la galería colectiva.
  window.location.href = 'navegador.html';
}