/**
 * Created by Danny on 2015/9/20 15:35.
 */
var http = require("http");
var formidable = require('formidable');
var util = require("util");
var fs = require("fs");
var path = require("path");
var url = require("url");

//创建服务器
var server = http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    if(pathname.indexOf(".") == -1){
        pathname += "/form.html";
    }
    var fileURL = "./" + path.normalize(pathname);
    var extname = path.extname(pathname);
    //把文件读出来
    fs.readFile(fileURL,function(err,data){
        //读完之后做的事情
        if(err){
            //文件不存在
            res.writeHead(404,{"Content-Type":"text/html;charset=UTF8"})
            res.end("404,页面没有找到");
        }
        //读完之后做的事情
        getMime(extname,function(mime){
            res.writeHead(200,{"Content-Type":mime})
            res.end(data);
        });
    });
    //如果你的访问地址是这个，并且请求类型是post
    if(req.url == "/dopost" && req.method.toLowerCase() == "post"){
        //Creates a new incoming form.
        var form = new formidable.IncomingForm();
        //设置文件上传存放地址
        form.uploadDir = "./uploads";
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function(err, fields, files) {
            if(err){
                throw err;
            }
            console.log(fields);
            console.log(files);
            console.log(util.inspect({fields: fields, files: files}));
            //所有的文本域、单选框，都在fields存放；
            //所有的文件域，files
            res.writeHead(200, {'content-type': 'text/plain'});

            res.end("成功");
        });
    }
});

server.listen(3000,"127.0.0.1");

function getMime(extname,callback){
    //读取mime.json文件，得到JSON，根据extname key ，返回对应的value
    //读取文件
    fs.readFile("./mime.json",function(err,data){
        if(err){
            throw Error("找不到mime.json文件！");
            return;
        }
        //转成JSON
        var mimeJSON = JSON.parse(data);
        var mime =  mimeJSON[extname]  || "text/plain";
        //执行回调函数，mime类型字符串，就是它的参数
        callback(mime);
    });
}