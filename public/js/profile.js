console.log("loaded profile.js");

M.Modal.init($(".modal"));

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
          M.Modal.getInstance($("#successModal")).open();
          
        })
        .fail(function(jqXHR, textStatus) {
          M.Modal.getInstance($("#failedModal")).open();
        });
    });


