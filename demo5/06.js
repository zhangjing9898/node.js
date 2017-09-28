//真正的登陆验证，使用了数据库
var express=require("express");
var db=require("./model/db");
var session=require("express-session");

var app=express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine","ejs");

app.get("/",function (req,res) {
    if(req.session.login=="1"){
        res.send("欢迎"+req.session.username);
    }else{
        res.send("没有成功登陆");
    }
});

app.get("/login",function (req,res) {
    res.render("denglu");
});

app.get("/checklogin",function (req,res) {
    var realUsername=req.query.username;
    var realPassword=req.query.password;
    //根据用户填写的姓名，去数据库中找这个，读取密码
    //如果读取的密码，和填写的密码一样，登陆成功！
    //如果读取的密码，和填写的密码不一样，登陆失败
    //如果根本没有找到这个记录，那么说明这个用户填写错误
    db.find("users",{"username":realUsername},function (err,result) {
        if(result.length==0){
            res.send("你的账号错误，没有这个注册用户");
            return;
        }
        var dataBasePassword=result[0].password;
        if(dataBasePassword==realPassword){
            req.session.login="1";
            req.session.username=result[0].username;
            res.send("成功登陆！你是"+result[0].username);
        }else{
            res.send("密码错误！");
        }
    })
})


app.listen(3000);