//Jade模板引擎

var express=require("express");

var app=express();

app.engines('jade',require('jade').__express);
app.set("view engine","jade");

app.get("/",function (req,res) {
    console.log(req.ip);
    res.render("xixi");
    res.end();
})

app.listen(3000);