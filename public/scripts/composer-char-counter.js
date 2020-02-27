$(document).ready(function() {
  const $textarea = $("textarea");
  const $counter = $(".counter");

  $textarea.on("keyup", () => {
    let count = $textarea.val().length;
    $counter.text(140 - count);

    if (count > 140) {
      $counter.addClass("red");
    } else if (count < 141) {
      $counter.removeClass("red");
    }
  });

  const $article = $("article");

$article.hover(
    function() {
      $(this).addClass("hover");
    },
    function() {
      $(this).removeClass("hover");
    }
  );

});
