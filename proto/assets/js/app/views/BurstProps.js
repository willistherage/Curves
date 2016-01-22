var BurstProps = function(options) {
	
	var b = {
		type: BurstType.LINE,
		x1: 0,
		x2: 0,
		y1: 0,
		y2: 0,
		thickness: 1,
		opacity: 1,
		color: 0xFFFFFF,
		percentage: 0
	};

	var c = $.extend(true, b, options);

	return c;
}