function Ajax(options){
    //设置默认参数信息
    var obj={
        url:'', //请求地址
        type:'get',//请求方式
        async:true, //是否异步
        data:'',//请求参数
        datatype:'string',//返回的数据格式
        success:function(){},//成功执行的回调函数
        error:function(){} //失败执行的回调函数
    }
    //把传入的参数赋值给obj对象
    for(var attr in options){
        obj[attr]=options[attr]
    }
    //创建ajax对象
    if(window.XMLHttpRequest){
        var xhr=new XMLHttpRequest()
    }else{
        var xhr=new ActiveXObject("Microsoft.XMLHTTP;")
    }
    //判断请求方式
    if(obj.type.toLowerCase()=="get"){
        //配置请求信息
        xhr.open("get",obj.url+(obj.data?`?${obj.data}`:''),obj.async)
        //发送请求
        xhr.send()
    }else if(obj.type.toLowerCase()=="post"){
        //配置请求信息
        xhr.open('post',obj.url,obj.async)
        //判断当前是否有参数
        if(obj.data){
            //设置请求头
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
            xhr.send(obj.data)
        }else{
            xhr.send()
        }
    }
    // console.log(xhr)
    //监听ajax状态
    xhr.onreadystatechange=function(){
        
        if(xhr.readyState==4){
            if(xhr.status==200){
                
                //判断是否设置响应的数据格式
                if(obj.datatype=='json'){
                    obj.success(JSON.parse(xhr.responseText))
                }else{
                    obj.success(xhr.responseText)
                }
            }else{
                obj.error(xhr.status)
            }
        }
    }
}

function promiseAjax(options){
    return new Promise(function(resolve,reject){
        //设置默认参数信息
        var obj={
            url:'', //请求地址
            type:'get',//请求方式
            async:true, //是否异步
            data:'',//请求参数
            datatype:'string',//返回的数据格式
            success:function(){},//成功执行的回调函数
            error:function(){} //失败执行的回调函数
        }
        //把传入的参数赋值给obj对象
        for(var attr in options){
            obj[attr]=options[attr]
        }
        //创建ajax对象
        if(window.XMLHttpRequest){
            var xhr=new XMLHttpRequest()
        }else{
            var xhr=new ActiveXObject("Microsoft.XMLHTTP;")
        }
        //判断请求方式
        if(obj.type.toLowerCase()=="get"){
            //配置请求信息
            xhr.open("get",obj.url+(obj.data?`?${obj.data}`:''),obj.async)
            //发送请求
            xhr.send()
        }else if(obj.type.toLowerCase()=="post"){
            //配置请求信息
            xhr.open('post',obj.url,obj.async)
            //判断当前是否有参数
            if(obj.data){
                //设置请求头
                xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
                xhr.send(obj.data)
            }else{
                xhr.send()
            }
        }
        // console.log(xhr)
        //监听ajax状态
        xhr.onreadystatechange=function(){
            
            if(xhr.readyState==4){
                if(xhr.status==200){
                    
                    //判断是否设置响应的数据格式
                    if(obj.datatype=='json'){
                        resolve(JSON.parse(xhr.responseText))
                    }else{
                        resolve(xhr.responseText)
                    }
                }else{
                    reject(xhr.status)
                }
            }
        }
    })
}