//添加或修改cookie
function setCookie(key,val,time1){
    //获取当前时间
    var dt1=new Date()
    //计算时间戳，毫秒为单位
    var t1=dt1.getTime()-8*3600*1000+time1*1000
    //设置cookie
    document.cookie=`${key}=${val};expires=${new Date(t1)}`
}

//通过key获取对应的值
function getCookie(key){
    //获取所有的cookie
    var cookies=document.cookie
    //分割cookie，转为数组
    var ar1=cookies.split('; ')
    //遍历数组元素
    for(var i=0;i<ar1.length;i++){
        //再次分割数组元素
        var ar2=ar1[i].split('=')
        //把传入进来的键名跟数组中第一个元素比较
        if(key==ar2[0]){
            return ar2[1]
        }
    }
}
//删除cookie
function delCookie(key){
    setCookie(key,1,-1)
}