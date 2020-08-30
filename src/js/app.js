(function($) {

    $(".open-modal").on("click", function() {
        let target = $(this).attr("href");

        $(target).fadeIn();
    });

    $(".close-modal").on("click", function() {
        let target = $(this).attr("href");

        $(target).fadeOut();
    });

}) (jQuery);