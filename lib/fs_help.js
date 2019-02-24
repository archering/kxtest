
let fs = require("fs");

let help = {
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
    }


}

module.exports = help;