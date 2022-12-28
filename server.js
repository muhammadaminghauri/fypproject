var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost:27017/usersdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});




var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(express.static(__dirname + '/views'));
// app.use(express.static(staticPath));
app.use(express.static(path.join(__dirname,'public')));
app.use('*/images',express.static('public/images'));
app.use('*/css',express.static('public/css'));


app.get("/",(req,res)=>{
  res.render("firstpage");
 
});
app.get("/appointment",(req,res)=>{
  res.render("appointment");
 
});
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
  res.render('appointment',{patientname:req.body.patientname});
  res.render('appointment',{age:req.body.age});
  res.render('appointment',{problems:req.body.problems});
  res.render('appointment',{issues:req.body.issues});
  res.render('appointment',{facingproblems:req.body.facingproblems});
  
});
app.post("/appointmentt",async (req,res)=>{
  try{
    console.log(req.body.patientname);
    console.log(req.body.age);
    console.log(req.body.problems);
    console.log(req.body.issues);
    console.log(req.body.problemsfacing);
  }
  catch(error){
res.status(400).send(error);
  }
});






app.use("/appointment",(req,res)=>{
  res.render("appointment");
});

app.get("/index",(req,res)=>{
  res.render("index");
 
});

app.get("/firstpage",(req,res)=>{
  res.render("firstpage");
});
app.use("/assistant",(req,res)=>{
  res.render("assistant");
});
app.get("/assistant",(req,res)=>{
  res.render("assistant");
});


app.get("/login",(req,res)=>{
  res.render("login");
 
});


//router.get('/register', function(req, res) {
  //res.render('path/to/ejs/index');
//});

app.use("/data",(req,res)=>{
  res.render("data");
});



var index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});






const Pat = require ("./models/assistant")


app.get ("/",(req,res)=>{
  res.render("appointment")
})

app.post("assistant",async(req,res)=>{
  const data = new Pat(req.body)
  await data.save()
  res.send("save data")
})












// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});