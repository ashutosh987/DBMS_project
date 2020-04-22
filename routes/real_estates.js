const express=require("express");
const router=express();
const myconnection=require("./connection");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.get("/",(req,res)=>{

	myconnection.query('SELECT * FROM agent',function (error,agents) {
		if (agents) {		
		res.render("agents_list",{agent:agents});
		}
		else{
			res.send('nothing for you');
		}
	});
    });
    module.exports=router;