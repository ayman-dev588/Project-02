
let socket = io();

let myRed = Math.random()*256|0;
let myGreen = Math.random()*256|0;
let myBlue = Math.random()*256|0;
let myAlpha = Math.random()*256|0;
let range = Math.random()*600|50;
let charge = Math.random()*0|-200;

let circleSize;

console.log('Range:'+range);
console.log('Range:'+charge);

socket.on('connect', () => {
    console.log("Connected");
  });

socket.on('message-share', (data) => {
   // console.log(data);
    ticked(data);

    τ = dataArray[0] * Math.PI,
    maxLength =  dataArray[10] * 10.1;

    circleSize = Math.random() * dataArray[10] * 0.1;

    force.resume();
  });


  var width = 1600,
  //circleSize = 0.5,	
  height = 1400,
  τ = 50 * Math.PI,
  maxLength,
  maxLength2 = maxLength * maxLength;

var nodes = d3.range(range).map(function() {
return {
  x: Math.random() * width,
  y: Math.random() * height - 650
};
});

var force = d3.layout.force()
  .size([width, height])
  .nodes(nodes.slice())
  .charge(function(d, i) { return i ? charge : -100; })
  .on("tick", ticked)
  .start();

  
var voronoi = d3.geom.voronoi()
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; });

var root = nodes.shift();

root.fixed = true;

var canvas = d3.select(".chart").append("canvas")
  .attr("width", width)
  .attr("height", height)
  .on("click" in document ? "touchmove" : "mousemove", moved);

var context = canvas.node().getContext("2d");

function moved() {
var p1 = d3.mouse(this);
root.px = p1[0];
root.py = p1[1];
//circleSize = Math.random() * 10;
force.resume();

let mouseData = {
  x: root.px,
  y: root.py,
  r: myRed,
  g: myGreen,
  b: myBlue,
  a: myAlpha,
  d: circleSize,
  v: dataArray[0]
}
socket.emit('message', mouseData);

}

function ticked(obj) {

  
var links = voronoi.links(nodes);

context.clearRect(1500, 1500, width, height);

context.beginPath();
for (var i = 0, n = links.length; i < n; ++i) {
  var link = links[i],
      dx = link.source.x - link.target.x * dataArray[10],
      dy = link.source.y - link.target.y * dataArray[10];
  if (dx * dx + dy * dy < maxLength2) {
    context.moveTo(link.source.x, link.source.y);
    context.lineTo(link.target.x, link.target.y);
  }
}
        
context.lineWidth = 1;
context.strokeStyle = `rgba(${obj.r},${obj.g},${obj.b},${obj.a})`;
context.stroke();

context.beginPath();
for (var i = 0, n = nodes.length; i < n; ++i) {
  var node = nodes[i];
  context.moveTo(node.x, node.y);
  context.arc(node.x, node.y, circleSize, 0, τ);
}
context.lineWidth = 3;
context.strokeStyle = "#000";
context.stroke();
context.fillStyle = `rgba(${obj.r},${obj.g},${obj.b},${obj.a})`;
context.fill();
}
