$(function() {
    getuserinfo()
})

function getuserinfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 渲染页面ui
            renderAvatar(res.data)
                // console.log(res.data)
        },
        // 验证身份，不能直接跳后台
        // complete: function(res) {
        //     console.log(res)
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $("#welcome").html('欢迎&nbsp;&nbsp' + name)
        // 渲染用户头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avatar").hide()

    } else {
        $(".layui-nav-img").hide()
            //    获取大写首字母
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}
$("#btnLogoout").on("click", function() {
    var layer = layui.layer
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //    清空token值
        localStorage.removeItem('token')
        location.href = '/login.html'

        layer.close(index);
    });
})