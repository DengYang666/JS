// 需求点：
// 有依据
    // 1.0 实现轮播图自动切换、导航点自动切换
    // 2.0 实现鼠标移入轮播图暂停轮播，鼠标离开继续轮播
    // 3.0 实现导航绑定点击事件（事件驱动） 点击切换轮播图、切换导航点
    // 4.0 实现左右按钮绑定点击事件，点击切换轮播图、切换导航点
    // 5.0 实现无缝衔接的轮播（逻辑上多一点）


// 步骤：
// 1.0 获取元素 、记录数据
// 2.0 事件绑定
// 3.0 书写程序的处理逻辑


// 编码：
// 1.0 获取相关的元素
var sipwerBanner = document.getElementsByClassName("sipwer-banner")[0];
var ulElement = sipwerBanner.getElementsByTagName("ul")[0];
var items = ulElement.getElementsByTagName("li");
var swiperBannerPoint = document.getElementsByClassName("swiper-banner-point")[0];
var points = swiperBannerPoint.getElementsByTagName("li");
var prevBtn = document.getElementsByClassName("prev-box")[0];
var nextBtn = document.getElementsByClassName("next-box")[0];

// 记录索引值
// 图片索引值
var index = 1;
// 导航点索引值
var count = 0;

// 记录宽度
var width = items[0].offsetWidth;
// 记录定时器函数
var timer = null;

// 定义公共函数
// 设置导航点的函数
var setPoint = function (index) {
    // 排他思想
    for (var i = 0; i < points.length; i++) {
        // 移除所有导航点的类名
        points[i].className = "";
    }
    // 索引值对应的导航点设置类名
    points[index].className = "active";
}
// 测试
// setPoint(4);

// 设置索引值的函数、切换图片、切换导航点
var autoPlay = function () {
    //自增
    index++;
    // 判断索引值是否大于最大索引值
    if (index > items.length - 1) {
        // 重置索引值
        index = 2;
        // 设置ul的marinLeft属性瞬间移动 "-520px"
        // ulElement.style.marginLeft = "-520px";
        ulElement.style.marginLeft = -width+"px";
    }
    // 调用动画函数
    animate(ulElement, {
        // 设置ul标签的marginLeft
        marginLeft: -(index * width)
    })
    // 导航点索引值自增
    count ++;
    if(count > points.length - 1){
        count = 0;
    }
    // 调用设置导航点的函数
    setPoint(count);
}
// 测试
// autoPlay();
// 执行定时器函数
timer = setInterval(autoPlay, 2500);

// 2.0 实现鼠标移入轮播图暂停轮播，鼠标离开继续轮播
sipwerBanner.onmouseenter = function () {
    // 清除定时器
    clearInterval(timer);
}
sipwerBanner.onmouseleave = function () {
    // 清除定时器
    clearInterval(timer);
    // 执行定时器函数
    timer = setInterval(autoPlay, 2500);
}
// 3.0 实现导航绑定点击事件（事件驱动） 点击切换轮播图、切换导航点
// 循环导航点 li标签数组
// points.length  === 5 
for (var i = 0; i < points.length; i++) {
    // 属性绑定
    points[i].index = i;
    // 事件绑定
    points[i].onclick = function () {
        // console.log(i);// 5 
        // 获取当前点击的导航点索引值
        //图片的索引值
        index = this.index + 1 ;
        // 设置ul标签的水平位置
        animate(ulElement, {
            marginLeft: -(index * width)
        })
        // 导航点的索引值
        count = this.index;
        // 设置导航点切换
        setPoint(count);
    }
}

// 4.0 实现左右按钮绑定点击事件，点击切换轮播图、切换导航点
// 左边按钮
prevBtn.onclick = function () {
    // 设置索引值 自减
    index --;
    // 判断
    if (index < 0) {
        // 重置索引值 最大索引值
        index = items.length - 3;
        // 设置ul标签瞬间移动到 -2600px (  520 * 5 )
        // ulElement.style.marginLeft = "-2600px";
        ulElement.style.marginLeft = -((items.length - 2) * width) +"px";
    }
    // 设置ul标签的水平位置
    animate(ulElement, {
        marginLeft: -(index * width)
    })

    // 导航点索引值 
    count --;
    // 判断
    if(count < 0){
        count = points.length - 1;
    }
    // 设置导航点切换
    setPoint(count);
}
// 右边按钮
nextBtn.onclick = function () {
    // 设置索引值自增
    index++;
    // 判断
    if (index > items.length - 1) {
        // 重新赋值 0 
        index = 2;
        // 设置ul标签瞬间移动到 -520px位置
        // ulElement.style.marginLeft = "-520px";
        ulElement.style.marginLeft = -width + "px";
    }
    // 设置ul标签的水平位置
    animate(ulElement, {
        marginLeft: -(index * width)
    })

    // 改变导航点索引值
    count ++;
    // 判断
    if(count > points.length - 1 ){
        // 重置赋值
        count = 0;
    }
    // 设置导航点切换
    setPoint(count);
}