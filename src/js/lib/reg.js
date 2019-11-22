let baseUrl = "http://127.0.0.1:8080/yougou.com";

define(['jquery', 'md5'], function ($, md5) {
    return {
        regEv: function (selector, event) {
            var $phone = $('#phone');
            var $username = $('#username');
            var $psd = $('#password');
            var $email = $('#email');
            var reglist = $phone.parents('.reg-list');
            var $submit = $('.reg-sub');
            $(selector).on(event, function () {
                $.ajax({
                    type: 'post',
                    url: `${baseUrl}/lib/reg.php`,
                    data: {
                        username: $username.val(),
                        password: $.md5($psd.val()),
                        email: $email.val(),
                        phone: $phone.val(),
                        submit:$submit.val()
                    },
                    success: function (res) {
                             if (res) {
                                let data = JSON.parse(res);
                                if (data.msg == "注册成功") {
                                    alert(data.msg);
                                    location.href = `${data.src}`;
                                } else if (data.msg == "该手机号已存在,请点击登录") {
                                    $phone.focus().css('background', '#e8f0fe');
                                    reglist.find('.errortips').show().html(data.msg);
                                    $phone.parent('.form-group').addClass('active');
                                    reglist.find('.righttips').hide();
                                      
                                }
                            }
                    }
                })
            })
        },
        render: function () {
        //    var $phone = $('#phone');
        //    var $username = $('#username');
        //    var $email = $('#email');
           var $psd = $('#password');
        //    var $checkpsd = $('#checkpass');
            var inputs = $('.form-group input');
            var Err = inputs.parents('.reg-list').find('.errortips');
            var formgp = inputs.parent('.form-group');
            var psdStrength = $('.psdStrength');
            var psdStrengthem = $('.psdStrength em');
            var psdFlag = false;//判断密码开关
            function noempty() {
                if (inputs.val() == '') {
                    Err.show();
                    formgp.addClass('active');
                    } else {
                     Err.hide();
                    formgp.removeClass('active');
                    }
            };
            $('.reg-sub').on('click', function () {
                noempty();
            });
            inputs.on('blur', ev => {
                // console.log(ev.target.id);
                // console.log(ev.target.value);
                var $ev = $(ev.target);
                var right = $ev.parents('.reg-list').find('.righttips');
                var Err1 = $ev.parents('.reg-list').find('.errortips');
                var formgp1 = $ev.parent('.form-group');
                // 手机号码的验证规则：
                let regP = /^1[3|5|7|8]\d{9}$/;
                // 用户名的验证规则：
                let regN = /^[\u4e00-\u9fa5]+|[A-Za-z]+|\d+$/;
                //邮箱的验证规则：
                let regE = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
               

                switch (ev.target.id) {
                    case "phone":
                        if ($ev.val() !== '') {
                            if (regP.test($ev.val())) { //匹配成功righttips
                                Err1.hide();
                                right.show();
                                formgp1.removeClass('active');
                            } else { //报错
                                right.hide();
                                Err1.show().html('格式有误');
                                formgp1.addClass('active');
                            }
                        } else {
                            right.hide();
                            Err1.show().html('请输入手机号码');
                            formgp1.addClass('active');
                        }
                        break;
                    case "username":
                        if ($ev.val() !== '') {
                            if (regN.test($ev.val())) { //匹配成功righttips
                                let len = ev.target.value.replace(/[\u4e00-\u9fa5]/g, 'aa').length;
                                if (len <= 16 && len >= 3) {
                                    Err1.hide();
                                    right.show();
                                    formgp1.removeClass('active');
                                } else {
                                    right.hide();
                                    Err1.show().html('用户名应在3-16字符或2-8个汉字以内');
                                    formgp1.addClass('active');
                                }
                            } else { //报错
                                right.hide();
                                Err1.show().html('格式有误');
                                formgp1.addClass('active');
                            }
                        } else {
                            right.hide();
                            Err1.show().html('请输入用户名');
                            formgp1.addClass('active');
                        }
                        break;
                    case "email":
                        if ($ev.val() != '') {
                            if (regE.test($ev.val())) {
                                Err1.hide();
                                right.show();
                                formgp1.removeClass('active');
                            } else {
                                right.hide();
                                Err1.show().html('格式有误');
                            }
                        } else {
                            right.hide();
                            Err1.show().html('请输入邮箱号');
                            formgp1.addClass('active');
                        }
                        break;
                    case "password":
                        if ($ev.val() == '') {
                            right.hide();
                            Err1.show().html('请输入密码');
                            formgp1.addClass('active');
                            psdFlag = false;
                        } else  if (psdFlag) {
                                Err1.hide();
                                right.show();
                            formgp1.removeClass('active');
                            psdStrength.hide();
                            psdStrengthem.eq(2).removeClass('psdheight');
                        } 
                        
                        break;
                    case "checkpass":
                        if ($ev.val() != '') {
                            if ($ev.val() == $psd.val()) {
                                Err1.hide();
                                right.show();
                                formgp1.removeClass('active');
                            } else {
                                right.hide();
                                Err1.show().html('两次输入的密码不一致');
                                formgp1.addClass('active');
                            }
                        } else {
                            right.hide();
                            Err1.show().html('请输入密码');
                            formgp1.addClass('active');
                        }
                        break;
                }

            });
            $psd.on('keyup', function () {
                var $val = $(this).val();
                var right = $(this).parents('.reg-list').find('.righttips');
                var Err1 = $(this).parents('.reg-list').find('.errortips');
                var formgp1 = $(this).parent('.form-group');
                psdStrength.show();
                let len = this.value.length;
                if (len >= 6 && len <= 25) {//长度范围6-25个字符
                    var num = 0;//设置字符个数
                    //密码的验证规则：   
                    var regnum = /\d+/;//number
                    var reglower = /[a-z]+/;//小写字母
                    var regupper = /[A-Z]+/;//大写字母
                    var regother = /[\W\_]+/;//其他
                    Err1.hide();
                    formgp1.removeClass('active');
                    if (regnum.test($val)) {
                        num++;
                    }
                    if (reglower.test($val)) {
                        num++;

                    }
                    if (regupper.test($val)) {
                        num++;

                    }
                    if (regother.test($val)) {
                        num++;

                    }
                    switch (num) {
                        case 1:
                            psdStrengthem.eq(0).addClass('psdlow');
                            psdStrengthem.eq(1).removeClass('psdmiddle');
                            psdStrengthem.eq(2).removeClass('psdheight');
                            psdFlag = false;
                            break;
                        case 2:
                        case 3:
                            psdStrengthem.eq(0).removeClass('psdlow');
                            psdStrengthem.eq(1).addClass('psdmiddle');
                            psdStrengthem.eq(2).removeClass('psdheight');
                            psdFlag = true;
                            break;
                        case 4:
                            psdStrengthem.eq(1).removeClass('psdmiddle');
                            psdStrengthem.eq(2).addClass('psdheight');
                            psdFlag = true;
                            break;
                       default:

                             psdStrengthem.eq(0).removeClass('psdlow');
                            break;
                    }
                    
                } else {
                    right.hide();
                    Err1.show().html('密码长度有误');
                    formgp1.addClass('active');
                    psdFlag = false;
                }
            })
         
        }
    }
})
