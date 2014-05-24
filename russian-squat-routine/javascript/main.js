"use strict";

$(document).ready(function() {
	$('#createProgramForm').submit(function(e) {
		var current1RM = parseFloat($('#current1RM').val().replace(',', '.'))
		var closest2point5 = $('#closest2point5').is(':checked');

		var fields = [
			{'clazz': '.80percent', 'factor': 0.80},
			{'clazz': '.85percent', 'factor': 0.85},
			{'clazz': '.90percent', 'factor': 0.90},
			{'clazz': '.95percent', 'factor': 0.95},
			{'clazz': '.100percent', 'factor': 1.00},
			{'clazz': '.105percent', 'factor': 1.05},
		];

		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			update(field.clazz, field.factor, current1RM, closest2point5);
		}

		document.activeElement.blur(); // hides iPhone keyboard.
		return false;
	});
});

function update(clazz, factor, current1RM, closest2point5) {
	var value = current1RM * factor;
	if (closest2point5) {
		value = closest25(value);
	}
	$(clazz).text(roundDecimals(value));
}

function closest25(value) {
	var temp = value / 2.5;
	temp = Math.round(temp);
	return temp * 2.5;
}

function roundDecimals(value) {
	return +value.toFixed(2);
}