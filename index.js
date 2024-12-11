
let express = require("express");
let app = express();

app.use("/", express.static("public"));

let http = require("http");
let server = http.createServer(app);
let io = require("socket.io");
io = new io.Server(server);
let port = process.env.PORT || 3000;

const bodyParser = require('body-parser');


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the static HTML page
app.use(express.static('public'));

// Handle POST request from frontend
app.post('/submit', (req, res) => {
    const { slider1, slider2, color } = req.body;

    console.log('Received data:', {
        slider1,
        slider2,
        color
    });

    // You can assign these to variables or process as needed
    const slider1Value = parseInt(slider1, 10);
    const slider2Value = parseInt(slider2, 10);
    const colorValue = color;

    // Respond with some data back to the frontend
    res.json({
        message: 'Data received successfully',
        receivedData: {
            slider1Value,
            slider2Value,
            colorValue
        }
    });
});


server.listen(port, () => {
  console.log("App listening at port: " + port);
});

io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);

socket.on('message', (data) => {
  console.log("Received 'message' with the following data:");
  console.log(data);
io.emit('message-share', data);

//Send data to ALL other clients but the sender
// socket.broadcast.emit('message-share', data);

//Send the data just to the sender
// socket.emit('message-share', data);

});

  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});


