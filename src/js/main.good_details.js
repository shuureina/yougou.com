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
        console.log(valInt);
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
                console.log(valInt, 'a');
                console.log(parseInt(nval.attr('max')),'m')
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
        
        
    });
});