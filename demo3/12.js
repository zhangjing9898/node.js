//get请求

var express=require("express");

var app=express();

app.get("/",function (req,res) {
    console.log(req.query);
    res.end();
})

app.listen(3000);