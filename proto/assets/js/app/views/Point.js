var Point = function(options) {
	
	var b = {
		x: 0, // Current X position
		y: 0, // Current Y position
		ox: 0, // Origin X position
		oy: 0, // Origin Y position
		seedX: Math.random() * 2 - 1,
		seedY: Math.random() * 2 - 1,
		oscillateX: 0, // Current oscillation value on the X axis
		oscillateY: 0, // Current oscillation value on the Y axis
		incrementX: 1, // Amount the osiclation increments every frame on the X axis
		incrementY: 1, // Amount the osiclation increments every frame on the Y axis
		cpX1: 0, // Control point 1 X
		cpY1: 0, // Control point 1 Y
		cpX2: 0, // Control point 2 X
		cpY2: 0, // Control point 2 Y
		cpLength: 1, // Control point length
		tracer: false // Flag one particle for tracing values
	};

	var c = $.extend(true, b, options);

	return c;
}