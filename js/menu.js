/* scroll on/off script */
(function(e){"use strict";function i(t,n){this.opts=e.extend({handleKeys:!0,scrollEventKeys:[32,33,34,35,36,37,38,39,40]},n);this.$container=t;this.$document=e(document);this.disable()}var t,n=function(e){for(var t=0;t<this.opts.scrollEventKeys.length;t++)if(e.keyCode===this.opts.scrollEventKeys[t]){e.preventDefault();return}},r=function(e){e.preventDefault()};i.prototype={disable:function(){var e=this;e.$container.on("mousewheel.UserScrollDisabler DOMMouseScroll.UserScrollDisabler touchmove.UserScrollDisabler",r);e.opts.handleKeys&&e.$document.on("keydown.UserScrollDisabler",function(t){n.call(e,t)})},undo:function(){var e=this;e.$container.off(".UserScrollDisabler");e.opts.handleKeys&&e.$document.off(".UserScrollDisabler")}};e.fn.disablescroll=function(e){!t&&(typeof e=="object"||!e)?t=new i(this,e):t&&t[e]?t[e].call(t):t&&t.disable.call(t)}})(jQuery);
//menu
let click = false;
$(".menu_button").on("click", function(even){
    console.log();
    if(!click){
        $(window).disablescroll();
        $(".menu_button").addClass("isFlip");
        $(".menu_button").delay(500).addClass("isFlip_right",500);
        $(".menu").addClass("menu_open");
        $("header").delay(500).addClass("menu_open", 500);
        $(".menu ul, .menu a, .licens").delay(1000).removeClass("hide", 500);
        setTimeout(function(){click = true;}, 1200);
    }else{
        $(".menu ul, .menu a, .licens").addClass("hide", 500);
        $(".menu_button").delay(500).removeClass("isFlip_right",500);
        $(".menu_button").delay(500).removeClass("isFlip", 500);
        $("header").delay(1000).removeClass("menu_open", 500);
        $(".menu").delay(1500).removeClass("menu_open", 500);
        setTimeout(function(){click = false;$(window).disablescroll("undo");}, 2000);
    };
});
//menu/