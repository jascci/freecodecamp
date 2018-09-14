
var elem = document.getElementById('sandbox');
var two = new Two({
      //fullscreen: true,
      width: 800,
      autostart: true
}).appendTo(elem);

var mass = 10;
var radius = two.height / 5;
var strength = 0.0625;
var drag = 0.4;

var background = two.makeGroup();
var foreground = two.makeGroup();

var physics = new Physics();
var points = [];
var SPRINGS = [];

function getRandomColor() {
  var color = {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
    toString: function(a) {
      if (a) {
        return 'rgba('
          + color.r + ','
          + color.g + ','
          + color.b + ','
          + a + ')';
      }
      return 'rgb('
        + color.r + ','
        + color.g + ','
        + color.b + ')';
    }
  };
  return color;
}

function resize() {
  background.translation.set(two.width / 4, two.height / 2);
  foreground.translation.copy(background.translation);
}

function draw() {
  for (var i = 0; i < Two.Resolution; i++) {

    var pct = i / Two.Resolution;
    var theta = pct * Math.PI * 2;

    var ax = radius * Math.cos(theta);
    var ay = radius * Math.sin(theta);

    var variance = Math.random() * 0.5 + 0.5;
    var bx = variance * ax;
    var by = variance * ay;
    //console.log(`origin ax, ay = ${ax}, ${ay}`);
    //console.log(`particle bx, by = ${bx}, ${by}`);
    var origin = physics.makeParticle(mass, ax, ay)
    var particle = physics.makeParticle(Math.random() * mass * 0.66 + mass * 0.33, bx, by);
    var spring = physics.makeSpring(particle, origin, strength, drag, 0);

    var springComponent = new Object();
    springComponent.particleA = origin;
    springComponent.posXA = ax;
    springComponent.posYA = ay;
    springComponent.particleB = particle;
    springComponent.posXB = bx;
    springComponent.posYB = by;
    springComponent.spring = spring;
    SPRINGS.push(springComponent);

    origin.makeFixed();

    particle.shape = two.makeCircle(particle.position.x, particle.position.y, 5);
    particle.shape.noStroke().fill = '#fff';
    particle.position = particle.shape.translation;

    foreground.add(particle.shape)
    points.push(particle.position);

  }

  var outer = new Two.Path(points, true, true);
  var color = getRandomColor();
  outer.stroke = color.toString();
  outer.fill = color.toString(0.5);
  outer.scale = 1.75;
  outer.linewidth = 10;

  background.add(outer);

  var inner = new Two.Path(points, true, true);
  inner.noStroke();
  inner.fill = getRandomColor().toString();
  inner.scale = 1.25;

  background.add(inner);

  // Update the renderer in order to generate corresponding DOM Elements.
  two.update();

  $(inner._renderer.elem)
    .css('cursor', 'pointer')
    .click(function(e) {
      inner.fill = getRandomColor();
      //physics.update();
            console.log(`SPRINGS size = ${SPRINGS.length}`);
      for(var j = 0; j < SPRINGS.length; j++)  {
        if (SPRINGS[j].spring.resting())  {
          console.log(`SPRINGS[${j}].spring is at rest`);
          var curLen = SPRINGS[j].spring.currentLength();
          console.log(`currentLength = ${curLen}`);
          SPRINGS[j].spring.b.position.set(SPRINGS[j].posXA,SPRINGS[j].posYA);
          SPRINGS[j].spring.a.position.set(SPRINGS[j].posXB,SPRINGS[j].posYB);
          //SPRINGS[j].spring.a.makeFixed();
          if (SPRINGS[j].spring.b.fixed)  {
            console.log(`spring particle b is fixed`);
          }
          SPRINGS[j].spring.update();

        }

      }
      
  });


  resize();
  two
    .bind('resize', resize)
    .bind('update', function() {
      physics.update();
    });
    //.play();

  /*
  _.extend(two.renderer.domElement.style, {
    backgroundPosition: 'center center'
  });*/



}


$(document).ready(function() {



  console.log(`two height = ${two.height}`);
  console.log(`Two Resolution = ${Two.Resolution}`);

  
  draw();


  $("#test").click(function(event)  {
    console.log("test clicked");

  });

  $(".mytest").click(function(event)  {
    console.log("mytest class event detected.");
  });
});


