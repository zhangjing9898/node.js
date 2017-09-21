var fs=require("fs");

//这个函数的callback中含有2个参数，一个是err
//另一个是存放所有文件夹名字的array

exports.getAllAlbums=function (callback) {
    fs.readdir("./uploads",function (err,files) {
        if(err){
            callback("没有找到uploads文件",null);
        }
        var allAlbums=[];
        //迭代器
        (function iterator(i) {
            if(i==files.length){
                //遍历结束
                console.log(allAlbums);
                callback(null,allAlbums);
                return;
            }
            //fs.stat 获取文件信息
            fs.stat("./uploads/"+files[i],function (err,stats) {
                if(err){
                    callback("找不到文件"+files[i],null);
                }
                //stats.isDirectory()如果是目录返回 true，否则返回 false。
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);
    });
}

//通过文件名，得到所有图片
exports.getAllImagesByAllAlbumName=function (albumName,callback) {
    fs.readdir("./uploads/"+albumName,function (err,files) {
        if(err){
            callback("没有找到该相册中的照片!",null);
            return;
        }
        var allImages=[];
        //迭代器
        (function iterator(i) {
            if(i==files.length){
                //遍历结束
                console.log(allImages);
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],function (err,stats) {
                if(err){
                    callback("找不到图片"+files[i],null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);
    })
}