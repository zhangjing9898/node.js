//01  官网HelloWorld

//引包
var mongoose=require("mongoose");
//创建一个数据库连接
mongoose.connect('mongodb://localhost/mongoose');

//创建一个Cat模型，语法mongoose.model(模型名字，Schema)
//这里省略了一步，就是schema是通过new mongoose.schema(){}创建的
var Cat=mongoose.model('Cat',{
    name:String,
    age:Number,
    sex:String
})

//实例化，实例化的时候，new Cat（数值）
var kitty=new Cat({
    name:"kitty",
    sex:"公猫",
    age:18
})

//保存
kitty.save(function (err) {
    console.log("喵喵");
})

//寻找kitty ，将它改为8岁
Cat.find({"name":"kitty"},function (err,result) {
    var xiaomao=result[0];
    xiaomao.age=8;
    xiaomao.save();
})
