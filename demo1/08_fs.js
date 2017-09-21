var http=require("http");
var fs=require("fs");
var path = require("path");
var server=http.createServer(function (req,res) {
    //不处理小图标
    if(req.url=="/favicon.ico"){

    }
    //给用户加一个五位数的id，探究事件环
    var userId=parseInt(Math.random()*89999)+10000;
    console.log("欢迎"+userId);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    //2个参数，第一个是完整路径，当前目录必须加上./
    //第二个参数，是回调函数，表示文件读取成功之后，做的事
    fs.readFile(path.join(__dirname,"./test/1.txt"),function (err,data) {
        if(err){
            throw err;
        }
        console.log(userId+"文件读取完毕");
        res.end(data);
    })
});

server.listen(3000,"127.0.0.1")