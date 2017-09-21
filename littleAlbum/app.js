var express=require("express");
var app=express();
var router=require("./controller/router");

app.set("view engine","ejs");

//路由中间价
//静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));
//首页
app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbum);
app.get("/up",router.showUp);
app.post("/up",router.doPost);

//404页面
app.use(function (req,res) {
    res.render("err");
})

app.listen(3000);