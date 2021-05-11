$(function() {
    $("#link-reg").on("click", function() {
        $(".reg-box").show()
        $(".login-box").hide()
            // $(".reg-box").show().siblings(".login-box").hide()

    })
    $("#link-login").on("click", function() {
            $(".reg-box").hide()
            $(".login-box").show()
                // $(".reg-box").hide().siblings(".login-box").show()
        })
        // 使用layui验证表单
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $(".reg-box [name=password]").val()
                if (pwd !== value) {
                    return "密码不一致请重新确认"

                }
            }
        })
        // 注册区域
    $("#form-reg").on("submit", function(e) {
            e.preventDefault()
            $.post('/api/reguser', {
                username: $("#form-reg [name=username]").val(),
                password: $("#form-reg [name=password]").val()
            }, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg("注册成功，请登录！")
                $("#link-login").click()
            })
        })
        // 登录区域
    $("#form-login").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data:
            // 获取当前表单数据
                $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败，请重新登录")
                }
                layer.msg('登录成功')
                    // 把token值存储到本地
                localStorage.setItem('token', res.token)
                    // 却换后台页面
                location.href = '/index.html'
            }

        })
    })

})