//获取操作对象
//存放主要内容的盒子，把内容动态渲染进去
var row = document.querySelector('.row');
//分页器对象
var pagination1 = document.querySelector('.pagination');
// var th1 = docummentSelector(".thumbnail");
//使用自执行函数（获取数据），并渲染
(async function() {
    //调用promiseAjax封装
    var dt = await promiseAjax({
            //使用promiseAjax发送请求给对应php文件，向后端索要数据
            url: '../php/lis1.php',
            //返回的数据格式
            datatype: 'json'
        })
        //创建分页器对象
    new Pagination(pagination1, {
        //页面数据信息
        pageInfo: {
            //当前页
            pagenum: 1,
            //一页显示的页数（要显示多少条商品）
            pagesize: 16,
            //总条数
            totalsize: dt.length,
            //总页数
            totalpage: Math.ceil(dt.length / 16)
        },
        //页面文本信息的参数
        textInfo: {
            first: '首页',
            prev: "上一页",
            next: "下一页",
            last: "尾页"
        },
        cb(m) {
            //获取当前页需要显示的数据
            var ar1 = dt.slice((m - 1) * 16, m * 16)
                //创建拼接所有数据的字符串
            var str = ''
                //遍历当前ar1数组中所有的数据
            ar1.forEach(item => {
                    //把所需的数据从数据库中调用，拼接使用（使用模板字符串进行拼接），需要改变的数据使用${}
                    str += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="thumbnail">
                    <img src="${item.goods_small_logo}" >
                    <div class="caption">
                        <h5 class="h5">${item.goods_name}</h5>
                        <span class="p1">￥${item.goods_price}</span>&nbsp;&nbsp;&nbsp;&nbsp; <span class="p2">￥<del>${item.goods_price}</del></span> 
                        <a href="./xq1.html?id=${item.goods_id}" class="btn btn-warning ja" role="button">放入购物车</a>
                    </div>
                </div>
                </div>    
                `
                })
                //把从数据库中获取到的数据，拼接好之后，渲染到页面中
                //把当前拼接好的字符串，添加到row盒子中
            row.innerHTML = str
        }
    })
})()



/*

<a href="./cart.html" class="btn btn-primary" role="button">购物车</a>

*/