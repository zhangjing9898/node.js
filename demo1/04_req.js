var http = require("http");

http.createServer(function (req,res) {
    console.log(req.url);
    res.end();
}).listen(3000,"127.0.0.1");