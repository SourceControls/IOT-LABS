
function socket(app, port) {
  const server = app.listen(80, function () {
    console.log("App running");
  });
  const io = require('socket.io')(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    console.log('a user connected ||', getCurrentTime());
    socket.on('disconnect', () => {
      console.log('user disconnected ||', getCurrentTime());
    });
    socket.emit('connected', 'socket connected');
    // console.log(socket.handshake.address);
  });
  return io
}
function getCurrentTime() {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  // prints date in YYYY-MM-DD format
  return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}
module.exports = socket;