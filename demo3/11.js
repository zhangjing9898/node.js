//res.render()和res.send();
var express=require("express");
var app=express();

app.set("view engine","ejs");

app.get("/",function (req,res) {
    res.render("haha",{news:[]});
})

app.get("/check",function (req,res) {
    res.send({
        "user":"ok"
    });
});

app.listen(3000);