console.log("posts.js loaded");

$(function() {
  M.Dropdown.init($(".dropdown-trigger").get()[0], {
    coverTrigger: false,
    constrainWidth: false,
    closeOnClick: false
  });

  $("#login-button").on("click", function(event) {
    console.log("clicked submit");

    var body = {
      username: $("#username").val(),
      password: $("#password").val()
    };

    $.ajax("/api/sessions", {
      type: "POST",
      data: JSON.stringify(body),
      contentType: "application/json"
    })
      .done(function() {
        location.href = "/";
      })
      .fail(function(jqXHR, textStatus) {
        alert("error: " + textStatus);
      });
  });
});

$(".edit")