
//获取操作对象
//是否同意框
var btn=document.querySelector("#inp")
//提交按钮
var submit=document.querySelector('[type="submit"]')
//用户名
var user=document.querySelector('[name="username"]')
//密码
var pass=document.querySelector('[type="password"]')
//给当前按钮对象绑定点击事件
btn.onclick=function(){
    //判断当前选项是否被选中
    if(btn.checked){
        //取消登录按钮的禁用
        submit.disabled=false
    }else{
        submit.disabled=true
    }
}
//给能被点击的登录按钮绑定点击事件
submit.onclick=function(){
    //获取账号输入框中的value
    var u1 = $("input").eq(0).val()
    var p1 = $("input").eq(1).val()
    //调用ajax发送请求
    Ajax({
        //把发送请求传送到对应的php文件
        url:'../php/zhuce.php',
        //发送参数
        data:`username=${u1}&password=${p1}`,
        //成功之后，执行回调函数
        success:function(dt){
            //判断当前返回值是否等于1
            //登录成功
            console.log(dt);
            if (dt == 1) {
                alert("注册成功")
                location.href = "../html/login.html"

            } else {
                alert("注册失败")
            }
        }
    })
    return false
}
/* $(".form-horizontal").validate({
    rules:{
        username:{
            required: true,  //是否为必填字段
            minlength: 2,    //最小长度
            maxlength:10      //最大长度
        },
        pwd:{
            required: true,  //必填字段
            minlength: 2, 
            maxlength: 10    
        }
    },
    //默认提示信息(可以修改提示信息)
    messages: {
        username: {
            required: "请输入中文用户名", 
            minlength: "字符长度不能小于2"
        }, 
        pwd: {
            required: "请输入密码",
            minlength: "密码长度不能小于 2 个字符",
            maxlength: "密码长度不能小于 10 个字符",
          },
    }
}) */