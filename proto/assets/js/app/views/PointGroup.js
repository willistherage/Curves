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

        // Control point length
        controlPointLength: 1,

        // Distortion Point
        bulgeX: 0,
        bulgeY: 0,
        bulgeMultiplier: 0.5,

        // bulge Smoother
        spring: null,

    	//----------------------------------------
    	// PUBLIC METHODS
    	//----------------------------------------

    	init: function()
    	{
    		_.bindAll(this, 'init', 'update');

    		this.points = [];

            this.spring = new SpringSmooth(false);
            this.spring.power = 0.5;
    	},

    	update: function(delta) 
    	{
    		// Number of points in the group
    		var length = this.points.length;

    		// The base location of the group
    		var baseX = this.width * this.originX;
    		var baseY = this.height * this.originY;

            // Determine the distance from the bulge point.
            var bulgeDistanceX = Math.abs(this.bulgeX - baseX);
            var bulgeDistanceY = Math.abs(this.bulgeY - baseY);

            var bulgeLimit = Math.round(this.width / 2);

            var px = (bulgeLimit - Math.min(bulgeDistanceX, bulgeLimit)) / bulgeLimit;
            var py = (bulgeLimit - Math.min(bulgeDistanceY, bulgeLimit)) / bulgeLimit;
            var p = px * py;
            var p2 = -0.5 * (Math.cos(Math.PI * p) - 1);

            this.spring.target = p2;
            
            var bulgeAmount = this.spring.update(delta);


    		// The distance the group will spread
	        var spreadX = this.width * this.percentageX;
	        var spreadY = this.height * this.percentageY * (1 + bulgeAmount * this.bulgeMultiplier);

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
                point.oscillateX += point.incrementX * (1 - bulgeAmount * 0.75);
                point.oscillateY += point.incrementY * (1 - bulgeAmount * 0.75);
	            point.x = startX + spaceX * i + Math.cos(point.oscillateX * MathUtils.DEGREES_TO_RADIANS) * this.rangeX;
	            point.y = startY + spaceY * i + Math.cos(point.oscillateY * MathUtils.DEGREES_TO_RADIANS) * this.rangeY;
                point.cpLength = this.controlPointLength;
                point.cpX1 = point.x - point.cpLength * 0.5;
                point.cpY1 = point.y;
                point.cpX2 = point.x + point.cpLength * 0.5;
                point.cpY2 = point.y;
	        }
	        
    	}

	};

	p.init();

	return p;
}