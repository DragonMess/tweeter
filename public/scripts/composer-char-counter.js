$(document).ready(function() {
  $("#tweet").keyup(function() {
    let char = $(this).val();

    let numberChar = 140 - char.length;

    if (numberChar < 0) {
      $(".counter").addClass("red");
    }

    $(".counter").text(numberChar);
  });

  // ===== selector to use with .hover class ===
  $("#articleTweet").hover(
    function() {
      $(this).addClass("hover");
    },
    function() {
      $(this).removeClass("hover");
    }
  );
});

