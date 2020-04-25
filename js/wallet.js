$(function() {
    $(".second_video").trigger('play');
    setTimeout(() => {
        $(".second_video").css("display", "none");
        $('.first_video').trigger('play');
    }, 2100);
});


