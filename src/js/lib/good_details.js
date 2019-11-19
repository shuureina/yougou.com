let baseUrl = "http://127.0.0.1:8080/yougou.com/";


define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function (cb) {
            let id = location.search.split('=')[1];
            console.log(id);
            $.ajax({
                type: "get",
                url: `${baseUrl}/lib/getitems.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function (res) {
                    let b_imgs = res.b_imgs.split(',');
                    let brand_pic = JSON.parse(res.brand_pic);
                    console.log(res);
                    console.log(brand_pic);
                    console.log(b_imgs);
                    if (res.id = id) {
                        let icons = ``;
                        let pImg = `
                            <img src="${baseUrl}/src/image/${b_imgs[0]}" alt="${res.title}">
                        `;
                        let brImg = `
                        <a href="javascript:;">
                            <img src="${baseUrl}/src/image/${brand_pic[0].src}" alt="${brand_pic[0].title}">
                        </a> 
                        `;
                        let price = `
                        <div class="disPrice">
                            ￥ <strong>${res.price}</strong>
                            <del  class="oriPrice">￥<span>${res.ori_pri}</span></del>
                        </div>
                        `;
                        let count = `<input type="text" id="num" class="num" value="1" min="1" max="${res.num}">`;
                        b_imgs.forEach((i) => {
                            // console.log(i);
                            icons += `
                            <li>
                              <img src="${baseUrl}/src/image/${i}" alt="${res.title} ">
                              <i class="icon"></i>    
                            </li>
                            `;
                        });
                        $('.icon-pic-list').append(icons);
                        $('.small-pic').append(pImg);
                        $('.big-pic').append(pImg);
                        $('.bland-logo').append(brImg);
                        $('.goods-title').append(`${res.title}`);
                        $('.goods-price').append(price);
                        $('.goods-count').prepend(count);
                        cb && cb(res.id,res.price,res.num);
                    }
                }
            });

        },
        addItem: function (id,price,num) {
            let shop = cookie.get('shop');

            let goods = {
                id: id,
                price: price,
                num: num
            };

            if (shop) {//cookie 存在 ，修改 
                shop = JSON.parse(shop);
                if (shop.some(elm => elm.id == id)) {//同一个id数量相加    
                    shop.forEach(elm => {
                        elm.id == id ? elm.num =parseInt(elm.num) + parseInt(num) : null;
                    });
                } else {//不同id 直接添加
                    shop.push(goods);
                }
            } else {//cookie 不存在 ，添加
                shop = [];//新建一个购物车
                shop.push(goods);
                
            }
            cookie.set('shop', JSON.stringify(shop), 1);
        }
   } 
});