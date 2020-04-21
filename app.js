const express=require('express');
const app=express();

server = app.listen(process.env.PORT || 3000, listening);
const manirouter=require("./routes/main");
app.use("/",manirouter);

app.set("view engine", "ejs");


function listening() {
    console.log("server is running");
  }
