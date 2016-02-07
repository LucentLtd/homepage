var fleckColour = '#ed1c24';
var fleckCount = 750;
var fleckSizeMultiplier = 14;
var mouseForce = 0.01;
var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var mouse = {
  x: width / 2,
  y: height / 2,
  dx: 0,
  dy: 0
};

document.addEventListener('mousemove', function (event) {
    mouse.dx = event.clientX - mouse.x;
    mouse.dy = event.clientY - mouse.y;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}, false);

function Fleck() {
  this.size = Math.random() * fleckSizeMultiplier;
  this.x = width * Math.random();
  this.y = height * Math.random();
  this.velocity = { x: 0, y: 0 };
}

var flecks = [];
for (i = 0; i < fleckCount; i++) {
  flecks.push(new Fleck());
}

var draw = function() {
  canvas.width = width;
  canvas.height = height;

  var angle = Math.atan2(-mouse.dx, -mouse.dy);
  var force = mouseForce;

  var accelX = force * Math.sin(angle);
  var accelY = force * Math.cos(angle);

  for (t = 0; t < flecks.length; t++) {
    var fleck = flecks[t];

    fleck.velocity.x += accelX;
    fleck.velocity.y += accelY;

    if (fleck.velocity.x > 1) fleck.velocity.x = 1;
    if (fleck.velocity.x < -1) fleck.velocity.x = -1;
    if (fleck.velocity.y > 1) fleck.velocity.y = 1;
    if (fleck.velocity.y < -1) fleck.velocity.y = -1;

    fleck.x = fleck.x + fleck.velocity.x / fleck.size;
    fleck.y = fleck.y + fleck.velocity.y / fleck.size;

    context.beginPath();
    context.fillStyle = fleckColour;
    context.arc(fleck.x, fleck.y, fleck.size * 2.55 , Math.PI * 2.25, true);
    context.fill();

    if (fleck.x > width) {
      fleck.x = fleck.x - width;
    } else if (fleck.x < 0) {
      fleck.x = width + fleck.x;
    }

    if (fleck.y > height) {
      fleck.y = fleck.y - height;
    } else if (fleck.y < 0) {
      fleck.y = height + fleck.y;
    }
  }
}

setInterval(draw, 10);
