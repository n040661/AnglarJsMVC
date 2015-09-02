var app = angular.module("app",[]);
var OrderListController = function ($scope, $http) {
    $http.get("/api/OrderApi/List").success(function (data) {
        console.log(data);
        $scope.ordersList = data;
        }).error(function() {
        console.log("error");
        });
};
app.controller('OrderListController', ['$scope', '$http', OrderListController]);


var datetime = angular.module("datetime", []);
var DatetimePicker = function($scope) {
    $scope.chooseDate = function() {
        chooseDate();


    }
};

function chooseDate() {
    var top = (window.innerHeight - 302) / 2;
    var left = (window.innerWidth - 295) / 2;

    $('#timepicker-container .timerpicker').css({ "top": top + 'px', "left": left + "px" });
    $('#timepicker-container').css({ 'display': 'block' });

    createTimePicker();
}

/**********************************时间控件开始***************************************************/
function bulidDateTimeStr(year, month, date, hour, minute) {
    return year + "/" + month + "/" + date + " " + hour + ":" + minute + ":00";
}

function getSelectedTime() {
    var selectedDayOption = $('#day-options .current-option');

    var currentYear = selectedDayOption.attr('data-pickyear');
    var currentMonth = selectedDayOption.attr('data-pickmonth');
    var currentDate = selectedDayOption.attr('data-pickdate');
    var currentHour = $('#hour-options .current-option').text();
    var currentMinute = $('#minute-options .current-option').text();

    var dateTime = bulidDateTimeStr(currentYear, Number(currentMonth) + 1, currentDate, currentHour, currentMinute);
    $scope.planT = currentHour + ":" + currentMinute;
    //var date = new Date(dateTime);
    return dateTime;
}

function getStartTime(d) {
    var start = new Date();
    start.setDate(start.getDate() + d);
    return start;
}

function createTimePicker() {
    $('#hour-options').flickable({ segments: 24, onEnd: function (e, seg) { timerSetCurrent(this); }, segment: 10 });
    $('#minute-options').flickable({ segments: 4, onEnd: function (e, seg) { timerSetCurrent(this); } });
    var counter = createDayOptions();
    var date = getStartTime(2);

    if (date != null) {
        var resultIndex = 0;
        $('#day-options > li').each(function (idx, item) {
            if ($(this).data('pickdate') == date.getDate() &&
                $(this).data('pickmonth') == date.getMonth() &&
                $(this).data('pickyear') == date.getFullYear()) {
                resultIndex = idx;
                return false;
            }
        });
    }

    $('#day-options').flickable({ segments: counter, onEnd: function (e, seg) { timerSetCurrent(this); }, segment: resultIndex });
    $('#day-options li').eq(resultIndex).addClass('current-option');
    $('.timepicker-cancel-btn').on('click', function (e) {
        $('#timepicker-container').css('display', 'none');
    });

    $('.timepicker-confirm-btn').on('click', function (e) {
        var useDt = getSelectedTime();
        window.localStorage.setItem($(".use-date").attr("name"), useDt);
        $scope.PlanTime = useDt;
        nightFee(useDt);
        //$(".use-date").text(useDt);
        $('#timepicker-container').css('display', 'none');
        $scope.$apply();
    });
}

function getDtTm(date, time) {
    if (time.length == 4) {
        return date + 'T0' + time;
    }
    return date + 'T' + time;
};

function nightFee() {
    var fee = parseInt($scope.product.Product.NightFee);

    //如果有夜间服务费
    if (fee != 0) {
        var isFee = false;
        var str_start = $scope.product.Product.NightStart;
        var str_end = $scope.product.Product.NightEnd;
        str_start = str_start.length == 4 ? "0" + str_start : str_start;
        str_end = str_end.length == 4 ? "0" + str_end : str_end;

        var start = new Date("2015/01/01 " + str_start + ":00");
        var end = new Date("2015/01/01 " + str_end + ":00");
        var useDate = new Date("2015/01/01 " + $scope.planT + ":00");

        if (start < end) {
            //同一天
            if (useDate > start && useDate < end) {
                isFee = true;
            }
        } else if (start > end) {
            //隔天
            if (useDate > start || useDate < end) {
                isFee = true;
            }
        }
        var ori_price = $scope.Price;//原始价格
        if (isFee) {
            $scope.product.Product.DiscountPrice = parseInt(ori_price) + fee;
        } else {
            $scope.product.Product.DiscountPrice = parseInt(ori_price);
        }
        $scope.isFee = isFee;
    }
};

function createDayOptions() {
    var parent = $('#day-options').parent();
    $('#day-options').remove();
    parent.append($("<ul id='day-options'></ul>"));
    var today = getStartTime(2);
    var endDay = new Date();
    endDay.setDate(today.getDate() + 366);
    today.setDate(today.getDate());
    var counter = 0;

    for (var d = today; d <= endDay; d.setDate(d.getDate() + 1)) {
        var date = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();

        var timeStr = "<li data-pickyear='" + year + "' data-pickdate='" + date + "' data-pickmonth='" + (month - 1) + "' >" + year + "年" + month + "月" + d.getDate() + "日  " + getWeekday(d) + "</li>";
        $('#day-options').append($(timeStr));
        counter++;

    }
    return counter;
}

function getWeekday(day) {
    var result = "周一";
    switch (day.getDay()) {
        case 0: { result = "周日"; }; break;
        case 1: { result = "周一"; }; break;
        case 2: { result = "周二"; }; break;
        case 3: { result = "周三"; }; break;
        case 4: { result = "周四"; }; break;
        case 5: { result = "周五"; }; break;
        case 6: { result = "周六"; }; break;
    }
    return result;
}

function timerSetCurrent(theTimer) {
    $(theTimer).find('li.current-option').removeClass();
    var currentIndex = $(theTimer).flickable('segment');
    var timer = window.setTimeout(function () { currentIndex = $(theTimer).flickable('segment'); $(theTimer).find('li').eq(currentIndex).addClass('current-option'); }, 0);
}

function chooseDate() {
    var top = (window.innerHeight - 302) / 2;
    var left = (window.innerWidth - 295) / 2;

    $('#timepicker-container .timerpicker').css({ "top": top + 'px', "left": left + "px" });
    $('#timepicker-container').css({ 'display': 'block' });

    createTimePicker();
}

//$("#chooseUseDate").on("click", function () {
//    var top = (window.innerHeight - 302) / 2;
//    var left = (window.innerWidth - 295) / 2;

//    $('#timepicker-container .timerpicker').css({ "top": top + 'px', "left": left + "px" });
//    $('#timepicker-container').css({ 'display': 'block' });

//    createTimePicker();
//});
/**********************************时间控件结束***************************************************/
datetime.constructor('DatetimePicker', ['$scope'], DatetimePicker);