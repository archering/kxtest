
let fs = require("fs");
let path = require("path");
let rec = require("./record");
let draw = require("./draw");
let promisify = require("util").promisify;
const readdir = promisify(fs.readdir);
let help = {
    record:null,
    /**
     * 读取路径信息
     * @param {string} path 路径
     */
    getStat : function (path){
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if(err){
                    resolve(false);
                }else{
                    resolve(stats);
                }
            })
        })
    },
    
    /**
     * 创建路径
     * @param {string} dir 路径
     */
    mkdir : function (dir){
        return new Promise((resolve, reject) => {
            fs.mkdir(dir, err => {
                if(err){
                    resolve(false);
                }else{
                    resolve(true);
                }
            })
        })
    },
    
    /**
     * 路径是否存在，不存在则创建
     *** @param {string} dir 路径
     */
    dirExists :async function (dir){
        let isExists = await this.getStat(dir);
        //如果该路径且不是文件，返回true
        if(isExists && isExists.isDirectory()){
            return true;
        }else if(isExists){     //如果该路径存在但是文件，返回false
            return false;
        }
    },

    getStructure : function(rootPath,level,rec_arr){
        let that = this;
        let root = rootPath.match(/[^\/]+$/i)[0];
        level = level || 0;
        draw.setText(root,level);
        if(rec_arr && {}.toString.call(rec_arr)=="[object Array]")  rec_arr.push({layer:level,name:root});
        fs.readdir(rootPath,function(err,files){
            if(err){
                console.log("path error, pls retry check  : "  +rootPath);
            }else{
                level++;
                files.forEach(function(filename,index){
                    let innerPath = path.resolve(path.join(rootPath,"/"+filename));
                    fs.stat(innerPath,function(err,stats){
                        if(err){
                            console.log("get stats wrong");
                        }else{
                            if(stats.isDirectory()){
                                that.getStructure(innerPath,level,rec_arr);
                            }else{
                                draw.setText(filename,level);
                            }
                        }
                    });
                });
            }
        });
    } ,
    getStructure2 :  function(rootPath,level,rec_arr){
        let that = this;
        let root = rootPath.match(/[^\/]+$/i)[0];
        level = level || 0;
        draw.setText(root,level);
        return new Promise(function(resolve,reject){
            readdir(rootPath).then(function(files){
                if(rec_arr && {}.toString.call(rec_arr)=="[object Array]")  rec_arr.push({layer:level,name:root,folder:true});
                level++;
                files.forEach(function(filename,index){
                    let innerPath = path.resolve(path.join(rootPath,"/"+filename));
                    fs.stat(innerPath,function(err,stats){
                        if(err){
                            console.log("get stats wrong");
                        }else{
                            if(stats.isDirectory()){
                                that.getStructure(innerPath,level,rec_arr);
                            }else{
                                draw.setText(filename,level);
                                if(rec_arr)  rec_arr.push({layer:level,name:filename,folder:false});
                            }
                        }
                    });
                });
                resolve(rec_arr);
            }).catch(function(err){
                console.log("path error, pls retry check  : "  +rootPath);
                reject(false,err);
            });
        });
      
    } ,    
    
    getSkeletonData : function(rootPath){
        var arr = [];
        this.getStructure2(rootPath,0,arr).then(function(arr){
            console.log(arr);
        });
    }


}

module.exports = help;