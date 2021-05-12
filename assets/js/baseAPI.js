$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // 后台权限访问
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };
    // 验证身份，不能直接跳后台
    options.complete = function(res) {
        // console.log(res)
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})