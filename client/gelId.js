
const canvas1 = document.getElementById('canvas-1');
const ctx1 = canvas1.getContext('2d');

const makeSection1 = function () {
  let xPos = 0
  let yPos = 0
  const sect1 = document.getElementById('sect-1')
  sect1.addEventListener('mousedown', setCoor)
  const swatch1 = document.getElementById('swatch-1')
  var dash1 = document.getElementById('dash-1');
  var img = new Image();
  img.src = './images/calibrate.JPG'

  img.onload = function () {
    ctx1.drawImage(img, 0, 0, 300, 400);
  };
// triggered by event listener on mouseclick, gets pixel data for a coordinate in the image
  function setCoor(e) {
    var offset = this.getClientRects()[0];
    xPos = Math.round(e.clientX - offset.left)
    yPos = Math.round(e.clientY - offset.top)

    var pixel = ctx1.getImageData(xPos, yPos, 1, 1);
    var data = pixel.data;
    var rgb = 'rgb(' + data[0] + ', ' + data[1] +
      ', ' + data[2] + ')';
    dash1.textContent = rgb;
    swatch1.style.background = rgb
  }
}

const makeSection2 = function () {
  let xPos = 0
  let yPos = 0
  const sect2 = document.getElementById('sect-2')
  const swatch2 = document.getElementById('swatch-2')
  var dash2 = document.getElementById('dash-2');
  var img = new Image();
  img.src = './images/eigth.jpg'
  var canvas = document.getElementById('canvas-2');
  var ctx = canvas.getContext('2d');

  img.onload = function () {
    ctx.drawImage(img, 0, 0, 300, 400);
  };

  sect2.addEventListener('mousedown', setCoor)

  function setCoor(e) {
    var offset = this.getClientRects()[0];
    xPos = Math.round(e.clientX - offset.left)
    yPos = Math.round(e.clientY - offset.top)
    var pixel = ctx.getImageData(xPos, yPos, 1, 1);
    var data = pixel.data;
    var rgb = 'rgb(' + data[0] + ', ' + data[1] +
      ', ' + data[2] + ')';
    dash2.textContent = rgb;
    swatch2.style.background = rgb
  }
}

makeSection1()
makeSection2()




