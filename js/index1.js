// 面向对象
(function() {
    //模块化
    function Tab(options) {
        this.init(options) //初始化
    }
    // Tab.prototype = {constructor: Tab}
    // console.log(Tab.prototype)
    Tab.prototype = {
        constructor: Tab, //手动指正构造器
        init: function(options) {
            // 初始索引
            this.prevIndex = options.initIndex || 0
            this.h3s = this.getElement(options.tits)
            this.divs = this.getElement(options.cons)
                // 初始化显示对应的选项
            this.setClass(this.h3s[this.prevIndex], 'active')
            this.setClass(this.divs[this.prevIndex], 'show')
                // 添加事件
            this.addEvent()
        },
        getElement: function(selector) {
            return document.querySelectorAll(selector)
        },
        setClass: function(dom, oClass) {
            dom.className = oClass
        },
        addEvent: function() {
            // this -> 实例对象
            for (var i = 0, len = this.h3s.length; i < len; i++) {
                this.h3s[i].onmousemove = function(index) {
                    // this -> 点击的元素 -> 实例对象
                    // 1.清除上次选中元素的类名
                    this.setClass(this.h3s[this.prevIndex], '')
                    this.setClass(this.divs[this.prevIndex], '')
                        // 2.给当前点击的元素添加类名
                    this.setClass(this.h3s[index], 'active')
                    this.setClass(this.divs[index], 'show')
                        // 3.更新上次选中的索引
                    this.prevIndex = index
                }.bind(this, i)
            }
        },
        getIndex: function() {
            return this.prevIndex
        }
    }

    console.log(Tab.prototype)
        // 工厂函数
    function factory(options) {
        return new Tab(options) //返回一个实例对象
    }

    // 如何对外暴露接口
    window.tab = factory
})()

// 如何使用？
var tab1 = tab({
    tits: '.tab1  .header-1 h3',
    cons: '.tab1  .content-1 div',
    initIndex: 1
})
var tab2 = tab({
    tits: '.tab2  .header-1 h3',
    cons: '.tab2  .content-1 div',
    initIndex: 2 //初始显示第三个选项
})
var tab3 = tab({
        tits: '.tab3  .header-1 h3',
        cons: '.tab3 .content-1 div',
        initIndex: 2 //初始显示第三个选项
    })
    // 轮播图
var mySwiper = new Swiper('.swiper-container', {
        //direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            //是否能点击切换轮播
            clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
            //下一张
            nextEl: '.swiper-button-next',
            //上一张
            prevEl: '.swiper-button-prev',
        },
        // 如果需要滚动条
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
        //自动轮播
        autoplay: {
            //延时
            delay: 1000,
            stopOnLastSlide: false,
            //鼠标划入暂停
            disableOnInteraction: true,
        },
    })
    // 楼层导航js
    // 这里是侧边栏的hover效果实现
$('.floorNav li').not(':last').hover(function() {
    $(this).addClass("hover");
}, function() {
    $(this).removeClass("hover");
});

// 这里是点击侧边栏到对应楼侧的效果实现
$('.floorNav li').not(':last').click(function() {
    //找点击元素的下标
    var $index = $(this).index();
    //获取右边对应块距离文档顶部的距离
    var $fTop = $(".wrap-1").eq($index).offset().top;
    // console.log($fTop);
    // 设置文档的滚动高度为对应块句距离文档顶部的距离
    $('html,body').stop().animate({
        "scrollTop": $fTop
    }, 1000);
    $('.floorNav li').find("span").removeClass("active");
    $(this).find('span').addClass('active');
})

// 下面是滚动楼层对应侧边栏加样式的效果
// 获取头部的高度
var $top = $('#hed').height();
$(window).scroll(function() {
    var arr = [];
    var $sTop = $(this).scrollTop();
    $('#mi .wrap-1').each(function(index, element) {
            var $height = $(element).offset().top + $(element).height() / 2;
            if ($sTop < $height) {
                // console.log(index);
                arr.push(index);
            }
        })
        // console.log(arr);
    var _index = arr[0];
    $('.floorNav li').find("span").removeClass("active");
    $('.floorNav li').eq(_index).find('span').addClass('active');

    if ($sTop >= $top) {
        $('.floorNav').fadeIn();
    } else {
        $('.floorNav').fadeOut();
    }

});

// 这里是返回顶部效果实现
$(".last").click(function() {
    $('html,body').animate({
        "scrollTop": 0
    })
})