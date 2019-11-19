require.config({
    paths: {
        jquery: './jquery.min',
        cookie: './lib/cookie',
        good_detail: './lib/good_details'
    },
    shim: {}
});


require(['jquery', 'good_detail'], function ($, good_detail) {
    good_detail.render(function (id, price,num ) {
        var n1 = 1;//初始值
        //加购物车
        $('#addcar').on('click', function () {
            good_detail.addItem(id, price, $('#num').val());
        });
       
         
        //加数量
        $('#add-btn').on('click', function () {

            if (n1 < num) {
                n1++;
                $('#num').val(n1);
            } else {
                $(this).css('cursor', 'not-allowed');
            }
        })
        
        //减数量
        $('#sub-btn').on('click', function () {
            if (n1 > 1) {
                n1--;
                $('#num').val(n1);
            } else {
                $(this).css('cursor', 'not-allowed');
            }
        })
        
    });
});