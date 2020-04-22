const express=require("express");
const router=express();
const myconnection=require("./connection");
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.get("/:id/profile",isLoggedIn,(req,res)=>{
	var sql="(SELECT a.agent_id,a.agent_name,p.prop_id,p.state,p.htype,bu.buyer_name,p.street FROM agent a,buy b,buyer bu,property p where a.agent_id=? and b.agent_id=a.agent_id and b.buyer_id=bu.buyer_id and bu.prop_id=p.prop_id) UNION "+
	"(SELECT a.agent_id,a.agent_name,p.prop_id,p.state,p.htype,bu.buyer_name,p.street FROM agent a,rent r,buyer bu,property p where a.agent_id=? and r.agent_id=a.agent_id and r.buyer_id=bu.buyer_id and bu.prop_id=p.prop_id);";
	myconnection.query(sql,[req.params.id,req.params.id],function (error,agents) {
		if (agents) {		
		res.render("agent_profile",{agent:agents});
		}
		else{
			res.send('nothing for you');
		}
	});
	});
	
	router.get("/:id/add",isLoggedIn,(req,res)=>{
		res.render("add",{agent_id:req.params.id});
		});

router.post("/:id/add",isLoggedIn,(req,res)=>{
		var agent_id=req.params.id;
		var prop_id=req.body.prop_id;
		var type=req.body.type;
		var buyer_id=req.body.buyer_id;
		var buyer_name=req.body.buyer_name;
		var duration=req.body.duration;
		var buying_date=req.body.buying_date;
		if(type=="sale"){
			var sql="insert into buyer(buyer_id,prop_id,buyer_name,buying_date)values(?,?,?,?);insert into buy(buyer_id,agent_id)values(?,?);";
			myconnection.query(sql,[buyer_id,prop_id,buyer_name,buying_date,buyer_id,agent_id],function (error,results) {
				if(results)	{	
				res.redirect('/agent/'+agent_id+'/profile');
				}
				else{
					res.send('nothing for you');
				} 
			});		
		}
		else{
			var sql="insert into buyer(buyer_id,prop_id,buyer_name,buying_date)values(?,?,?,?);insert into rent(buyer_id,agent_id,duration_in_yrs)values(?,?,?);";
			myconnection.query(sql,[buyer_id,prop_id,buyer_name,buying_date,buyer_id,agent_id,duration],function (error,results) {		
				if(results)	{	
					res.redirect('/agent/'+agent_id+'/profile');
					}
					else{
						res.send('nothing for you');
					} 
			});	
		}
	});

//middleware authentication
function isLoggedIn(req,res,next){
    if(req.session.user_id == req.params.id){
        return  next();
    }
    res.redirect("/login");
}
module.exports=router;