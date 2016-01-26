var PointGroup = function()
{
	var p = {

		//----------------------------------------
    	// VARIABLES
    	//----------------------------------------

    	// The distance range in which the points can spread.
        rangeX: 0,
        rangeY: 0,

        // The distance range in which the points can roam.
        roamX: 0,
        roamY: 0,
        roamDampener: 0.75,

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
        strength: 1000,
        strengthDampener: 1,

        // Wave distortion
        wavePosition: 0,
        waveWidth: 0,
        waveAmplitude: 0,

        // Neighbors
        neighbors: [],
        neighborInfluence: 0.25,

    	//----------------------------------------
    	// PUBLIC METHODS
    	//----------------------------------------

    	init: function()
    	{
    		_.bindAll(this, 'init', 'updatePointValues', 'update');

    		this.points = [];

            this.spring = new SpringSmooth(false);
            this.spring.power = 0.5;
    	},

        updatePointValues: function()
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
                point.x = point.ox = startX + spaceX * i + point.seedX * (this.rangeX * this.width);
                point.y = point.oy = startY + spaceY * i + point.seedY * (this.rangeY * this.height);

                point.cpLength = this.controlPointLength;
                point.cpX1 = point.x - point.cpLength * 0.5;
                point.cpY1 = point.y;
                point.cpX2 = point.x + point.cpLength * 0.5;
                point.cpY2 = point.y;
            }

            this.strength = Math.sqrt(this.width * this.width + this.height* this.height) * this.strengthDampener;
        },

    	update: function(delta) 
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

            var dx, dy, angle, dist, oscX, oscY;

	        for(var i = 0; i < length; i++)
	        {
	        	point = this.points[i];
                
                // Calculate oscillation

                point.oscillateX += point.incrementX;
                point.oscillateY += point.incrementY;

                oscX = Math.cos(point.oscillateX * MathUtils.DEGREES_TO_RADIANS);
                oscY = Math.cos(point.oscillateY * MathUtils.DEGREES_TO_RADIANS);
                
                // Calculate wave effect

                var ww = this.waveWidth * 0.5;
                var dir = Math.abs(point.x - this.wavePosition) / (point.x - this.wavePosition);
                var adist = 1 - (ww - Math.min(Math.abs(point.x - this.wavePosition), ww)) / ww;
                var wp = 180 * adist;
                var wc = (1 + Math.cos(wp * MathUtils.DEGREES_TO_RADIANS)) * 0.5;

                oscY -= wc * (this.waveAmplitude * this.height);
                oscX *= this.roamX * this.width * this.roamDampener;
                oscY *= this.roamY * this.height * this.roamDampener;
                
                // Calculate repulsion

                dx = point.x - this.bulgeX;
                dy = point.y - this.bulgeY;
                angle = Math.atan2(dy, dx);
                dist = this.strength / Math.sqrt(dx * dx + dy * dy);
                point.x += Math.cos(angle) * dist;
                point.y += Math.sin(angle) * dist;
                point.x += (point.ox + oscX - point.x) * 0.1;
                point.y += (point.oy + oscY - point.y) * 0.1;
                
                // Lock points to edges

                var n1, n2, na, nx, ny, nd, a, A, b, B, c, C, s;

                if(this.originX == 0)
                {
                    point.x = Math.min(0, point.x);
                }
                 else if(this.originX == 1)
                {
                    point.x = Math.max(this.width, point.x);
                }
                 else
                {
                    
                }

                // Calculate neighbor angles

                if(this.neighbors.length == 2)
                {
                    n1 = this.neighbors[0].points[i];
                    n2 = this.neighbors[1].points[i];
                    nx = n1.x - n2.x;
                    ny = (n1.y - n2.y) * this.neighborInfluence;
                    na = Math.atan2(ny, nx);

                    b = this.controlPointLength * 0.5;
                    B = 90;
                    s = b / Math.sin(MathUtils.DEGREES_TO_RADIANS * B);

                    A = 180 - (na * MathUtils.RADIANS_TO_DEGREES);
                    a = s * Math.sin(MathUtils.DEGREES_TO_RADIANS * A);

                    C = 90 - A;
                    c = s * Math.sin(MathUtils.DEGREES_TO_RADIANS * C);

                    var x1a = point.x - c;
                    var y1a = point.y + a;
                    var x2a = point.x + c;
                    var y2a = point.y - a;

                    point.cpX1 = x1a;
                    point.cpY1 = y1a;
                    point.cpX2 = x2a;
                    point.cpY2 = y2a;
                }
                 else
                {
                    point.cpX1 = point.x - point.cpLength * 0.5;
                    point.cpY1 = point.y;
                    point.cpX2 = point.x + point.cpLength * 0.5;
                    point.cpY2 = point.y;
                }
	        }
	        
    	}

	};

	p.init();

	return p;
}