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

  $(".p-price-card-list").on("scroll", (e) => {
    $(".p-price-card-scroll").hide();
  });

  // タブ
  $(document).on("click", ".c-tab", (e) => {
    e.preventDefault();

    const $target = $(e.currentTarget).closest(".c-tab");
    const $content = $("#" + $target.attr("data-target-id"));

    console.log($target.attr("data-target-id"), $target, $content);

    if (!$content.length) return;

    $(".c-tab").removeClass("c-tab--active");
    $(".c-tab-content").removeClass("c-tab-content--active");

    $target.addClass("c-tab--active");
    $content.addClass("c-tab-content--active");
  });

  // 動きのきっかけとなるアニメーションの名前を定義
  function fadeAnime() {
    // ふわっ
    $(".js-fade-up-trigger").each(function () {
      var elemPos = $(this).offset().top - 50;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight) {
        $(this).addClass("u-fade-up");
      } else {
        $(this).removeClass("u-fade-up");
      }
    });
  }

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    fadeAnime(); /* アニメーション用の関数を呼ぶ*/
  }); // ここまで画面をスクロールをしたら動かしたい場合の記述

  // 画面が読み込まれたらすぐに動かしたい場合の記述
  $(window).on("load", function () {
    fadeAnime(); /* アニメーション用の関数を呼ぶ*/
  }); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述
});
