// tucuenta.js
let imgOriginal;
let fotoCargada = false;

function setup() {
  let camContainer = document.getElementById('camara');
  if (!camContainer) return;

  // Forzamos un tamaño fijo o el del contenedor
  let anchoContenedor = camContainer.offsetWidth || 400;
  let altoContenedor = camContainer.offsetHeight || 400;
  
  let canvas = createCanvas(anchoContenedor, altoContenedor);
  canvas.parent('camara');

  let dataURL = localStorage.getItem('foto_original');
  
  if (dataURL) {
    // p5 maneja la carga de forma segura acá
    imgOriginal = loadImage(dataURL, () => {
      imgOriginal.resize(width, height);
      fotoCargada = true;
      noLoop(); 
      redraw(); // Dibuja una sola vez cuando está lista
    });
  } else {
    background(20);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("[ ERROR: RE-HACER CAPTURA ]", width / 2, height / 2);
  }
}

function draw() {
  if (!fotoCargada || !imgOriginal) {
    background(10); // Pantalla de carga por si tarda un milisegundo
    return;
  }

  background(0);
  let anchoTira = 50;

  // Distorsión de tiras estática
  for (let x = 0; x < width; x += anchoTira) {
    let origenX = int(random(0, width - anchoTira));
    let tira = imgOriginal.get(origenX, 0, anchoTira, height);
    image(tira, x, 0);
  }
}