import socket from './socket.js'


// fetch(api, {
//   method: "POST",
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(data)
// }).then(res => {
//   return res.json();
// }).catch(function (err) {
//   console.log("Error!! " + err);
//   return false;
// });
fetch("http://localhost/").then(res => {
  return res.json();
}).then(res => {
  console.log(res);
}).catch(function (err) {
  console.log("Error!! " + err);
  return false;
});
