import $ from "jquery";

$(function () {
  // ページ内リンクリンク
  $('a[href^="#"]').on("click", (e) => {
    e.preventDefault();
    const href = $(e.currentTarget).attr("href");
    const $target = $(href);
    console.log("$target::", $target);

    if (!$target.length) return;

    const targetOffset = $target.offset().top;

    $("html, body").animate(
      {
        scrollTop: targetOffset - 90, // headerの高さを考慮
      },
      300,
      "swing"
    );
  });

  $(document).on("scroll", () => {
    const scrollTop = $(window).scrollTop();
    if (scrollTop === 0) {
      $(".fab-btn").addClass("fab-btn--hidden");
      $(".header").removeClass("header--bg");
    } else {
      $(".fab-btn").removeClass("fab-btn--hidden");
      $(".header").addClass("header--bg");
    }
  });

  // fabボタン
  $(document).on("click", ".fab-btn", () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      300,
      "swing"
    );
  });
});
