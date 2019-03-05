$("#btn").on("click", function(event) {
  $("#modal1").modal();
})
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
      location.href = "/posts";
    })
    .fail(function(jqXHR, textStatus) {
      alert("error: " + textStatus);
    });
});

$("#new-button").on("click", function(event) {
  console.log("clicked submit");

  var body = {
    firstname: $("#new_firstname").val(),
    lastname: $("#new_lastname").val(),
    username: $("#new_username").val(),
    password: $("#new_password").val(),
    email: $("#new_email").val()
  };

  $.ajax("/api/users", {
    type: "POST",
    data: JSON.stringify(body),
    contentType: "application/json"
  })
    .done(function() {
      location.href = "/posts";
    })
    .fail(function(jqXHR, textStatus) {
      alert("error: " + textStatus);
    });
});
