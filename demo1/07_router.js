var http=require("http");

var server=http.createServer(function (req,res) {
    //得到url
    var userurl=req.url;

    res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});

    //substr函数用于判断开头
    if(userurl.substr(0,9)=='/student/'){
        var studentId=userurl.substr(9);
        if(/^\d{10}$/.test(studentId)){
            res.end("您要查询的学生信息，id为："+studentId);
        }else{
            res.end("学生学号位数不对");
        }
    }else if(userurl.substr(0,9)=='/teacher/'){
        var teacherId=userurl.substr(9);
        if(/^\d{6}$/.test(teacherId)){
            res.end("您要查询老师信息，id为:"+teacherId);
        }else{
            res.end("老师工号位数不对");
        }
    }else{
        res.end("请检查您的url");
    }

});

server.listen(3000,"127.0.0.1");