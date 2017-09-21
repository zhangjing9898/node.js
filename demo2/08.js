var sd=require("silly-datetime");

//需要使用一个日期时间，格式为 201709181826
var time=sd.format(new Date(),'YYYYMMDDHHmm');
console.log(time);