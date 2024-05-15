const express=require("express");
const path=require('path');
const app=express();

var publicDir=path.join(__dirname,'public');
app.use('/public',express.static(publicDir));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/ar.html")
});

app.listen(3000,function(){
    console.log("server is running on localhost:3000");
});