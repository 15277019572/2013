//获取当前地址栏中的参数信息
var search=location.search
//获取大盒子对象
var box=document.querySelector(".panel")
var dt;
//判断当前search对象中是否有值
if(search){
    //分割search字符串
    var id=search.split('=')[1];

    (async function(){
        dt=await promiseAjax({
            url:'../php/xiangqing.php',
            data:'id='+id,
            datatype:'json'
        })
        //创建拼接所有内容的字符串
        var str=`
        <div class="panel-heading">品详细信息</div>
        <div class="panel-body">
            <div class="media">
                <div class="media-left media-middle">
                <a href="#">
                    <img class="media-object" src="${dt.goods_small_logo}" alt="...">
                </a>
                </div>
                <div class="media-body">
                <h3 class="media-heading">${dt.goods_name}</h3>
                <h2>￥${dt.goods_price}</h2>
                <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default">XL</button>
                    <button type="button" class="btn btn-default">L</button>
                    <button type="button" class="btn btn-default">M</button>
                    <button type="button" class="btn btn-default">XM</button>
                    <button type="button" class="btn btn-default">XS</button>
                </div>
                <br/><br/>
                <a href="./cart.html" class="btn btn-info">立即购买</a>
                <a href="javascript:;" class="btn btn-success">加入购物车</a>
                </div>
            </div>
            <ul class="nav nav-tabs">
                <li role="presentation" class="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>
            ${dt.goods_introduce}
        </div>
        `
        //把当前内容添加到大盒子中
        box.innerHTML=str;

        
    })()

}else{
    alert("你还没选中商品")
    location="./list.html"
}
//给大盒子对象绑定点击事件
box.onclick=function(e){
    var e = e || window.event
    //获取点击对象
    var target=e.target || e.srcElement
    //判断点击的对象是否为加入购物车按钮
    if(target.innerHTML=="加入购物车"){
        //获取localStorage中的cartList3
        var cartList=localStorage.getItem("cartList3")
        //判断当前获取的cartList是否存在
        if(cartList){
            //把localStorage中获取的内容转为数组对象
            cartList=JSON.parse(cartList)
            var a=0 //判断当前添加的商品是否在localStorage中存在
            //遍历数组中所有元素啊
            cartList.forEach(item=>{
                //判断当前遍历的商品是否等于要添加的商品
                if(item.goods_id==dt.goods_id){
                    a++
                    item.cart_number++
                }
            })
            //判断a变量是否等于0
            if(a==0){
                //修改商品数量
                dt.cart_number=1
                //把当前对象追加到数组中
                cartList.push(dt)
            }
            //把当前商品添加到localStorage中
            localStorage.setItem("cartList3",JSON.stringify(cartList))
        }else{
            //修改当前商品数量
            dt['cart-number']=1
            //把当前商品添加到localStorage中
            localStorage.setItem("cartList3",JSON.stringify([dt]))
        }

    }  
}


//获取当前地址栏中的参数信息（获取商品的id）
var search = location.search
//获取大盒子对象（存放主要内容的盒子）
var box = document.querySelector(".panel")
var dt; //后端返回的数据
//判断当前search对象中是否有值（地址栏中是否有商品的id）
if (search) {
  //如果存在，分割search字符串，获取商品的id
  var id = search.split('=')[1];
  //自执行函数
  (async function () {
    //（使用promiseAjax向后端索要数据）
    dt = await promiseAjax({
      //获取数据的地址
      url: '../php/xq1.php',
      //向后端获取id参数
      data: 'id=' + id,
      //返回的数据格式
      datatype: 'json'
    })

    /* 
    
        <div class="panel-heading">
      <ol class="breadcrumb">
        <li><a href="#">${dt.cat_one_id}</a></li>
        <li><a href="#">${dt.cat_two_id}</a></li>
        <li><a href="#">${dt.cat_three_id}</a></li>
        <li><a href="#">${dt.goods_name}</a></li>    
      </ol>
    </div>
    <div class="panel-body">
        <div class="media">
            <div class="media-left media-middle">
            <a href="#">
                <img class="media-object" src="${dt.goods_small_logo}" alt="...">
            </a>
            </div>
            <div class="media-body">
            <h4 class="media-heading">${dt.goods_name}</h4>
            <span>天虹价：￥${dt.goods_price}</span> &nbsp;&nbsp;&nbsp;&nbsp; <span>(市场价：<del>￥${dt.goods_price}</del>)</span>
            <br>  
            <div class="btn-group" role="group" aria-label="...">
                <br>
                <button type="button" class="btn btn-default">XL</button>
                <button type="button" class="btn btn-default">L</button>
                <button type="button" class="btn btn-default">M</button>
                <button type="button" class="btn btn-default">XM</button>
                <button type="button" class="btn btn-default">XS</button>
            </div>
            <br/><br/>
            <a href="./cart.html" class="btn btn-info">立即购买</a>
            <a href="javascript:;" class="btn btn-success">加入购物车</a>
            </div>
        </div>
        <ul class="nav nav-tabs">
            <li role="presentation" class="active"><a href="#">商品详情</a></li>
        </ul>
        ${dt.goods_introduce}
    </div>
    
    */
    //创建拼接所有内容的字符串
    //动态渲染页面
    var str = `
    <div class="panel-heading">
    <ol class="breadcrumb">
        <li><a href="#">${dt.cat_one_id}</a></li>
        <li><a href="#">${dt.cat_two_id}</a></li>
        <li><a href="#">${dt.cat_three_id}</a></li>
        <li><a href="#">${dt.goods_name}</a></li>
    </ol>
</div>
<div class="left">
    <img src="${dt.goods_small_logo}"
        alt="">
    <div class="mask"></div>
</div>
<div class="right">
    <div class="media-body">
        <h4 class="media-heading">${dt.goods_name}</h4>
        <span class="thj">天虹价：<span>￥${dt.goods_price}</span></span> &nbsp;&nbsp;&nbsp;&nbsp; <span>(市场价：￥<del>${dt.goods_price}</del>)</span>
        <br>
        <span class="yh"><span>满减</span>本商品参加：满300元减40元，满600元减80元，满900元减120元，满1200元减160元，满1500元减200元</span>
        <br>
        <span class="dao"></span>
        <br>
        <div class="btn-group" role="group" aria-label="...">
            <p><span>送积分</span>11.96  <a href="#">（了解积分制度?）</a></p>
            <p><span>支持</span>支持免运费 商家自配送 | 支持购物卡支付</p>
            <p><span>服务</span>由 食尚养生旗舰店 负责发货并提供售后服务</p>
            <p><span>疫情</span>受春节影响，您的订单可能延迟送达，敬请谅解。详情可见前台春节放假公告或咨询客服4008295295</p>
        </div>
        
        <br /><br />
        <a href="./cart.html" class="btn btn-warning">立即购买</a>
        <a href="javascript:;" class="btn btn-danger">加入购物车</a>
        <a href="./lis1.html" class="btn btn-success">继续选购</a>

    </div>
</div>
<div class="maxBox">
    <img src="${dt.goods_small_logo}"
        alt="">
</div>
    
        `
    str += `
    <ul class="nav nav-tabs">
          <li role="presentation" class="active"><a href="#">商品详情</a></li>
          <li role="presentation" class="active"><a href="#">商品参数</a></li>
          <li role="presentation" class="active"><a href="#">商品评价</a></li>  
    </ul>
    ${dt.goods_introduce}
            
        `
    //把当前内容添加到大盒子中
    box.innerHTML = str;

    //倒计时
    var dao = document.querySelector(".dao");
    setInterval(function () {
      //			获取当前本地时间
      var dqsj = new Date()
      //			获取结束时间
      var jssj = new Date('2021/3/10 16:00:00')
      var sysj = jssj - dqsj 
      //		console.log(sysj)
      //			获取剩余天数
      var tian = parseInt(sysj / 1000 / 60 / 60 / 24)
      //		console.log(tian)
      //			获取剩余小时
      var shi = parseInt(sysj / 1000 / 60 / 60 % 24)
      //		console.log(shi)
      //			获取剩余分钟
      var fen = parseInt(sysj / 1000 / 60 % 60)
      //		console.log(fen)
      //			获取剩余秒数
      var miao = parseInt(sysj / 1000 % 60)
      // console.log(miao)
      dao.innerHTML = "距离活动结束还有" + tian + "天" + shi + "小时" + fen + "分钟" + miao + "秒"
    }, 1000)

  })()

//如果地址栏中没有商品id，则表明商品还没有选中，跳转回列表页
} else {
  alert("你还没选中商品")
  location = "./lis1.html"
}


//给大盒子对象绑定鼠标移入事件）
box.onmouseenter = function (e) {
  //事件兼容
  var e = e || window.event
  //获取点击对象
  var target = e.target || e.srcElement
  //放大镜
  var left = $1('.left')
  var mask = $1('.mask')
  var maxBox = $1('.maxBox')
  var maxImg = $1('.maxBox img')
  //鼠标移入
  left.onmouseenter = function () {
    //显示放大镜遮藏层
    mask.style.display = 'block'
    //显示右边图片
    maxBox.style.display = 'block'
  }
  //鼠标移出
  left.onmouseleave = function () {
    //隐藏图片遮藏层
    mask.style.display = 'none'
    //隐藏右边图片
    maxBox.style.display = 'none'
  }
  //鼠标移动
  left.onmousemove = function (ev) {
    var e = ev || event
    // 遮罩层left=鼠标到页面左侧的距离-left容器到最外层的距离-遮罩层宽的一半
    var mask_left = e.pageX - offset(left).left - mask.clientWidth / 2
    var mask_top = e.pageY - offset(left).top - mask.clientHeight / 2
    // 临界值判断
    if (mask_left <= 0) {
      mask_left = 0
    }
    if (mask_left >= (left.clientWidth - mask.clientWidth)) {
      mask_left = (left.clientWidth - mask.clientWidth)
    }
    if (mask_top <= 0) {
      mask_top = 0
    }
    if (mask_top >= (left.clientHeight - mask.clientHeight)) {
      mask_top = (left.clientHeight - mask.clientHeight)
    }
    // 赋值，改变遮罩层定位
    mask.style.left = mask_left + 'px'
    mask.style.top = mask_top + 'px'

    // 移动比例
    var scaleX = mask_left / (left.clientWidth - mask.clientWidth)
    var scaleY = mask_top / (left.clientHeight - mask.clientHeight)
    // 根据比例计算出大图的定位
    var img_left = (maxImg.clientWidth - maxBox.clientWidth) * scaleX
    var img_top = (maxImg.clientHeight - maxBox.clientHeight) * scaleY
    // 赋值，改变大图定位，反向运动
    maxImg.style.left = -img_left + 'px'
    maxImg.style.top = -img_top + 'px'
  }
}
//给大盒子对象绑定点击事件（使用事件委托，把点击事件委托给大盒子
box.onclick = function (e) {
  var e = e || window.event
  //获取点击对象
  var target = e.target || e.srcElement
  //判断点击的对象是否为加入购物车按钮
  if (target.innerHTML == "加入购物车") {
    //获取localStorage中的cartList3
    var cartList = localStorage.getItem("cartList3")
    //判断当前获取的cartList（商品）是否存在购物车中
    if (cartList) {
      //把localStorage中获取的内容转为数组对象
      cartList = JSON.parse(cartList)
      var a = 0 //判断当前添加的商品是否在localStorage中存在
      //遍历数组中所有元素
      cartList.forEach(item => {
        //判断当前遍历的商品是否等于要添加的商品
        if (item.goods_id == dt.goods_id) {
          
          a++
          item.cart_number++
        }
      })
      //判断a变量是否等于0
      if (a == 0) {
        //修改商品数量
        dt.cart_number = 1
        //把当前对象追加到数组中
        cartList.push(dt)
      }
      //把当前商品添加到localStorage中
      localStorage.setItem("cartList3", JSON.stringify(cartList))
      //如果当前获取的cartList（商品）不存在购物车中
    } else {
      //修改当前商品数量
      dt['cart_number'] = 1
      //把当前商品添加到localStorage中
      localStorage.setItem("cartList3", JSON.stringify([dt]))
    }

  }

}

