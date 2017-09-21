/* post请求的提交 */
var http=require("http");
var querystring=require("querystring");
var fs = require("fs");
var path = require("path");
var url = require("url");
//创建服务器
var server=http.createServer(function (req,res) {

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
    if(req.url=="/dopost"&&req.method.toLocaleLowerCase()=="post"){
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
        var alldata="";
        //下面是post请求接收的一个公式
        //node为了追求极致，它是一个小段一个小段接收的。
        //接受了一小段，可能就给别人去服务了。防止一个过大的表单阻塞了整个进程
        req.addListener("data",function (chunk) {
            alldata+=chunk;
        });
        //全部传输完毕
        req.addListener("end",function () {
            var datastring=alldata.toString();
            res.end("success");
            //当datastring转为一个对象
            var dataObj=querystring.parse(datastring);
            console.log(dataObj);
            console.log(dataObj.name);
            console.log(dataObj.sex);
        })
    }
});
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
server.listen(3000,"127.0.0.1");