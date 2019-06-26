// changement du fond d'écran selon la timeline 

(function($) {
    $.fn.timeline = function() {
      var selectors = {
        id: $(this),
        item: $(this).find(".timeline-item"),
        activeClass: "timeline-item--active",
        img: ".timeline__img"
      };
      selectors.item.eq(0).addClass(selectors.activeClass);
      selectors.id.css(
        "background-image",
        "url(" +
          selectors.item
            .first()
            .find(selectors.img)
            .attr("src") +
          ")"
      );
      var itemLength = selectors.item.length;
      $(window).scroll(function() {
        var max, min;
        var pos = $(this).scrollTop();
        selectors.item.each(function(i) {
          min = $(this).offset().top;
          max = $(this).height() + $(this).offset().top;
          var that = $(this);
          if (i == itemLength - 2 && pos > min + $(this).height() / 2) {
            selectors.item.removeClass(selectors.activeClass);
            selectors.id.css(
              "background-image",
              "url(" +
                selectors.item
                  .last()
                  .find(selectors.img)
                  .attr("src") +
                ")"
            );
            selectors.item.last().addClass(selectors.activeClass);
          } else if (pos <= max + 200 && pos >= min - 200) {
            selectors.id.css(
              "background-image",
              "url(" +
                $(this)
                  .find(selectors.img)
                  .attr("src") +
                ")"
            );
            selectors.item.removeClass(selectors.activeClass);
            $(this).addClass(selectors.activeClass);
          }
        });
      });
    };

    // hack navigation carroussel redirection pages suivantes / précédentes
    var carouselPrev = $(".carousel-item.active").prev();
    if(carouselPrev.hasClass('carousel-item'))
    {
      $(".carousel-control-prev").on("click", function(e) {
          e.preventDefault();
          var href = $(".carousel-item.active").prev().find('a').attr('href');
          if(href && href != "#") {
              window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/' + href;
          }
      });
    }
    else
    {
      $(".carousel-control-prev").hide();
    }

    var carouselNext = $(".carousel-item.active").next();
    if(carouselNext.hasClass('carousel-item'))
    {
      $(".carousel-control-next").on("click", function(e) {
          e.preventDefault();
          var href = $(".carousel-item.active").next().find('a').attr('href');
          if(href && href != "#") {
              window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/' + href;
          }
      });
    }
    else
    {
      $(".carousel-control-next").hide();
    }
  })(jQuery);
  
  $("#timeline-1").timeline();