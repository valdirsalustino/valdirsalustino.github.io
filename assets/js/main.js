(function($) {
    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
        xxsmall: '(max-width: 360px)'
    });
    $(function() {
        var $window = $(window),
            $body = $('body'),
            $wrapper = $('#wrapper');
        $body.addClass('is-loading');
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 100);
        });
        $('form').placeholder();
        skel.on('+medium -medium', function() {
            $.prioritize('.important\\28 medium\\29', skel.breakpoint('medium').active);
        });
        if (skel.vars.browser == 'ie')
            (function() {
                var flexboxFixTimeoutId;
                $window.on('resize.flexbox-fix', function() {
                    var $x = $('.fullscreen');
                    clearTimeout(flexboxFixTimeoutId);
                    flexboxFixTimeoutId = setTimeout(function() {
                        if ($x.prop('scrollHeight') > $window.height())
                            $x.css('height', 'auto');
                        else
                            $x.css('height', '100vh');
                    }, 250);
                }).triggerHandler('resize.flexbox-fix');
            })();
        if (!skel.canUse('object-fit'))
            (function() {
                $('.banner .image, .spotlight .image').each(function() {
                    var $this = $(this),
                        $img = $this.children('img'),
                        positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);
                    $this.css('background-image', 'url("' + $img.attr('src') + '")').css('background-repeat', 'no-repeat').css('background-size', 'cover');
                    switch (positionClass.length > 1 ? positionClass[1] : '') {
                    case 'left':
                        $this.css('background-position', 'left');
                        break;
                    case 'right':
                        $this.css('background-position', 'right');
                        break;
                    default:
                    case 'center':
                        $this.css('background-position', 'center');
                        break;
                    }
                    $img.css('opacity', '0');
                });
            })();
        $('.smooth-scroll').scrolly();
        $('.smooth-scroll-middle').scrolly({
            anchor: 'middle'
        });
        $wrapper.children().scrollex({
            top: '30vh',
            bottom: '30vh',
            initialize: function() {
                $(this).addClass('is-inactive');
            },
            terminate: function() {
                $(this).removeClass('is-inactive');
            },
            enter: function() {
                $(this).removeClass('is-inactive');
            },
            leave: function() {
                var $this = $(this);
                if ($this.hasClass('onscroll-bidirectional'))
                    $this.addClass('is-inactive');
            }
        });
        $('.items').scrollex({
            top: '30vh',
            bottom: '30vh',
            delay: 50,
            initialize: function() {
                $(this).addClass('is-inactive');
            },
            terminate: function() {
                $(this).removeClass('is-inactive');
            },
            enter: function() {
                $(this).removeClass('is-inactive');
            },
            leave: function() {
                var $this = $(this);
                if ($this.hasClass('onscroll-bidirectional'))
                    $this.addClass('is-inactive');
            }
        }).children().wrapInner('<div class="inner"></div>');
        $('.gallery').wrapInner('<div class="inner"></div>').prepend(skel.vars.mobile ? '' : '<div class="forward"></div><div class="backward"></div>').scrollex({
            top: '30vh',
            bottom: '30vh',
            delay: 50,
            initialize: function() {
                $(this).addClass('is-inactive');
            },
            terminate: function() {
                $(this).removeClass('is-inactive');
            },
            enter: function() {
                $(this).removeClass('is-inactive');
            },
            leave: function() {
                var $this = $(this);
                if ($this.hasClass('onscroll-bidirectional'))
                    $this.addClass('is-inactive');
            }
        }).children('.inner').css('overflow-y', skel.vars.mobile ? 'visible' : 'hidden').css('overflow-x', skel.vars.mobile ? 'scroll' : 'hidden').scrollLeft(0);
        $('.gallery').on('wheel', '.inner', function(event) {
            var $this = $(this),
                delta = (event.originalEvent.deltaX * 10);
            if (delta > 0)
                delta = Math.min(25, delta);
            else if (delta < 0)
                delta = Math.max(-25, delta);
            $this.scrollLeft($this.scrollLeft() + delta);
        }).on('mouseenter', '.forward, .backward', function(event) {
            var $this = $(this),
                $inner = $this.siblings('.inner'),
                direction = ($this.hasClass('forward') ? 1 : -1);
            clearInterval(this._gallery_moveIntervalId);
            this._gallery_moveIntervalId = setInterval(function() {
                $inner.scrollLeft($inner.scrollLeft() + (5 * direction));
            }, 10);
        }).on('mouseleave', '.forward, .backward', function(event) {
            clearInterval(this._gallery_moveIntervalId);
        });
        $('.gallery.lightbox').on('click', 'a', function(event) {
            var $a = $(this),
                $gallery = $a.parents('.gallery'),
                $modal = $gallery.children('.modal'),
                $modalImg = $modal.find('img'),
                href = $a.attr('href');
            if (!href.match(/\.(jpg|gif|png|mp4)$/))
                return;
            event.preventDefault();
            event.stopPropagation();
            if ($modal[0]._locked)
                return;
            $modal[0]._locked = true;
            $modalImg.attr('src', href);
            $modal.addClass('visible');
            $modal.focus();
            setTimeout(function() {
                $modal[0]._locked = false;
            }, 600);
        }).on('click', '.modal', function(event) {
            var $modal = $(this),
                $modalImg = $modal.find('img');
            if ($modal[0]._locked)
                return;
            if (!$modal.hasClass('visible'))
                return;
            $modal[0]._locked = true;
            $modal.removeClass('loaded')
            setTimeout(function() {
                $modal.removeClass('visible')
                setTimeout(function() {
                    $modalImg.attr('src', '');
                    $modal[0]._locked = false;
                    $body.focus();
                }, 475);
            }, 125);
        }).on('keypress', '.modal', function(event) {
            var $modal = $(this);
            if (event.keyCode == 27)
                $modal.trigger('click');
        }).prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>').find('img').on('load', function(event) {
            var $modalImg = $(this),
                $modal = $modalImg.parents('.modal');
            setTimeout(function() {
                if (!$modal.hasClass('visible'))
                    return;
                $modal.addClass('loaded');
            }, 275);
        });
    });
})(jQuery);