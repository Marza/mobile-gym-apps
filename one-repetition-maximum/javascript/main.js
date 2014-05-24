"use strict";

$(document).ready(function() {
	$('#form').submit(function(e) {


		document.activeElement.blur(); // hides iPhone keyboard.
		return false;
	});
});
