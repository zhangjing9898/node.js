//03  动画schema和对象
var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/mongoose');

var db=mongoose.connection;
db.once('open',function (callback) {
    console.log()
});

//博客的结构
var animalSchema=new mongoose.Schema({
    "name":String,
    "type":String
});
animalSchema.methods.zhaotonglei=function (callback) {
    this.model('Animal').find({"type":this.type},callback);
}
var Animal=mongoose.model("Animal",animalSchema);



// Animal.create({"name":"汤姆","type":"猫"});
// Animal.create({"name":"咪咪","type":"猫"});
// Animal.create({"name":"小白","type":"狗"});
// Animal.create({"name":"Snoopy","type":"狗"});

Animal.findOne({"name":"小白"},function (err,result) {
    // console.log("result"+result);
    var dog=result;
    dog.zhaotonglei(function (err,result) {
        console.log(result);
    })
})