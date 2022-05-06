import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
import $ from "jquery";

$(function () {
  var swiper = new Swiper(".js-swiper", {
    modules: [Navigation, Pagination],
    spaceBetween: 100,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
  });

  $(document).on("click", ".js-accordion", (e) => {
    const $target = $(e.currentTarget).closest(".js-accordion");
    const $content = $target.find(".js-accordion__content");

    if ($target.hasClass("p-qr-accordion--open")) {
      $target.removeClass("p-qr-accordion--open");
      $content.css("height", "0");
    } else {
      $content.css("height", $content.prop("scrollHeight") + "px");
      $target.addClass("p-qr-accordion--open");
    }
  });

  $(document).on("scroll", () => {
    const scrollTop = $(window).scrollTop();
    if (scrollTop === 0) {
      $(".p-fab-btn").addClass("p-fab-btn--hidden");
      $(".l-header").removeClass("l-header--active");
    } else {
      $(".p-fab-btn").removeClass("p-fab-btn--hidden");
      $(".l-header").addClass("l-header--active");
    }
  });

  // fabボタン
  $(document).on("click", ".p-fab-btn", () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      300,
      "swing"
    );
  });
});
