const express=require('express');
const app=express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
server = app.listen(process.env.PORT || 3000, listening);
const manirouter=require("./routes/main");
app.use("/",manirouter);

app.set("view engine", "ejs");


function listening() {
    console.log("server is running");
  }
