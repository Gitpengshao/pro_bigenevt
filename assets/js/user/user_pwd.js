$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '原密码不能和新密码相同'
            }
        },
        repwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '新密码不一致'
            }
        }
    })
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败！')
                }
                layer.msg('修改密码成功')
                    // 重置表单
                $(".layui-form")[0].reset()
            }
        })
    })
})