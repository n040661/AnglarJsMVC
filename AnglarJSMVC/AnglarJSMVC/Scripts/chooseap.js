Zepto(function ($) {
    var ele = $("#alphabet");
    var headerH = $('.header').height();
    var searchH = $('.search-wrap').height();
    var windowH = $(window).height();
    var alphabetH = windowH - searchH;
    var $alphabet = $('.alphabet-list');
    var alphabetMt = parseInt($('.alphabet-list').css('margin-top'));
    var wh = (alphabetH / 26) + 'px';
    ele.on('touchmove', function (e) {
        //关闭滚动条事件
        e.preventDefault();
        var _startChar = e.target.innerHTML;
        var _startCharCode = _startChar.charCodeAt();
        var offset = e.touches[0].clientY - alphabetMt - (_startCharCode - 65) * parseInt(wh);
        var count = Math.floor(offset / parseInt(wh));
        var _currentCharCode = _startCharCode + count;

        if (_currentCharCode > 90) {
            _currentCharCode = 90;
        }

        if (_currentCharCode < 65) {
            _currentCharCode = 65;
        }
        var _currentChar = String.fromCharCode(_currentCharCode);
        $('#here').text(_currentChar);


        $('.floatbox').remove();
        var anchorText = _currentChar;
        var anchor = $('#' + anchorText);
        var currentLi = $('.alphabet-list li');
        var floatBox = "<div class='floatbox'>" + anchorText + "</div>"
        currentLi.each(function (index,item) {
            if (item.innerHTML == anchorText) {
                $('.alphabet-list li:eq(' + index + ')').append(floatBox);
            }
        })
        if (anchor.length > 0) {
            anchor[0].scrollIntoView();
        }
    })

    ele.on('touchend', function (e) {
        if ($('.floatbox').css('display') == "block") {
            setTimeout(function () { $('.floatbox').remove() }, 1000);
        }
    })

    //FastClick.attach(document.body);
    $('.alphabet-list li').on('click', function (e) {
        $('.floatbox').remove();
        var anchorText = $(this).text();
        var anchor = $('#' + anchorText);
        var floatBox = "<div class='floatbox'>" + anchorText + "</div>"
        $(this).append(floatBox);
        if ($('.floatbox').css('display') == "block") {
            setTimeout(function () { $('.floatbox').remove() }, 1000);
        }
        if (anchor.length > 0) {
            anchor[0].scrollIntoView();
        }
    })
    
    //alert(windowH + " " + headerH + " " + searchH + " " + wh);
    $alphabet.css('height', windowH + 'px');
    $('.alphabet-list li').css({ 'width': wh, 'height': wh, 'line-height': wh });

    $(window).scroll(function () {
        if ($(window).scrollTop() >= (headerH + searchH)) {
            $alphabet.show();
        } else {
            $alphabet.hide();
        }
    })
})