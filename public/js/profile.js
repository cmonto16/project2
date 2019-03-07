$(function() {
  M.Modal.init($(".modal"));
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
});
