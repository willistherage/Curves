var Point = function(options) {
	
	var b = {
		x: 0,
		y: 0,
		oscillateX: 0,
		oscillateY: 0,
		incrementX: 1,
		incrementY: 1
	};

	var c = $.extend(true, b, options);

	return c;
}