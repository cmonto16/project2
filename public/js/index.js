$(document).ready(function() {
  $(".sidenav").sidenav();
});
if ($("#user-id").attr("value") === undefined) {
  $(".edit-link").hide();
} else {
  $(".edit-link").hide();
  for (i = 1; i < 1000; i++) {
    if ($("#edit" + i).attr("value") === $("#user-id").attr("value")) {
      $("#edit" + i).show();
    }
  }
}
