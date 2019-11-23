let baseUrl = "http://127.0.0.1:8080/yougou.com";

define(['jquery', 'cookie'], function ($,cookie) {
    return {
        render: function (cb) {
            let shop = cookie.get('shop');
            console.log(shop);
            if (shop) {
                $('.shopcar-container .content').show();
                $('.shopcar-container .empty-cart').hide();
                shop = JSON.parse(shop)
                idList = shop.map(elm => elm.id).join();
                $.ajax({
                    type: 'get',
                    url: `${baseUrl}/lib/shop.php`,
                    data: {
                        idList:idList
                    },
                    dataType: 'json',
                    success: function (res) {
                        let temp = '';
                        res.forEach(elm => {
                            let brandpic = JSON.parse(elm.brand_pic);
                            let bimgs = elm.b_imgs.split(',');
                            console.log(elm);
                            // 从购物车cookie数据中取出于本条遍历数据相同id的元素
                            let arr = shop.filter((val, i) => {
                                return val.id == elm .id
                            })
                            temp += `
                            <li class="goods-item">
                                <ul class="single-list">
                                <li class="product-item pd-checkbox">
                                    <input type="checkbox" class="checkbox" checked="checked">
                                    <i class="icon checked"></i>
                                </li>
                                <li class="product-item pd-img">
                                    <a href="${baseUrl}/src/html/good_details.html?id=${elm.id}"><img src="${baseUrl}/src/image/${bimgs[0]}" alt="${elm.title}"></a>
                                </li>
                                <li class="product-item pd-title">
                                ${elm.title}
                                </li>
                                <li class="product-item pd-discribe">
                                    <div>颜色：黑色</div>
                                    <div>尺码：36</div>
                                </li>
                                <li class="product-item pd-price">
                                    ${elm.price}
                                </li>
                                <li class="product-item pd-count">
                                    <a href="javascript:;" class="minus">-</a>
                                    <input type="text" value="${arr[0].num}" min="1" max="${elm.num}" class="count">
                                    <a href="javascript:;" class="plus">+</a>
                                </li>
                                <li class="product-item pd-totalPrice">
                                    ${(arr[0].num*elm.price).toFixed(2)}
                                </li>
                                <li class="product-item pd-handle">
                                    <div class="collect-in"><a href="javascript:;">移入收藏夹</a></div>
                                    <div class="delete"><a href="javascript:;">删除</a></div>
                                </li>
                                </ul>
                            </li>
                            `  
                        });
                        $('.goods-list').append(temp);
                        cb && cb();
                    }
                });
                 
                //清除购物车
                $('.empty-shopcar').on('click', function () {
                    cookie.set('shop', '', -1);
                    alert('您确定要清空购物车码？');
                    location.reload();
                })
                                   
            } else {
                $('.shopcar-container .content').hide();
                $('.shopcar-container .empty-cart').show();
             }
        },
        shopEv: function () {
            
        }
    }
})