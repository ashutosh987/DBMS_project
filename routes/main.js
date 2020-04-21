const express=require("express");
const router=express();
const myconnection=require("./connection");


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
module.exports=router;