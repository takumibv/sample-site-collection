import $ from "jquery";

$(function () {
  const closeAllDrawer = () => $(".drawer--open").removeClass("drawer--open");

  $(document).on("click", ".js-drawer-toggle", (e) => {
    e.preventDefault();

    const $drawer = $(e.currentTarget).closest(".js-drawer-toggle");
    const $target = $("#" + $drawer.attr("data-target-id"));

    $target.hasClass("drawer--open")
      ? $target.removeClass("drawer--open")
      : $target.addClass("drawer--open");
  });

  $(window).on("resize", () => {
    closeAllDrawer();
  });

  $(window).on("keydown", (e) => {
    if (e.code === "Escape") closeAllDrawer();
  });
});
