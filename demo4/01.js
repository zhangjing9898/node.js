/* 这是个有意思的案例，每次访问127.0.0.1/都会往数据库写入一个哈哈*/
var express=require("express");
//数据库引用
var MongoClient=require('mongodb').MongoClient;
var assert = require('assert');

var app=express();

//数据库连接的地址，最后的斜杠表示数据库的名字
var dataBaseURL='mongodb://127.0.0.1:27017/itcast';

app.get("/",function (req,res) {
    //连接数据库，这是一个异步的操作
    MongoClient.connect(dataBaseURL,function (err,db) {
        if(err){
            res.send("数据库连接失败!");
            return;
        }
        res.write("恭喜您，数据库已经成功连接 \n");
        db.collection("teacher").insertOne({"name":"哈哈"},function (err,result) {
            if(err){
                res.send("数据库写入失败");
                return;
            }
            res.write("恭喜，数据已经成功插入");
            res.send();
            //关闭数据库
            db.close();
        })
    })
})

app.listen(3000);