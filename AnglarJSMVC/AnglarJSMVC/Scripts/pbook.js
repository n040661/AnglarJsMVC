Zepto(function ($) {
 
    
    var footerPopup = function () {

        $('.popup-box .close-s').on('click', function () {
            hideFooterDetail();
        })

        function showFooterDetail() {
            $('.price-detail-popup').addClass('is-visible');
            $('.popup-box').animate({ 'bottom': '7.3rem' }, 400);
        }

        function hideFooterDetail() {
            var h = $('.popup-box').height();
            $('.popup-box').animate({ 'bottom': -h }, 400);
            $('.price-detail-popup').removeClass('is-visible');
        }

        $('.price-detail').on('click', function () {
            var $footerPopupDisplay = $('.price-detail-popup').css('display');
            if ($footerPopupDisplay == 'none') {
                showFooterDetail();
            } else {
                hideFooterDetail();
            }
        });
    }

    footerPopup();
    //function load() {
    //    $(".load").each(function () {
    //        var $self = $(this);
    //        var key = $self.data("key");
    //        var v = window.localStorage.getItem(key);
    //        if ($self.is("input, textarea, select")) {
    //            $self.val(v);
    //        } else {
    //            $self.text(v);
    //        }
    //    });
    //}

    $(".load").blur(function () {
        var $self = $(this);
        var key = $self.attr("name");
        var v = null;
        if ($self.is("input, textarea, select")) {
            v = $self.val();
        } else {
            v = $self.text();
        }
        window.localStorage.setItem(key, v);
    });

})