//04  博客和评论
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/mongoose1");
var db=mongoose.connection;
db.once('open',function (callback) {
    console.log("数据库成功打开");
});

//博客的结构
var blogSchema=new mongoose.Schema({
    title:String,
    author:String,
    body:String,
    comments:[{body:String,date:Date}]
});

//发表评论
blogSchema.methods.pinlun=function (obj,callback) {
    this.comments.push(obj);
    this.save();
}

var Blog=mongoose.model('Blog',blogSchema);

var blog=new Blog({
    "title":"Blog1",
    "author":"张靖",
    "body":"Blog1 content"
});

//寻找一个标题是Blog1的博客，然后发表评论
Blog.findOne({"title":"Blog1"},function (err,blog) {
    console.log("Blog");
    if(!blog){
        return;
    }
    blog.pinlun({"body":"再来一个评论","date":new Date()});
})
