var Point = function(options) {
	
	var b = {
		x: 0,
		y: 0
	};

	var c = $.extend(true, b, options);

	return c;
}