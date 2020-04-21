const express=require("express");
const router=express();
const myconnection=require("./connection");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.get("/",(req,res)=>{

    var prop_id="";
    var state="";

    myconnection.query('SELECT * FROM property',function (error,results) {
        prop_id=results[0].prop_id;
        state=results[0].state;
        console.log(results[0].prop_id);
        res.render("index",{property:results});

    });
    var property={
        "prop_id":prop_id,
        "state":state
    }



});
router.get("/login",(req,res)=>{
res.render("login")
});
router.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		myconnection.query('SELECT * FROM agent WHERE agent_name = ? AND pass_word = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


module.exports=router;