exports.showIndex=showIndex;
exports.showStudent=showStudent;
exports.show404=show404;

function showIndex(req,res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end("我是首页");
}

function showStudent(req,res) {
    var id=req.url.substr(9);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end("我是学生页面"+id);
}

function show404(req,res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end("404页面");
}