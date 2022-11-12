

// init app
const app = require('./component/app');

const MongoClient = require('mongodb').MongoClient;
const DBUri = "mongodb+srv://TuanHung:asd123456@mydb.wkc1cth.mongodb.net/test";


app.get('/insertSensorData', async (req, res) => {
  var myobj = { ...req.query, time: getCurrentTime() };
  try {
    var db = await MongoClient.connect(DBUri);
    var dbo = db.db("IOT-DIEMDANHQR");
    // http://localhost/insertSensorData?MSV=N19DCCN069&LHP=LHP01
    var rs = await dbo.collection("NhietDoDoAm").insertOne(myobj);
    db.close();
    console.log(rs);
    io.emit('updateData', myobj);
    res.send('1 document inserted')
  } catch (error) {
    console.log(error.message);
  }
})

app.get('/', async (req, res) => {
  try {
    var db = await MongoClient.connect(DBUri);
    var dbo = db.db("IOT-DIEMDANHQR");
    var rs = await dbo.collection("NhietDoDoAm").find({}, { projection: { _id: 0 } }).limit(10).sort({ time: 1 }).toArray();
    db.close();
    console.log(rs);
    res.send(rs)
  } catch (error) {
    console.log(error.message);
  }
})



//init sever and socket
const socket = require('./component/socket');
const io = socket(app, 80);

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