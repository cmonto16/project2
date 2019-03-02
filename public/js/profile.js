console.log("loaded profile.js");

$("#update-button").on("click", function(event) {
    console.log("clicked update");

    var body = {
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        username: $("#username").val(),
        password: $("#password").val(),
        email: $("#email").val()
      };

      $.ajax("/api/users/", {
        type: "PUT",
        data: JSON.stringify(body),
        contentType: "application/json"
      })
        .done(function() {
          location.href = "/profile";
        })
        .fail(function(jqXHR, textStatus) {
          alert("error: " + textStatus);
        });
    });


