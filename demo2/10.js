/*router是外置的一个js文件，让程序可读性强*/

var http=require("http");
var router=require("./router");

//创建服务器
var server=http.createServer(function (req,res) {
    if(req.url=="/"){
        router.showIndex(req,res);
    }else if(req.url.substr(0,9)=='/student/'){
        router.showStudent(req,res);
    }else{
        router.show404(req,res);
    }
});

server.listen(3000,"127.0.0.1");