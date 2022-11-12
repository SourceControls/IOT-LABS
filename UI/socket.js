

var socket = io.connect("localhost");
socket.on('connected', function (msg) {
  console.log(msg, { io });
});

socket.on('updateData', function (msg) {
  console.log(msg);
})

export default socket;