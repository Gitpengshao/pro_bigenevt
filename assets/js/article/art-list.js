$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    // 定义一个查询对象
    var q = {
        pagenum: 1, //页码值pagenum
        pagesize: 2, //每页显示多少条数据pagesize
        cate_id: '', //文章分类的idcate_id	
        state: '' //文章发布的状态state

    }

    initTable()
    initcate()


    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取图书列表失败')
                }
                var strhtml = template("tel-table", res)
                $("tbody").html(strhtml)
                rederPage(res.total)
            }
        })
    }
    // 时间过滤器
    template.defaults.imports.dateFormat = function(date) {
        const dt = new Date()
        var y = dt.getFullYear()
        var h = zero(dt.getMonth() + 1)
        var d = zero(dt.getDate())

        var hh = zero(dt.getHours())
        var mm = zero(dt.getMinutes())
        var ss = zero(dt.getSeconds())
        return y + '-' + h + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function zero(n) {
        return n > 9 ? n : '0' + n
    }

    function initcate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败!')
                }
                layer.msg('获取文章列表成功!')
                var htmlstr = template("tel-cate", res)
                $("[name=cate_id]").html(htmlstr)
                form.render()
            }
        })
    }
    // 筛选表单
    $("#form-search").on("submit", function(e) {
            e.preventDefault()
            var cate_id = $("[name=cate_id]").val()
            var state = $("[name=state]").val()
            q.cate_id = cate_id
            q.state = state
                // 根据筛选条件，重新渲染页面
            initTable()

        })
        // 渲染分页的方法
    function rederPage(total) {
        laypage.render({
            elem: 'pageBox', //渲染分页
            count: total, //有多少页
            limit: q.pagesize, //一页显示多少条数据
            curr: q.pagenum, //当前显示第几页
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                    // 通过哪种触发方式触发jump这个函数
                if (!first) {
                    initTable()
                }
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10]
        })
    }

    $("tbody").on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        var len = $(".btn-delete").length
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("删除图书失败！")
                    }
                    // 删除最后一页全部数据自动跳转上一页数据，根据删除按钮判断
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? q.pagenum : q.pagenum - 1
                    }
                    initTable()
                    layer.msg("删除图书成功！")
                    layer.close(index);
                }
            })

        });

    })
    var indexEdit = null
    $("body").on("click", ".btn-edit", function() {
        indexEdit = layer.open({
            type: 1,
            area: ['95%', '100%'],
            title: '修改文章内容',
            content: $("#art-pub").html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取图书失败')
                }
                var htmlstr = template('#art-pub', res.data)
                $("#art-pub").html(htmlstr)
                    // 初始化富文本编辑器
                initEditor()
            }
        })
    })
})