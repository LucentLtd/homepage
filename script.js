var fleckColour = '#9d9d9d';
var fleckCount = 500;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var width = window.outerWidth;
var height = window.outerHeight;
var mouse = {
  x: width / 2,
  y: height / 2
};

document.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX || event.pageX;
    mouse.y = event.clientY || event.pageY
}, false);

function Fleck() {
  this.x = width * Math.random() - width * Math.random() / 2 * Math.random();
  this.y = height * Math.random() - height * Math.random() / 2 * Math.random();
  this.size = Math.random() * 15;
}

var flecks = [];
for (i = 0; i < fleckCount; i++) {
  flecks.push(new Fleck());
}

var draw = function() {
  canvas.width = width;
  canvas.height = height;

  for (t = 0; t < flecks.length; t++) {
    var fleck = flecks[t];
    var x = fleck.x + mouse.x / (fleck.size / 0.75);
    var y = fleck.y + mouse.y / (fleck.size / 0.75);
    var color = fleckColour;

    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, fleck.size * 2.5 , Math.PI * 2.2, true);
    context.fill();
  }
}

setInterval(draw, 0);
