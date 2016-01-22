var MathUtils = {

	DEGREES_TO_RADIANS: Math.PI / 180,

	/**
	 *	Clamps values.
	 */
	clamp: function(min, max, value)
	{
		return Math.max(Math.min(value, max), min);
	},

	/**
	 *	Tests to see if the value is in bounds.
	 */
	inbounds: function(min, max, value)
	{
		return !(value > max || value < min);
	},
	
	/**
	 *	Loops values
	 */
	loop: function(min, max, value)
	{
		var dif = max-min;
		var val;
		
		if(value < min)
		{
			val = (min - value) % dif;
			return max - val;
		}
		 else if(value > max)
		{
			val = (value - max) % dif;
			return min + val;
		}
		
		return value;
	},

	/**
	 *	Loops indicies
	 */
	loopIndex: function(min, max, value)
	{
		var dif = max - min;
		var val;
		
		if(value < min)
		{
			val = ((min - 1) - value) % dif;
			return max - val;
		}
		 else if(value > max)
		{
			val = (value - (max + 1)) % dif;
			return min + val;
		}
		
		return value;
	},

	/**
	 *	Calculates the distance between two sets of coordinates
	 */
	distance: function(x1, y1, x2, y2)
	{
		return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
	},

	/**
	 *	Calculates the distance between two sets of coordinates
	 */
	hypotenuse: function(a, b)
	{
		return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	}

};

