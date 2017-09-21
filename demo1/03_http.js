var http=require("http");

//创建一个服务器，回调函数表示接收到请求之后做的事情
var server = http.createServer(function (req,res) {
    //req参数表示request，res=response
    // console.log("服务器接收到了请求:"+req.url);
    //每一次都要res.end（）,不然loading会一直转
    res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
    res.write("1121");
    //write和end中都必须是字符串
    res.end("完毕")
});

server.listen(3000,"127.0.0.1");