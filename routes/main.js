const express=require("express");
const router=express();
const myconnection=require("./connection");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.get("/",(req,res)=>{

    var prop_id="";
    var state="";
  console.log(req.session.username);

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
router.get("/logout",(req,res)=>{

req.session.loggedin=false;
res.redirect("/login");
	
})
router.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		myconnection.query('SELECT * FROM agent WHERE agent_name = ? AND pass_word = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				request.session.user_id= results[0].agent_id;
				response.redirect('/agent/'+results[0].agent_id+'/profile');
				
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
router.post('/login_as_real_estates', function(request, response) {


	if(request.body.password==='12345'){
		response.redirect('/real_estates');
	}
	else{
		response.send('Incorrect  Password!');
	}


})
module.exports=router;