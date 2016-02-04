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
        strengthDampener: 0,

        // Wave distortion
        wavePosition: 0,
        waveWidth: 0,
        waveAmplitude: 0,

        // Neighbors
        neighbors: [],
        neighborInfluence: 0.25,
        uniformHandles: false,

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
                
                // Update Original Position

                point.ox = startX + spaceX * i + point.seedX * (this.rangeX * this.width);
                point.oy = startY + spaceY * i + point.seedY * (this.rangeY * this.height);

                if(point.brandnew)
                {
                    point.x = point.ox;
                    point.y = point.oy;
                    point.brandnew = false;
                }

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

                //oscY -= wc * (this.waveAmplitude * this.height);
                oscX *= this.roamX * this.width * (1 - this.roamDampener);
                oscY *= this.roamY * this.height * (1 - this.roamDampener);
                oscY -= wc * (this.waveAmplitude * this.height);
                
                // Calculate repulsion

                dx = point.x - this.bulgeX;
                dy = point.y - this.bulgeY;
                angle = Math.atan2(dy, dx);
                dist = this.strength / Math.sqrt(dx * dx + dy * dy);
                point.x += Math.cos(angle) * dist * (1 - this.strengthDampener);
                point.y += Math.sin(angle) * dist * (1 - this.strengthDampener);
                point.x += (point.ox + oscX - point.x) * 0.1;
                point.y += (point.oy + oscY - point.y) * 0.1;

                // Lock points to edges

                var n1, n2, na, nx, ny, nd;
                var a1, A1, b1, B1, c1, C1, s1;
                var a2, A2, b2, B2, c2, C2, s2;
                var cdx1, cdy1, cdx2, cdy2;

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
                    ny = n1.y - n2.y;
                    na = Math.atan2(ny * this.neighborInfluence, nx);

                    if(this.uniformHandles)
                    {
                        b1 = this.controlPointLength * 0.5;
                        B1 = 90;
                        s1 = b1 / Math.sin(MathUtils.DEGREES_TO_RADIANS * B1);

                        A1 = 180 - (na * MathUtils.RADIANS_TO_DEGREES);
                        a1 = s1 * Math.sin(MathUtils.DEGREES_TO_RADIANS * A1);

                        C1 = 90 - A1;
                        c1 = s1 * Math.sin(MathUtils.DEGREES_TO_RADIANS * C1);

                        point.cpX1 = point.x - c1;
                        point.cpY1 = point.y + a1;
                        point.cpX2 = point.x + c1;
                        point.cpY2 = point.y - a1;
                    }
                     else
                    {
                        n1 = this.neighbors[0].points[i];
                        n2 = point;

                        cdx1 = n1.x - n2.x;
                        cdy1 = n1.y - n2.y;

                        n1 = point;
                        n2 = this.neighbors[1].points[i];

                        cdx2 = n1.x - n2.x;
                        cdy2 = n1.y - n2.y;

                        b1 = Math.max(Math.sqrt(cdx1 * cdx1 + cdy1 * cdy1) * 0.4, 1);
                        B1 = 90;
                        s1 = b1 / Math.sin(MathUtils.DEGREES_TO_RADIANS * B1);

                        A1 = 180 - (na * MathUtils.RADIANS_TO_DEGREES);
                        a1 = s1 * Math.sin(MathUtils.DEGREES_TO_RADIANS * A1);

                        C1 = 90 - A1;
                        c1 = s1 * Math.sin(MathUtils.DEGREES_TO_RADIANS * C1);

                        b2 = Math.max(Math.sqrt(cdx2 * cdx2 + cdy2 * cdy2) * 0.4, 1);
                        B2 = 90;
                        s2 = b2 / Math.sin(MathUtils.DEGREES_TO_RADIANS * B2);

                        A2 = 180 - (na * MathUtils.RADIANS_TO_DEGREES);
                        a2 = s2 * Math.sin(MathUtils.DEGREES_TO_RADIANS * A2);

                        C2 = 90 - A2;
                        c2 = s2 * Math.sin(MathUtils.DEGREES_TO_RADIANS * C2);

                        point.cpX1 = point.x - c1;
                        point.cpY1 = point.y + a1;
                        point.cpX2 = point.x + c2;
                        point.cpY2 = point.y - a2;
                    }
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