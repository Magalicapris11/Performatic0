let paginasDestino = [ 
  'collage.html',
  'fotos.html',
  'microfono.html',
  'navegador.html',
  'tucuenta.html',
  'video.html'
];

let ejecutandoAccion = false;
let tiempoDeEspera = 1200;

function setup() {

  let contenedor = document.querySelector('.contenedor-todas');

  let canvas = createCanvas(
    contenedor.clientWidth,
    contenedor.clientHeight
  );

  canvas.parent('p5');

  clear();
  

}

function draw() {

  clear();

  // si el mouse sale del canvas
  if (
    mouseX < 0 ||
    mouseX > width ||
    mouseY < 0 ||
    mouseY > height
  ) {

    ocultarSiluetas();

  }

}

function mouseMoved() {

  ocultarSiluetas();

  let tercio = width / 3;

  // IZQUIERDA
  if (mouseX < tercio) {

    document.getElementById('dylan')
    .classList.add('mostrar-silueta');

  }

  // MEDIO
  else if (
    mouseX >= tercio &&
    mouseX < tercio * 2
  ) {

    document.getElementById('emma1')
    .classList.add('mostrar-silueta');

  }

  // DERECHA
  else {

    document.getElementById('dorel')
    .classList.add('mostrar-silueta');

  }

}

function mousePressed() {

  if (ejecutandoAccion) {
    return;
  }

  ejecutandoAccion = true;

  let tercio = width / 3;

  // IZQUIERDA
  if (mouseX < tercio) {

    document.getElementById('dylan')
    .classList.add('mostrar-silueta');

  }

  // MEDIO
  else if (
    mouseX >= tercio &&
    mouseX < tercio * 2
  ) {

    document.getElementById('emma1')
    .classList.add('mostrar-silueta');

  }

  // DERECHA
  else {

    document.getElementById('dorel')
    .classList.add('mostrar-silueta');

  }

  // pagina random
  let enlaceDestino = random(paginasDestino);

  setTimeout(() => {

    window.location.href = enlaceDestino;

  }, tiempoDeEspera);

}

function ocultarSiluetas() {

  document.getElementById('dorel')
  .classList.remove('mostrar-silueta');

  document.getElementById('dylan')
  .classList.remove('mostrar-silueta');

  document.getElementById('emma1')
  .classList.remove('mostrar-silueta');

}

function windowResized() {

  let contenedor = document.querySelector('.contenedor-todas');

  resizeCanvas(
    contenedor.clientWidth,
    contenedor.clientHeight
  );

}