let socket = io();

let myRed = Math.random()*256|0;
let myGreen = Math.random()*256|0;
let myBlue = Math.random()*256|0;
let myAlpha = Math.random()*256|0;
let range = 500;
let charge = -500;

let circleSize;

let slider1Value, slider2Value, slider3Value, slider4Value, color1Value, color2Value, color3Value, color4Value;



console.log('Range:'+range);
console.log('Range:'+charge);

socket.on('connect', () => {
    console.log("Connected");
  });

socket.on('message-share', (data) => {
   // console.log(data);
    ticked(data);

    τ = dataArray[10] * Math.PI,
    //maxLength =  slider4Value;
    //maxLength2 = maxLength * maxLength;

    circleSize = Math.random() * dataArray[10] * 0.1 * slider3Value;

    force.resume();
  });


  var width = 1600,
  //circleSize = 0.5,	
  height = 1400,
  τ = 50 * Math.PI,
  maxLength,
  maxLength2;

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
  ra: range,
  ch: charge,
  v: dataArray[0]
}
socket.emit('message', mouseData);

}

function ticked(obj) {

range = slider3Value;
charge = slider3Value;
  
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
        
context.lineWidth = slider1Value;
context.strokeStyle = color3Value;
context.stroke();

context.beginPath();
for (var i = 0, n = nodes.length; i < n; ++i) {
  var node = nodes[i];
  context.moveTo(node.x, node.y);
  context.arc(node.x, node.y, circleSize, 0, τ);
}
context.lineWidth = slider2Value;
context.strokeStyle = color2Value;
context.stroke();
context.fillStyle = color1Value;
context.fill();
}


let debounceTimeout;

sendData();

function sendData() {


    // Clear the previous timeout
    clearTimeout(debounceTimeout);

    // Set a new timeout to send data after 500ms of no activity
    debounceTimeout = setTimeout(() => {
         slider1Value = document.getElementById('slider1').value;
         slider2Value = document.getElementById('slider2').value;
         slider3Value = document.getElementById('slider3').value;
         slider4Value = document.getElementById('slider4').value;
         color1Value = document.getElementById('colorPicker1').value;
         color2Value = document.getElementById('colorPicker2').value;
         color3Value = document.getElementById('colorPicker3').value;
         color4Value = document.getElementById('colorPicker4').value;

         document.body.style.backgroundColor = color4Value;


        const data = {
            slider1: slider1Value,
            slider2: slider2Value,
            slider3: slider3Value,
            slider4: slider4Value,
            color1: color1Value,
            color2: color2Value,
            color3: color3Value,
            color4: color4Value
        };

        fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log('Response from server:', data))
        .catch((error) => console.error('Error:', error));
    }, 500); // Wait 500ms after the user stops interacting
}

// Add event listeners for automatic sending of data on value change
document.getElementById('slider1').addEventListener('input', sendData);
document.getElementById('slider2').addEventListener('input', sendData);
document.getElementById('slider3').addEventListener('input', sendData);
document.getElementById('slider4').addEventListener('input', sendData);
document.getElementById('colorPicker1').addEventListener('input', sendData);
document.getElementById('colorPicker2').addEventListener('input', sendData);
document.getElementById('colorPicker3').addEventListener('input', sendData);
document.getElementById('colorPicker4').addEventListener('input', sendData);



