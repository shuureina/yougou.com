let baseUrl = "http://127.0.0.1:8080/yougou.com";

define(['jquery', 'md5'], function ($, md5) {
    return {
        regEv: function (selector,event) {
            $(selector).on(event, function () {
                $.ajax({
                    type: 'post',
                    url: `${baseUrl}/lib/reg.php`,
                    data: {
                        username: $('#username').val(),
                        password: $.md5($('#password').val()),
                        email: $('#email').val(),
                        phone:$('#phone').val()
                    },
                    success: function (res) {
                        let data = JSON.parse(res);
                        console.log(data);
                        if (data.msg == "注册成功") {
                            alert(data.msg);
                            location.href = `${data.src}`;
                        } else if (data.msg == "该手机号已存在") {
                            $('#phone').focus().css('background','#e8f0fe');
                            $('#phone').parents('.reg-list').find('.errortips').show().html(data.msg);
                            $('#phone').parent('.form-group').addClass('active');
                        }
                    }
                })
            })
        },
        RegExps: function () {
            
        }
    }
})
