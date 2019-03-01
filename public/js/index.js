// create a new activity
$("#submit").on("click", function(event) {
  event.preventDefault();
  var newActivity = {
    title: $("#title")
      .val()
      .trim(),
    body: $("#body")
      .val()
      .trim(),
    UserId: 1
  };
  // add to server
  $.post("/api/new", newActivity).then(function(data) {
    console.log(data);
  });
});

// create new user
$("#create-account").on("click", function(event) {
  event.preventDefault();
  var newAccount = {
    firstname: $("#first-name")
      .val()
      .trim(),
    lastname: $("#last-name")
      .val()
      .trim(),
    username: $("#username")
      .val()
      .trim(),
    email: $("#email")
      .val()
      .trim(),
    password: $("#password")
      .val()
      .trim()
  };
  // add to server
  $.post("/api/create-account", newAccount).then(function(data) {
    console.log(data);
  });
});
