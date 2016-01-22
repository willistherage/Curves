var PointGroup = function()
{
	var p = {

		//----------------------------------------
    	// VARIABLES
    	//----------------------------------------

    	// The distance range in which the points can travel.
    	rangeX: 0,
    	rangeY: 0,

    	// The spread percentage of the window.
    	percentageX: 0,
    	percentageY: 0,
    	
    	// The incremental value that determines the oscillation of the points.
    	oscillatorX: 0,
    	oscillatorY: 0,
    	
    	// The amount the oscillation increments.
    	incrementX: 1,
    	incrementY: 1,
    	
    	// The location percentage of the point group in the window.
    	originX: 0.5,
    	originY: 0.5,

    	// The center from where the points will push away from.
    	centerX: 0.5,
    	centerY: 0.5,

    	// List of points from curves.
    	points: [],

    	// Size of the window.
    	width: 800,
    	height: 600,

    	//----------------------------------------
    	// PUBLIC METHODS
    	//----------------------------------------

    	init: function()
    	{
    		_.bindAll(this, 'init', 'update');

    		this.points = [];
    	},

    	update: function() 
    	{
    		// Number of points in the group
    		var length = this.points.length;

    		// The base location of the group
    		var baseX = this.width * this.originX;
    		var baseY = this.height * this.originY;

    		// The distance the group will spread
	        var spreadX = this.width * this.percentageX;
	        var spreadY = this.height * this.percentageY;

	        // The space between each point
	        var spaceX = spreadX / (length - 1);
	        var spaceY = spreadY / (length - 1);

            // Get the starting point of the point distribution
            var startX = baseX - spreadX * this.centerX;
            var startY = baseY - spreadY * this.centerY;

	        var point;

	        for(var i = 0; i < length; i++)
	        {
	        	point = this.points[i];
                point.oscillateX += point.incrementX;
                point.oscillateY += point.incrementY;
	            point.x = startX + spaceX * i + Math.cos(point.oscillateX * MathUtils.DEGREES_TO_RADIANS) * this.rangeX;
	            point.y = startY + spaceY * i + Math.cos(point.oscillateY * MathUtils.DEGREES_TO_RADIANS) * this.rangeY;
	        }
	        
    	}

	};

	p.init();

	return p;
}