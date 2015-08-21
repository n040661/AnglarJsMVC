var hzc = angular.module("hzc_app", []);
hzc.helper = {};

//格式化字符串，仿C# String.Fromat()
hzc.helper.format = function () {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

//获取QueryString的数组
hzc.helper.getQueryString = function(){
    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
    if (result == null) {
        return "";
    }
    for (var i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }
    return result;
}


//根据QueryString参数名称获取值
hzc.helper.getQueryStringByName = function(name,defaultValue) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return defaultValue;
    }
    return result[1];
}

//根据QueryString参数索引获取值
hzc.helper.getQueryStringByIndex = function(index) {
    if (index == null) {
        return "";
    }
    var queryStringList = getQueryString();
    if (index >= queryStringList.length) {
        return "";
    }
    var result = queryStringList[index];
    var startIndex = result.indexOf("=") + 1;
    result = result.substring(startIndex);
    return result;
}

//获取路由参数
hzc.helper.getRouteParam = function () {
    var result = location.pathname.match(new RegExp("[/]+[^/]+", "g"));
    if (result == null) {
        return "";
    }
    for (var i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }
    return result;
}

//消息提醒
hzc.helper.alertShow = function (text) {
    var alert = "<section class='alert'>" + text + "</section>";
    $('body').append(alert);
    $('.alert').addClass('in');

    window.setTimeout(function (e) {
        $('.alert').remove();
        //$('.alert').addClass('in');
    }, 1000);
}

hzc.helper.alertHide = function () {
    $('.alert').remove();
}

//关闭滚动条事件
hzc.helper.closeTouchmove = function () {
    $(document).on('touchmove', function (e) {
        e.preventDefault();
    });
}
