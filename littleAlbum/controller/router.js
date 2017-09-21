var file = require("../modules/file.js");
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");

//首页
exports.showIndex=function (req,res) {
    //错误的：传统思维，不是node的思维
    // res.render("index",{
    //     "albums":file.getAllAlbums()
    // });

    //这才是node.js的编程思维，所有东西，都是异步的
    //所以，内层函数，不是return回来东西，而是调用高层函数提供的
    //回调函数，把数据当做回调函数的参数来使用
    file.getAllAlbums(function (err,allAlbums) {
        //err是字符串
        if(err){
            next();//交给下面适合它的中间件
            return;
        }
        res.render("index",{
            "albums":allAlbums
        })
    })

}

//相册页
exports.showAlbum=function (req,res,next) {
    //遍历相册中的所有图片
    var albumName=req.params.albumName;
    //具体业务交给module
    file.getAllImagesByAllAlbumName(albumName,function (err,imagesArray) {
        if(err){
            next();//交给下面的中间件
            return;
        }
        res.render("album",{
            "albumname":albumName,
            "images":imagesArray
        })
    })
}

//显示上传
exports.showUp=function (req,res) {
    //命令file模块（这是我们自己写的函数模块） 调用里面的getAllAlbums函数
    //得到所有文件夹名字之后做的事情，写在回调函数里面
    file.getAllAlbums(function (err,ablums) {
        res.render("up",{
            albums:ablums
        })
    })
}

//上传表单
exports.doPost=function (req,res) {
    var form = new formidable.IncomingForm();

    //先暂时传到tempup 这个中间文件夹中，再转移
    form.uploadDir=path.normalize(__dirname+"/../tempup/");

    form.parse(req,function (err,fields,files,next) {
        console.log(fields);
        console.log(files);

        if(err){
            next();
            return;
        }
        //判断文件大小
        var size=parseInt(files.tupian.size);
        if(size>5000){
            res.send("图片尺寸应该小于5M");
            //删除图片
            fs.unlink(files.tupian.path);
            return;
        }

        //改名
        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);

        var wenjianjia = fields.wenjianjia;
        var oldpath = files.tupian.path ;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                res.send("改名失败");
                return;
            }
            res.send("成功");
        });

    });
    return;
}