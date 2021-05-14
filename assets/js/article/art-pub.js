$(function() {
    var layer = layui.layer
    var form = layui.form
    initcate()
        // 初始化富文本编辑器
    initEditor()

    function initcate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取图书类型失败！')
                }
                var htmlstr = template("tel-cate", res)
                $("[name=cate_id]").html(htmlstr)
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
        // 选择封面事件
    $("#coverFile").on("click", function() {
        $(file).click()
    })
    $("#file").on("change", function(e) {
            var files = e.target.files
            if (files.length === 0) {
                return layer.msg('请选择文件')
            }
            var newImgURL = URL.createObjectURL(files[0])
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 定义发布状态
    var artState = '已发布'
    $(".btnSave2").on("click", function() {
        artState = '草稿'
    })
    $("#form-pub").on("submit", function(e) {
        e.preventDefault()
            //  数据转为Formdata类型，并且要js原生
        var fd = new FormData($(this)[0])
        fd.append('state', artState)
        fd.forEach(function(i, v) {
            console.log(v, i)
        })
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)
            })
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布失败')
                }
                layer.msg('发布成功')
                location.href = '/article/art-list.html'
            }
        })
    }
})