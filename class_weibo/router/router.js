var formidable=require("formidable");
var db=require("../models/db");
var md5=require("../models/md5");
var path=require("path");
var fs=require("fs");
var gm=require("gm");

//首页
exports.showIndex=function (req,res,next) {
    if(req.session.login=="1"){
        //登录了的
        var username=req.session.username;
        var login=true;
    }else{
        //没有登录
        var username="";   //制定一个空用户名
        var login=false;
    }

    //已经登录
    res.render("index",{
        "login":login,
        "username":username,
        "active":"首页",
        "avatar":"moren.jpg"
    })
}

//注册页面
exports.showRegist=function (req,res,next) {
    res.render("regist",{
        "login":req.session.login=="1"?true:false,
        "username":req.session.login=="1"?req.session.username:"",
        "active":"注册"
    })
}

//注册业务
exports.doRegist = function (req, res, next) {
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        var username = fields.username;
        var password = fields.password;

        //console.log(username,password);
        //查询数据库中是不是有这个人
        db.find("users", {"username": username}, function (err, result) {
            if (err) {
                res.send("-3"); //服务器错误
                return;
            }
            if (result.length != 0) {
                res.send("-1"); //被占用
                return;
            }
            //没有相同的人，就可以执行接下来的代码了：
            //设置md5加密
            password = md5(md5(password) + "张靖");

            //现在可以证明，用户名没有被占用
            db.insertOne("users", {
                "username": username,
                "password": password,
                "avatar": "moren.jpg"
            }, function (err, result) {
                if (err) {
                    res.send("-3"); //服务器错误
                    return;
                }
                req.session.login = "1";
                req.session.username = username;

                res.send("1"); //注册成功，写入session
            })
        });
    });
};

//显示登录页面
exports.showLogin=function (req,res,next) {
    res.render("login",{
        "login": req.session.login == "1" ? true : false,
        "username": req.session.login == "1" ? req.session.username : "",
        "active": "登陆"
    })
}

//登录页面的执行
exports.doLogin=function (req,res,next) {
    //得到用户表单
    var form=new formidable.IncomingForm();
    form.parse(req,function (err,fields,files) {
        //得到表单之后做的事情
        var username=fields.username;
        var password=fields.password;
        var jiamihou=md5(md5(password)+"张靖");
        //查询数据库，这个人是否存在
        db.find("users",{"username":username},function (err,result) {
            if(err){
                res.send("-5");
                return;
            }
            //没有这个人
            if(result.length==0){
                res.send("-1");  //用户名不存在
                return;
            }
            //有的话，查看密码是否匹配
            if(jiamihou==result[0].password){
                req.session.login="1";
                req.session.username=username;
                res.send("1");  //登录成功
                return;
            }else{
                res.send("-2"); //密码错误
                return;
            }
        })
    })
}

//设置头像页面，此时必须保证是登录状态
exports.showSetavatar=function (req,res,next) {
    //必须保证登录
    if(req.session.login!="1"){
        res.send("非法闯入，这个页面要求登录！");
        return;
    }
    res.render("setavatar",{
        "login":true,
        "username":req.session.username||"小花花",
        "active":"修改头像"
    })
}

//设置头像
exports.dosetavatar=function (req,res,next) {
    //必须保证登录
    if(req.session.login!="1"){
        res.send("非法闯入，这个页面要求登录！");
        return;
    }

    var form=new formidable.IncomingForm();
    form.uploadDir=path.normalize(__dirname+"/../avatar");
    form.parse(req,function (err,fields,files) {
        var oldpath=files.touxiang.path;
        var newpath=path.normalize(__dirname+"/../avatar")+"/"+req.session.username+".jpg";
        fs.rename(oldpath,newpath,function (err) {
            if(err){
                res.send("失败");
                return;
            }
            req.session.avatar=req.session.username+".jpg";
            //跳转到切图的业务
            res.redirect("/cut");
        })
    })
}

//显示切图页面
exports.showcut=function (req,res) {
    //必须保证登录
    if(req.session.login!="1"){
        res.send("非法闯入，这个页面要求登录！");
        return;
    }

    res.render("cut",{
        avatar:req.session.avatar
    })
}

//执行切图
exports.docut=function (req,res,next) {
    //必须保证登录
    // if(req.session.login!="1"){
    //     res.send("非法闯入，这个页面要求登录！");
    //     return;
    // }
    console.log("进入切图page！");
   // 这个页面会接收几个get请求参数
    //w h x y
    var filename=req.session.avatar;
    var w=req.query.w;
    var h=req.query.h;
    var x=req.query.x;
    var y=req.query.y;

    gm("./avatar/" + filename)
        .crop(w, h, x, y)
        .resize(100, 100, "!")
        .noProfile()
        .write("./avatar/" + filename, function (err) {
            console.log(__dirname);
            if (err) {
                db.updateMany("users", {"username": req.session.username}, {
                    $set: {"avatar": req.session.avatar}
                }, function (err, results) {
                    res.send("1");
                });
            }
            //更改数据库当前用户的avatar这个值

        });
}