var http = require("http");

var server = http.createServer(function (req,res) {
    res.writeHead(200,{
        "Content-type":"text/html;charset=UTF-8"
    });
    res.end("我买了5个iphone"+(1+2+3)+"s");
});

//运行服务器,监听3000端口，端口号可更改
server.listen(3000,"127.0.0.1");