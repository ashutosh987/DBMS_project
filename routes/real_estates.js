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
	
	router.post("/search",(req,res)=>{
	var city=req.body.city;
	var address1=req.body.amount1;
	var address2=req.body.amount2;
		if(city&&address1){
			myconnection.query('select * from property where city=? and price between ? and ?',[city,address1,address2],function (error,results) {
				if(results)	{	
					res.render("search",{results:results});
				}
				else{
					res.send('nothing for you');
				} 
			});	

		}
		else if(city){
			myconnection.query('select * from property where city=?',[city],function (error,results) {
				if(results)	{	
				//res.redirect('/agent/'+agent_id+'/profile');
				res.render("search",{results:results});
				}
				else{
					res.send('nothing for you');
				} 
			});	

		}
		else{
			myconnection.query('select * from property where   price between ? and ?',[address1,address2],function (error,results) {
				if(results)	{	
					//res.redirect('/agent/'+agent_id+'/profile');
					res.render("search",{results:results});
				}
				else{
					res.send('nothing for you');
				} 
			});	

		}

	
	})




    module.exports=router;