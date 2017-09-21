//整体感知Express的路由

var express=require("express");
var app=express();

//无视大小写
app.get("/AAb",function (req,res) {
    res.send("你好！");
})

//冒号
app.get("/student/:id",function (req,res) {
    var id=req.params["id"];
    var reg= /^[\d]{6}$/;
    if(reg.test(id)){
        res.send(id);
    }else{
        res.send("请检查格式！");
    }
});

//冒号
app.get("/:username/:oid",function (req,res) {
    var userName=req.params["username"];
    var oid=req.params["oid"];

    res.write("用户："+userName);
    res.end(oid+"登录了！");
})


app.listen(3000);