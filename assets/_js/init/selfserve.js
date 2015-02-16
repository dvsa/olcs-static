OLCS.ready(function() {
  "use strict";

  // Quick and dirty way of setting the logged in users
  // details in localStorage

	var user = {
    name: localStorage.name,
    company: localStorage.company
	};

  if (user.name && user.company) {
    $(".user-menu__item:first").html(""+user.name+", <b>"+user.company+"</b>");

    if ($(".page-header__subtitle").text() === "Operator Licensing Ltd.") {
      $(".page-header__subtitle").text(user.company);
    }

  }

});
