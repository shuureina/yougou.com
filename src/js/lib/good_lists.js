let baseUrl = "http://127.0.0.1:8080/yougou.com";

define(['jquery','slider'], function ($,slider) {
    return {
        render: function () {
            let navItem = $('.nav-list>.item:not(.item-home)').children('a');
            let subWrap = $('.sub-nav-wrap .content');
            navItem.on('mouseover mouseout', function (ev) {
                let index = navItem.index(this);
                if (ev.type == 'mouseover') {
                    subWrap.eq(index).slideDown("fast").siblings().hide();
                    
                } else if (ev.type == 'mouseout') {
                    // subWrap.eq(index).on('mouseover',function () {
                    //     $(this).show();
                    // });
                    subWrap.eq(index).slideUp("fast");
                }
            });

            $(window).on('scroll resize', function () {
                let windowHeight = $(window).height();
                let scrollTop = $(window).scrollTop();
                let docHeight = $(document).height();
                let logCon = $('.log-container');
                if (scrollTop >= 208) {
                    logCon.addClass('nav-fixed');
                } else if (windowHeight + scrollTop == docHeight) {
                    getList();
                }else{
                    logCon.removeClass('nav-fixed');
                }
            });
            getList();
            function getList() {
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
                        if (res) {
                            
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
                                        <a href="${baseUrl}/src/html/good_lists.html?id=${ele.id}" title="${ele.footwear}">${ele.footwear}</a>
                                    </p>
                                    <div class="price-wrap">
                                        <div class="price-content">￥ <span class="price">${ele.price}</span></div>
                                        <div class="colloct"></div>
                                    </div>
                               </div>
                                `
                                brands += `
                                <a class="swiper-item" href="${baseUrl}/src/html/good_lists.html?id=${ele.id}" target="_blank" title="${brand_pic[0].title}">
                                    <img src="${baseUrl}/src/image/${brand_pic[0].src}"  alt="${brand_pic[0].title}">
                                </a>
                                `
                            });
                            proItem.append(temp);
                            braItem.append(brands);
                            spItem.append(temp);
                        } else {
                            let loading = `
                               <p>没有更多数据了</p>
                            `
                            proItem.append(loading);
                            braItem.append(loading);
                            spItem.append(loading);
                            $(window).off('scroll resize');
                        }
                    }
                });
            };
            $('.banner').slider();
            
        }
    }
});