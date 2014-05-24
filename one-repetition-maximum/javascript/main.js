"use strict";

$(document).ready(function() {
	$('#form').submit(function(e) {
		var weight = parseFloat($('#weight').val().replace(',', '.'))
		var reps = parseInt($('#reps').val(), 10);
		var closest2point5 = $('#closest2point5').is(':checked');

		var onerepmax = brzycki(weight, reps);

		var fields = [
			{'clazz': '.50percent', 'factor': 0.50},
			{'clazz': '.55percent', 'factor': 0.55},
			{'clazz': '.60percent', 'factor': 0.60},
			{'clazz': '.65percent', 'factor': 0.65},
			{'clazz': '.70percent', 'factor': 0.70},
			{'clazz': '.75percent', 'factor': 0.75},
			{'clazz': '.80percent', 'factor': 0.80},
			{'clazz': '.85percent', 'factor': 0.85},
			{'clazz': '.90percent', 'factor': 0.90},
			{'clazz': '.95percent', 'factor': 0.95},
			{'clazz': '.100percent', 'factor': 1.00}
		];

		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			update(field.clazz, field.factor, onerepmax, closest2point5);
		}

		document.activeElement.blur(); // hides iPhone keyboard.
		return false;
	});
});

function update(clazz, factor, onerepmax, closest2point5) {
	var value = onerepmax * factor;
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

/**
 * 1RM formulas below.
 * Source: http://en.wikipedia.org/wiki/One-repetition_maximum
 */
function brzycki(weight, reps) {
	return weight/((37/36)-(reps/36));
}

function epley(weight, reps) {
	return weight*(1+(reps/30));
}

function lander(weight, reps) {
	return 100*weight/(101.3-2.67123*reps);
}

function lombardi(weight, reps) {
	return weight*(Math.pow(reps, 0.10));
}

function mayhew(weight, reps) {
	return 100*weight/(52.2+(41.9*Math.pow(Math.E, -0.055*reps)));
}

function oconner(weight, reps) {
	return weight*(1+0.025*reps);
}

function wathan(weight, reps) {
	return 100*weight/(48.8+(53.8*Math.pow(Math.E, -0.075*reps)));
}
