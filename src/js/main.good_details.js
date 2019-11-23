require.config({
    paths: {
        jquery: './jquery.min',
        cookie: './lib/cookie',
        good_detail: './lib/good_details'
    },
    shim: {}
});


require(['jquery', 'good_detail'], function ($, good_detail) {
    good_detail.render(function (id, price) {
        // var n1 = 1;//初始值
        var nval = $('#num');
        var valInt = parseInt(nval.val());
        nval.on('input', function () {
            var reg = /^\d+$/;
            if (reg.test(nval.val()) == true) {
                // console.log(nval.val() >= nval.attr('max'));
                if (nval.val() > nval.attr('max')) {
                    alert('抱歉！您购买的数量超过库存量！');
                    nval.val(nval.attr('max'));
                }
            } else {
                alert('您输入的不是数字，请重新输入！');
                $("#num").val(1);
            }
        });

        //加购物车
        $('#addcar').on('click', function () {
            let cdown = 10;
          
                    good_detail.addItem(id, price, $('#num').val());
                    $('.dg-wrap').show();
                    let timer = setInterval( function () {
                        $('.countdown').html(cdown);
                        cdown --;
                        if (cdown <= 0) {
                            $('.dg-wrap').hide();
                            clearInterval(timer);
                        }
                    }, 1000);
                    $('.close-btn img').on('click', function () {
                        $('.dg-wrap').hide();
                        clearInterval(timer);
                    });

        });
       
        
        //加数量
        $('#add-btn').on('click', function () {

            if (valInt < parseInt(nval.attr('max'))) {
                $(this).css('cursor', 'pointer');
                valInt++;
                nval.val(valInt);
            } else {
                $(this).css('cursor', 'not-allowed');
                $('.stock').show();
            }
        });
        //减数量
        $('#sub-btn').on('click', function () {
            if (valInt > 1) {
                $(this).css('cursor', 'pointer');
                valInt --;
               nval.val(valInt);
                $('.stock').hide();
            } else {
                $(this).css('cursor', 'not-allowed');
            }
        });
    
        //小图列表
        $('.icon-pic-list li').first().addClass('hover');
        $('.icon-pic-list li').on('click', function () {
            $(this).addClass('hover').siblings().removeClass('hover');
            $('.small-pic img').replaceWith( $(this).children('img').clone());
            $('.big-pic img').replaceWith( $(this).children('img').clone());
        })
        zoom();
    });
    //放大镜
    function zoom() {
        var zoomDiv = $('.zoomDiv');
        var small = $('.small-pic');
        var big = $('.big-pic');
        var bigImg = big.children('img');
        small.on('mouseover mouseout', function (ev) {
            // console.log(ev.type);
            if (ev.type == 'mouseover') {
                //1.鼠标移入，显示元素
                zoomDiv.show();
                big.show();

                // 3.计算zoomDiv移动盒子的大小
                zoomDiv.css({
                    "width":small[0].offsetWidth * big[0].offsetWidth / bigImg[0].offsetWidth+"px",
                    "height":small[0].offsetHeight * big[0].offsetHeight / bigImg[0].offsetHeight+"px"
                });
                //4.鼠标移动盒子
                small.on('mousemove', function (ev) {
                    //计算定位位置
                    var top = ev.pageY - small[0].offsetTop - (zoomDiv[0].offsetHeight / 2);
                    var left = ev.pageX - small[0].offsetLeft - (zoomDiv[0].offsetWidth / 2);
                    console.log('top'+top,'left'+left,'x'+ev.pageX,'y'+ev.pageY)
                    //计算移动比例
                    let ratio = bigImg[0].offsetWidth / small[0].offsetWidth;
                    
                    //边界
                    if (top <= 0) {
                        top = 0;
                    } else if (top >= small[0].offsetHeight - zoomDiv[0].offsetHeight) {
                        top = small[0].offsetHeight - zoomDiv[0].offsetHeight;
                    }
                    if (left <= 0) {
                        left = 0;
                    } else if (left >= small[0].offsetWidth - zoomDiv[0].offsetWidth) {
                        left = small[0].offsetWidth - zoomDiv[0].offsetWidth;
                    }
                     
                    zoomDiv.css({
                        "top": top + 'px',
                        "left": left + 'px'
                    });
                    bigImg.css({
                        'top': -top * ratio + 'px',
                        'left': -left * ratio + 'px'
                    });
                    
                });

            } else if (ev.type == 'mouseout') {
                //2.鼠标移开，隐藏元素
                zoomDiv.hide();
                big.hide();
            }
        });
    }
  

});