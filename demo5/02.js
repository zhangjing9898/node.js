//把常用的增删改查，都封装成为module。
//开发DAO：J2EE开发人员使用数据访问对象（DAO）设计模式把底层的数据访问逻辑和高层的商务逻辑分开.实现DAO模式能够更加专注于编写数据访问代码.
//使用我们自己的DAO模块，来实现数据库插入。代码变得简单。

var express=require("express");
var app=express();
var db=require('./model/db');

//插入数据，使用我们自己封装db模块，就是DAO.
app.get("/charu",function (req,res) {
    //三个参数，往哪个集合中增加，增加什么，增加之后做什么
    db.insertOne("teacher",{"name":"小红"},function (err,result) {
        if(err){
            console.log("插入失败");
            return;
        }
        res.send("插入成功！");
    })
})

//查找
app.get("/du",function (req,res) {
    //这个页面现在接受一个page参数
    var page=parseInt(req.query.page); //express中读取get参数很简单
    //查找4个参数，在哪个集合查，查什么，分页设置，查完之后做什么
    db.find("canguan",{},{"pageamount":6,"page":page},function (err,result) {
        if(err){
            console.log(err);
        }
        res.send(result);
        console.log(result.length);
    })
})

//删除
app.get("/shan",function (req,res) {
    var borough=req.query.borough;
    db.deleteMany("canguan",{"borough":borough},function (err,result) {
        if(err){
            console.log(err);
        }
        res.send(result);
    })
})

//修改
app.get("/xiugai",function (req,res) {
    db.updateMany(
        "canguan",//集合名字
        {
            "borough":"Manhatata"    //改什么
        },
        {
            $set:{borough:"北京"}    //怎么改
        },
        function (err,result) {   //改完之后做什么
            if(err){
                console.log(err);
            }
            res.send(result);
        }
    )
})

app.listen(3000);