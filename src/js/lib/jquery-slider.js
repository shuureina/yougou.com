(function ($) {
    $.fn.extend({
        slider: function (options) {
            // 函数式编程
            var main = null, //主函数
                init = null, //初始化
                start = null, //开始
                stop = null, //结束
                prev = null, //上一张
                next = null, //下一张
                current= null,//当前小图标对应的一张
                timer = null, //计时器
                elms = {}, // 命名空间  存储元素
                defaults = {
                    speed: 500, // 动画速度
                    delay: 3000 // 延迟
                };

            $.extend(defaults, options); //合并参数


            init = function () {
                // 元素选取
                elms._index = 1; //当前播放的图片索引
                elms.sliderDiv = this.children('.pic-list'); //选取移动的div元素
                elms.btn = this.find('.arrows'); //选取箭头按钮
                elms.icon = this.find('.circle-list li');//选取移动小图标
                elms.img = elms.sliderDiv.children('.pic-item');
                elms.sliderDiv.append(elms.img.eq(0).clone()); // 克隆第一张图片
                // 事件绑定
                elms.btn.on('click', function () {
                    if (elms.btn.index(this)) {
                        next();
                    } else {
                        prev();
                    }
                });
                elms.icon.on('click', function(ev) {
                    current(ev);
                });
                this.hover(function () {
                    stop();
                }, function () {
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                })
            }.bind(this);


            start = function (direction) {
                var left = `-=${elms.img.width()}`; //设置移动的距离
                if (!direction) {
                    left = `+=${elms.img.width()}`;
                    if (elms._index == 1) {
                        elms._index = elms.sliderDiv.children().length;
                        var divLeft = this.offset().left,
                            imgLeft = elms.img.last().offset().left;
                        elms.sliderDiv.css('left', '-' + (imgLeft - divLeft) + 'px');
                    }
                }
                
                elms.sliderDiv.animate({
                    left: left
                }, defaults.speed, function () {
                    if (direction) elms._index++; // 索引+1
                    else elms._index--;

                    if (elms._index === elms.sliderDiv.children().length) { //播放到最后一张
                        elms._index = 1; //修改成1
                        elms.sliderDiv.css('left', 0); //定位为0
                    }
                });
            }.bind(this);
            

            prev = function () {
                stop();
                start(0);
            }

            next = function () {
                stop();
                start(1);
            }
            current = function (ev) {
                stop();
                console.log($(ev.target).index());
                $(ev.target).addClass('active').siblings().removeClass('active');
                var left = null;//设置移动距离
                if ($(ev.target).index() == 0) {
                    left = 0;
                } else if($(ev.target).index() == 1) {
                    left = `-${elms.img.width()}`;
                }
                elms.sliderDiv.animate({
                    left:left
                }, defaults.speed)
            }
            stop = function () {
                elms.sliderDiv.stop(true, true);
                clearInterval(timer);
            }

            main = function () {
                init();
                timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
            }

            main();
        }
    });
})(jQuery);