/****
 * 
 * deal with event
 * 
 */

 //deps
var dim = require("./dim");
var draw = require("./draw");
var dat = require("./const");
var os = require("os");
var v8 = require("v8");
var fs = require("fs");
var path = require("path");
var fshelp = require("./fs_help");

let fs_help = require("./fs_help");

const CMDS  = Object.keys(dat.SUPPORT);
var responder = {};

 responder.help = function(str){
    draw.text2("How to use this CLI",'redbg',"-");
    dim.top(1);
    for(var i=0;i<CMDS.length;i++){
        draw.text(CMDS[i] + dim.left(40-CMDS[i].length) + dat.SUPPORT[CMDS[i]]);
    }
    dim.top(1);
    draw.hr();

} 
responder.exit = function(str){
    process.exit(0);
}
responder.stats = function(str){
    var stats = {
        "Platfoem": os.platform(),
        'CPU Count':os.cpus().length+'',
        'Free Mems':os.freemem()+'',
        "uptime":os.uptime()+'(s)',
        'Current Mems':v8.getHeapStatistics().malloced_memory+'',
        'Peak Mems':v8.getHeapStatistics().peak_malloced_memory+''
    }

    var keys =  Object.keys(stats);
    var padding = 10;
    var headers = "";
    var cols = "";
    for(var i=0;i<keys.length;i++){
        headers += keys[i] + dim.left(padding);
        cols += stats[keys[i]] + dim.left(keys[i].length + padding - stats[keys[i]].length);
    }
    dim.top(1);
    draw.text(headers);
    draw.hr("¯");
    draw.text(cols);
    dim.top(1);
    
}
responder.listUsers = function(str){
    console.log("you just typed [" + str + "]");
}  
responder.listChecks = function(str){
    console.log("you just typed [" + str + "]");
} 
responder.moreCheckInfo = function(str){
    console.log("you just typed [" + str + "]");
} 
responder.listLogs = function(str){
    console.log("you just typed [" + str + "]");
} 
responder.moreLogInfo = function(str){
    console.log("you just typed [" + str + "]");
}
responder.dirList = function(str){
    console.log("you just typed [" + str + "]");
    var arr = str.match(/^dir\s+list\s+([^\s\b]+)/i);
    if(arr && arr[1]){
        let pa = arr[1].startsWith("/")?arr[1]:"/"+arr[1];
        let url = path.resolve(path.join(__dirname,pa));
        fs.access(url,fs.constants.F_OK,function(err){
            console.log(`${url} ${err?'file not exists':''}`);
            if(!err){//  path exists
                //打印出目录结构
                console.log(fshelp.getSkeletonData(url));
            }
        });

    }else{
        if(!arr) {
            console.log("I dont understand,try type command again");
        }else{
            console.log("param missing,please set the dir to list");
        }
    }
}  

module.exports = responder;