var express=require("express");
var app=express();
var router=require("./router/router");

var session=require("express-session");

//使用session
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}));

//模板引擎
app.set("view engine","ejs");

//静态页面
app.use(express.static("./public"));
app.use("/avatar",express.static("./avatar"))

//路由表
app.get("/",router.showIndex);     //显示首页
app.get("/regist",router.showRegist);     //显示注册页面
app.post("/doregist",router.doRegist);      //执行注册，Ajax服务
app.get("/login",router.showLogin);    //显示登录页面
app.post("/dologin",router.doLogin);    //执行登录
app.get("/setavatar",router.showSetavatar);     //设置头像页面
app.post("/dosetavatar",router.dosetavatar);   //执行设置头像，ajax服务
app.get("/cut",router.showcut);   //剪裁头像
app.get("/docut",router.docut);   //执行裁剪


app.listen(3000);