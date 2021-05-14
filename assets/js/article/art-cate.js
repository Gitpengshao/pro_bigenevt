$(function() {
    var layer = layui.layer
    initArtcateList()

    function initArtcateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取图书失败')
                }
                var strhtml = template('tel-table', res)
                $("tbody").html(strhtml)
            }
        })
    }
    var indexAdd = null
    $("#btnAddart").on("click", function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $("#dialog-add").html()
            });

        })
        // 页面没有提前生成弹出层，使用代理方式获取表单
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('图书添加失败')
                }
                initArtcateList()
                layer.msg('图书添加成功')
                layer.close(indexAdd)
            }
        })
    })
    var indexEitd = null
    var form = layui.form
    $("body").on("click", ".btn-edit", function() {
        indexEitd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return later.msg('获取图书失败')
                }
                //   填充form表单值，需要lay-filter属性
                form.val("form-edit", res.data)
            }
        })
    })
    $("body").on("submit", "#form-edit", function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('图书修改失败!')
                }
                layer.close(indexEitd)
                layer.msg('图书修改成功!')
                initArtcateList()
            }
        })
    })

    $("tbody").on("click", ".btn-delete", function() {
        var id = $(this).attr("data-id")
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除图书失败！')
                    }
                    layer.msg('删除图书成功！')
                    layer.close(index);
                    initArtcateList()
                }

            })

        });
    })
})