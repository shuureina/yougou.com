let baseUrl = "http://127.0.0.1:8080/yougou.com/";

define(['jquery'], function ($) {
    return {
        render: function () {
            $.ajax({
                type: 'get',
                url: `${baseUrl}/lib/getlist.php`,
                dataType: 'json',
                success: function (res) {
                    // console.log(res);
                    // home
                    let proItem = $('.prouducts .swiper-item-wrap');
                    let braItem = $('.brand-container .swiper-item-wrap');

                    // good_lists
                    let spItem = $('.sub-products-content');
                    let temp = '';
                    let brands = '';
                    res.forEach(ele => {
                        let pic = ele.b_imgs.split(',');
                        let brand_pic = JSON.parse(ele.brand_pic);
                        // console.log(brand_pic);
                        temp += `
                        <div class="swiper-item">
                            <div class="goods-img">
                                <a href="${baseUrl}/src/html/good_details.html?id=${ele.id}" title="${ele.footwear}"><img src="${baseUrl}/src/image/${pic[0]}" alt="${ele.title}"></a>
                            </div>
                            <img class="brand-img" src="${baseUrl}/src/image/${brand_pic[0].src}" alt="${brand_pic[0].title}">
                            <p>
                                <a href="${baseUrl}/src/html/good_lists.html" title="${ele.footwear}">${ele.footwear}</a>
                            </p>
                            <div class="price-wrap">
                                <div class="price-content">￥ <span class="price">${ele.price}</span></div>
                                <div class="colloct"></div>
                            </div>
                       </div>
                        `
                        brands += `
                        <a class="swiper-item" href="${baseUrl}/src/html/good_lists.html" target="_blank" title="${brand_pic[0].title}">
                            <img src="${baseUrl}/src/image/${brand_pic[0].src}"  alt="${brand_pic[0].title}">
                        </a>
                        `
                    });
                   proItem.append(temp);
                    braItem.append(brands);
                    spItem.append(temp);
                }
            })
        }
    }
});