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

$.get( "/api/posts", function( data ) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        
        var el = $( '<div></div>' );
        rawhtml = el.html(data[i].body);
        curimage = rawhtml.find('img:first')
        raw = curimage.attr('src')
        console.log(raw)
        $("#" +"img" + data[i].id).attr("src", raw);
    }
  });
