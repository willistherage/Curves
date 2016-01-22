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
    	
    	// The incremental value that determines the oscelation of the points.
    	oscelatorX: 0,
    	oscelatorY: 0,
    	
    	// The amount the oscelation increments.
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
    		var baseX = this.width * this.centerX;
    		var baseY = this.height * this.centerY;

    		// The distance the group will spread
	        var spreadX = this.width * this.percentageX;
	        var spreadY = this.height * this.percentageY;

	        // The space between each point
	        var spaceX = spreadX / (length - 1);
	        var spaceY = spreadY / (length - 1);

	        // Incrementing the oscelation value.
	        this.oscelatorX += this.incrementX;
	        this.oscelatorY += this.incrementY;
	        
	        // Getting a value from -1 to 1 based on the oscelation value.
	        var oscelationX = Math.cos(this.oscelatorX * MathUtils.DEGREES_TO_RADIANS);
	        var oscelationY = Math.cos(this.oscelatorY * MathUtils.DEGREES_TO_RADIANS);

	        var point;

	        for(var i = 0; i < length; i++)
	        {
	        	point = this.points[i];
	            point.x = 0;
	            point.y = 0;
	            //this.graphics.drawCircle(dotX, startY + dotYSpace * i + oscelation * this.range, this.dotSize);
	        }
	        
    	}

	};

	p.init();

	return p;
}