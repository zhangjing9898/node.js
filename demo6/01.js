//md5加密函数
var crypto = require("crypto");

console.log(md5(md5("zhangjing").substr(11,7)+md5("zhangjing")));

function md5(mingma) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(mingma).digest('base64');
    return password;
}


