/****
 * 
 *  记录操作步骤 和 存储的数据
 * 
 */

 var record = {
      raw :null,
      history:{

      },
      tracing:function(key,dat){
        let o = {stamp:Date.now()};
        if(dat) o.data = dat;
        this.history[key] = o;
      }
 }

 module.exports = record;