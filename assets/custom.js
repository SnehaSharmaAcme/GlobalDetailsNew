$(document).ready(function () {
  var intervvvv = setInterval(function () {
    if (
      $(
        '.product-form__buttons .shopify-payment-button [data-testid="Checkout-button"]'
      ).length
    ) {
      $(".product-form__buttons .shopify-payment-button")
        .detach()
        .insertBefore(".product-form");
      clearInterval(intervvvv);
    }
  }, 100);
  $(".activeSizeTab").click(function () {
    var $this = $(this);
    var $target = $this.attr("data-target");
    console.log($target);
    $(".sizeGuideContent").hide();
    if (!$this.hasClass("active")) {
      $(".activeSizeTab").removeClass("active");
    }
    $this.toggleClass("active");
    $($target).show();
  });

  $(".video-section-1 #Deferred-Poster-Modal-33647006843154").trigger("click");

  $(".prd_acc--main .prd_acc--text .prd_text--accordion").hide();
  $(".js-video-button").click(function () {
    $el = $(this).closest(".video-section").attr("data-video-attr");
    console.log($el);
    // var play_attr = $(this).find(".vid-btn-video-section-1").attr("data-state");
    var play_attr = $(this, $el).attr("data-state");
    console.log(play_attr);
    if (play_attr == "playing") {
      $(this, $el).attr("data-state", "paused");
      //$(this,$el).text("Playing");
      $(".video-section." + $el + " video")[0].pause();
    }
    if (play_attr == "paused") {
      $(this, $el).attr("data-state", "playing");
      // $(this,$el).text("Paused")
      $(".video-section." + $el + " video")[0].play();
    }
  });
  product_slick_slider();
  var color_swatch = $("input[name='Color']:checked").val();
  color_swatch = color_swatch.toLowerCase();
  var color_swatch_rplace = color_swatch.replace(" ", "-");
  $(".product-slider-for, .product-slider-nav").slick("slickUnfilter");
  $(".product-slider-for, .product-slider-nav").slick(
    "slickFilter",
    "." + color_swatch_rplace
  );
  $(".sw_color").hover(function () {
    $(".sw_color").removeClass("active");
    $(this).addClass("active");

    if ($(this).hasClass("active")) {
      var color_name = $(this).find("[name='Color']").val();
      $(this).closest(".color_swatches").find(".color_name").html(color_name);
      console.log(color_name);
    }
    // console.log(color_name);
  });
  //var color_name = $(".sw_color [name='Color']:checked").val();
  //(".color_name").html(color_name);
  $(".sw_color").each(function () {
    // console.log(this);
    var color_name = $(this).find("input[name='Color']:checked").val();
    $(this).closest(".color_swatches").find(".color_name").html(color_name);
    console.log(color_name);
  });
  // setTimeout(function(){
  //     $('.shopify-payment-button').detach().insertBefore('.product-form');
  //     },1200);
});
$(document).on(
  "click",
  ".prd_acc--main .prd_acc--text .prd_acc--title",
  function () {
    if ($(this).parents(".prd_acc--text").hasClass("active")) {
      $(this)
        .parents(".prd_acc--text")
        .removeClass("active")
        .find(".prd_text--accordion")
        .slideUp();
      $(this)
        .parents(".prd_acc--text")
        .find(".prd_acc--title")
        .removeClass("active");
    } else {
      $(".prd_acc--main .prd_acc--text.active .prd_text--accordion").slideUp();
      $(".prd_acc--main .prd_acc--text.active").removeClass("active");
      $(".prd_acc--main .prd_acc--text .prd_acc--title.active").removeClass(
        "active"
      );
      $(this)
        .parents(".prd_acc--text")
        .addClass("active")
        .find(".prd_text--accordion")
        .slideDown();
      $(this)
        .parents(".prd_acc--text")
        .find(".prd_acc--title")
        .addClass("active");
    }
    return false;
  }
);
$(document).on("change", "input[name='Color']", function () {
  //$('input[name="Color"]').change(function(){
  let variant = $(this).val();
  variant = variant.toLowerCase();
  var variant_rplace = variant.replace(" ", "-");
  console.log(variant_rplace);
  $(".color_name").removeClass("active");
  $(".color_name[data-color='" + variant_rplace + "']").addClass("active");
  $(".product-slider-for").slick("slickGoTo", 0);
  setTimeout(function () {
    $(".thumbnail-list__item").each(function (index) {
      $(this).attr("data-slick-index", index);
      console.log(index);
    });
  }, 1000);
  setTimeout(function () {
    $(".product-slider-for, .product-slider-nav").slick("slickUnfilter");
    $(".product-slider-for, .product-slider-nav").slick(
      "slickFilter",
      "." + variant_rplace
    );
  }, 100);
});

$(document).on("click", ".thumbnail-list__item", function (e) {
  e.preventDefault();
  var slideno = $(this).parents(".slick-slide").attr("data-slick-index");
  console.log(slideno);
  $(".product-slider-for").slick("slickGoTo", slideno);
});
function product_slick_slider() {
  $(".product-slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // fade: true,
    infinite: false,
    asNavFor: ".product-slider-nav",
  });
  $(".product-slider-nav").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    vertical: true,
    infinite: false,
    asNavFor: ".product-slider-for",
  });
}

$(".product-slider-nav, .product-slider-for").on(
  "afterChange",
  function (event, slick, currentSlide, nextSlide) {
    var $el = $(event.target),
      $wrap = $el.closest(".product__media-wrapper"),
      $current = $el.find(".slick-current.slick-active"),
      index = $current.data("slick-index"),
      $main = $wrap.find(".product-slider-for"),
      $thumb = $wrap.find(".product-slider-nav");
    console.log($thumb, $main, $current, index);
    $thumb.find(".thumbnail").removeAttr("aria-current");
    $thumb
      .find(`[data-slick-index="${index}"] .thumbnail`)
      .attr("aria-current", "true");
    console.log(
      $thumb.find(".thumbnail"),
      $thumb.find(`[data-slick-index="${index}"] .thumbnail`)
    );
  }
);

$(document).on("click", ".size_label__js", function (e) {
  e.preventDefault();
  var $el = $(this),
    target = $el.attr("href");
  modal(target);
});

$(document).on("click", ".modal-close", function (e) {
  // console.log(e.target, '<<<<<<rr')
  e.preventDefault();
  modal("#size_chart", false);
});

$(window).on("click", function (e) {
  // console.log(e.target, '<<<<<<rr')
  if (e.target.id == "size_chart") {
    modal("#size_chart", false);
  }
});

$(".tab__content").hide();
$(document).on("click", ".tab_link", function () {
  var $el = $(this),
    target = $el.data("target");
  $(".tab_link").removeClass("active");
  $(".tab__content").hide();
  $el.addClass("active");
  if (target) {
    $(target).show();
  }
});

// START:- load logo image
$(document).on("click", "body", function () {
  $(".popup--animation-wrap").hide();
});
$(window).on("load", function () {
  $(".popup--animation-wrap").show();
});
setTimeout(function () {
  $(".popup--animation-wrap").fadeOut();
}, 5000);
// END:- load logo image

function modal(target, flag = true) {
  if (flag) {
    $(target).show();
    $("body").addClass("modal--opened");
  } else {
    $(target).hide();
    $("body").removeClass("modal--opened");
  }
}

$(".anounce-slide").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  // fade: true,
  infinite: true,
});
