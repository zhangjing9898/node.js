//app.use(express.static("./public"));

var express=require("express");

var app=express();

//静态服务
app.use("/jingtai",express.static("./public"));

//新的路由
app.get("/images",function (req,res) {
    res.send("哈哈哈");
})

//会自动识别err参数，如果有，那么这个函数就能捕获err
app.use(function (req,res) {
    res.status(404).send("没有这个页面!");
})

app.listen(3000);