//05  内嵌文档

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/chooseClass');

var db=mongoose.connection;
db.once('open',function (callback) {
    console.log("数据成功开启！");
})

//学生
var studentSchem=new mongoose.Schema({
    "name":String,
    "age":Number,
})