$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '请输入小于6个数的用户名'
            }
        }
    })
    initUserInfo()
        // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res)
                    // 快速赋值
                form.val('formUserInfo', res.data)
            }
        })
    };
    $(".layui-form").on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('数据提交失败!')
                    }
                    layer.msg('用户信息更新提交成功')
                    window.parent.getuserinfo()
                }
            })

        })
        // 重置信息
    $("#btnReset").on("click", function(e) {
        e.preventDefault()
        initUserInfo()
    })
})