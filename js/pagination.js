//创建构造函数
function Pagination(ele,options){
    //创建实例属性
    this.ele=ele
    this.options=options||{}
    //存放回调函数的实例属性
    this.cb=this.options.cb || function(){}
    //创建默认参数
    this.default={
        //页面数据信息
        pageInfo:{
            pagenum:1, //当前页
            pagesize:9, //一页显示的条数
            totalsize:200,//总条数
            totalpage:23 //总页数
        },
        //页面文本信息的参数
        textInfo:{
            first:'first',
            prev:"prev",
            list:'',
            next:"next",
            last:"last"
        }
    }
    //存放所有页码的属性
    this.list=null
    //调用入口函数
    this.init()
}
//创建入口函数
Pagination.prototype.init=function(){
    //替换默认参数
    this.updateDefault()
    // console.log(this)
    //显示所有信息
    this.show1()
}
//使用传入的参数去替换默认参数
Pagination.prototype.updateDefault=function(){
    if(this.options.pageInfo){
        //替换数据信息
        for(let attr in this.options.pageInfo){
            //使用传入的数据替换默认值
            this.default.pageInfo[attr]=this.options.pageInfo[attr]     
        }
    }
    //文本信息的替换
    if(this.options.textInfo){
        for(let attr in this.options.textInfo){
            this.default.textInfo[attr]=this.options.textInfo[attr]
        }
    }
    // console.log(this.default)
}
//显示信息
Pagination.prototype.show1=function(){
    //清空大盒子中所有的信息
    this.ele.innerHTML=''
    //显示文本信息
    this.textShow()
    //显示页码信息
    this.showP()
    //给大盒子对象绑定点击事件
    this.dongcidaci()
    //禁用指定按钮
    this.jinyong()
    //添加输入框
    this.addInput()
    //调用回调函数
    this.cb(this.default.pageInfo.pagenum)
}   
//添加输入框和跳转按钮
Pagination.prototype.addInput=function(){
    //创建输入框对象
    var input=document.createElement('input')
    //给当前输入框对象设置属性
    input.type="number"
    input.value=this.default.pageInfo.pagenum
    input.max=this.default.pageInfo.totalpage
    input.min=1
    //创建按钮对象
    var btn=document.createElement('button')
    btn.innerHTML="go"
    //把当前创建好的两个对象依次追加到大盒子中
    this.ele.appendChild(input)
    this.ele.appendChild(btn)
}
Pagination.prototype.jinyong=function(){
    //获取当前页码
    var pagenum2=this.default.pageInfo.pagenum
    var totalPage2=this.default.pageInfo.totalpage
    //获取大盒子中所有的div对象
    var divs=this.ele.querySelectorAll('div')
    //判断当前是否在第一页
    if(pagenum2==1){
        //禁用首页和上一页
        divs[0].style.backgroundColor="#ccc"
        divs[1].style.backgroundColor="#ccc"
    }
    if(pagenum2==totalPage2){
        //禁用下一页和尾页
        divs[3].style.backgroundColor="#ccc"
        divs[4].style.backgroundColor="#ccc"
    }
}
//显示文本信息
Pagination.prototype.textShow=function(){
    //获取默认参数中的文本信息
    let text1=this.default.textInfo
    //遍历文本信息中所有的键值对
    for(let attr in text1){
        //创建存储信息的div元素
        var newDiv=document.createElement('div')
        //给当前div对象添加class属性
        newDiv.className=attr
        //判断当前文本是否等于list
        if(attr=="list"){
            //把当前div对象赋值给this.list
            this.list=newDiv
            setCss(newDiv,{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            })
        }else{
             setCss(newDiv,{
                 border:"1px solid #000",
                 padding:"0px 5px",
                 margin:"0px 5px"
             })
             newDiv.innerHTML=text1[attr]
        }
        //最后在把创建好的div对象追加到大盒子中
        this.ele.appendChild(newDiv)
    }
}
//显示页码信息
Pagination.prototype.showP=function(){
    //获取数据信息
    var pageInfo1=this.default.pageInfo
    //获取当前页和总页数
    var pagenum1=pageInfo1.pagenum
    var totalPage1=pageInfo1.totalpage
    //判断总页数是否小于10
    if(totalPage1<10){
        //根据总页数来决定循环次数
        for(let i=1;i<=totalPage1;i++){
            //创建p对象
            var p1=createP(i,pagenum1)
            //把所有创建好的p对象追加到this.list这个div中
            this.list.appendChild(p1)
        }
    }else{
        //判断当前页码是否小于5
        if(pagenum1<5){
            for(var i=1;i<=5;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var span1=document.createElement("span")
            span1.innerHTML="..."
            //把当前span标签追加到div对象中
            this.list.appendChild(span1)
            //最后显示两个
            for(var i=totalPage1-1;i<=totalPage1;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
        }else if(pagenum1==5){
            for(var i=1;i<=7;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var span1=document.createElement("span")
            span1.innerHTML="..."
            //把当前span标签追加到div对象中
            this.list.appendChild(span1)
            //最后显示两个
            for(var i=totalPage1-1;i<=totalPage1;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
        }else if(pagenum1>5 && pagenum1<totalPage1-4){
            for(var i=1;i<=2;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var span1=document.createElement("span")
            span1.innerHTML="..."
            //把当前span标签追加到div对象中
            this.list.appendChild(span1)
            //显示中间五个
            for(var i=pagenum1-2;i<=pagenum1+2;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
             //创建span标签对象
             var span1=document.createElement("span")
             span1.innerHTML="..."
             //把当前span标签追加到div对象中
             this.list.appendChild(span1)
            //最后显示两个
            for(var i=totalPage1-1;i<=totalPage1;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
        }else if(pagenum1==totalPage1-4){
            for(var i=1;i<=2;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var span1=document.createElement("span")
            span1.innerHTML="..."
            //把当前span标签追加到div对象中
            this.list.appendChild(span1)
            
            //最后显示七个
            for(var i=totalPage1-6;i<=totalPage1;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
        }else if(pagenum1>totalPage1-4){
            for(var i=1;i<=2;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
            //创建span标签对象
            var span1=document.createElement("span")
            span1.innerHTML="..."
            //把当前span标签追加到div对象中
            this.list.appendChild(span1)
            
            //最后显示五个
            for(var i=totalPage1-4;i<=totalPage1;i++){
                var p1=createP(i,pagenum1) 
                this.list.appendChild(p1)
            }
        }
    }
}
//动起来
Pagination.prototype.dongcidaci=function(){
    //给大盒子对象绑定点击事件
    //为了让函数中的this指向实例化对象，所以在这里需要使用箭头函数
    this.ele.onclick=(e)=>{
        var e = e || window.event
        //获取当前点击对象
        var target=e.target ||e.srcElement
        //判断点击的是否为下一页
        if(target.className=="next" && this.default.pageInfo.pagenum!=this.default.pageInfo.totalpage){
            //修改页码
            this.default.pageInfo.pagenum++
            //调用显示方法
            this.show1()
        }
        //判断点击的是否为上一页
        if(target.className=="prev" && this.default.pageInfo.pagenum!=1){
            //修改页码
            this.default.pageInfo.pagenum--
            //调用显示方法
            this.show1()
        }
        //首页
        if(target.className=='first' && this.default.pageInfo.pagenum!=1){
             //修改页码
             this.default.pageInfo.pagenum=1
             //调用显示方法
             this.show1()
        }
        //尾页
        if(target.className=="last" && this.default.pageInfo.pagenum!=this.default.pageInfo.totalpage){
            //修改页码
            this.default.pageInfo.pagenum=this.default.pageInfo.totalpage
            //调用显示方法
            this.show1()
        }
        //点击页码
        if(target.nodeName=="P" && target.innerHTML!=this.default.pageInfo.pagenum){
             //修改页码
             this.default.pageInfo.pagenum=parseInt(target.innerHTML)
             //调用显示方法
             this.show1()
        }
        //点击go按钮
        if(target.innerHTML=="go" && this.default.pageInfo.pagenum!=target.previousElementSibling.value){
            //修改页码
            this.default.pageInfo.pagenum=parseInt(target.previousElementSibling.value)
            this.show1()
        }
    }
}
//创建p对象 n：表示所有页码，dd：表示当前页的页码
function createP(n,dd){
    //创建p标签对象
    var newP=document.createElement('p')
    //给p对象添加文本
    newP.innerHTML=n
    //判断当前被选中的页码是否跟遍历出来的页码相等
    if(n==dd){
        setCss(newP,{
            border:"1px solid #000",
            padding:"0px 5px",
            margin:"0px 5px",
            backgroundColor:"pink"
        })
    }else{
        setCss(newP,{
            border:"1px solid #000",
            padding:"0px 5px",
            margin:"0px 5px"
        })
    }
    //返回当前创建好的p对象
    return newP
}
//给该对象设置对应的样式
function setCss(ele,options){
    //遍历所有需要设置的样式
    for(let attr in options){
        ele.style[attr]=options[attr]
    }
}