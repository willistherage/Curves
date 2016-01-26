var Curve = BaseView.extend({
	
	//----------------------------------------
    // VARIABLES
    //----------------------------------------

    color: 0xFFFFFF,
    graphics: null,
    pointCount: 4,
    points: [],
    width: 1,
    height: 1,
    
    controlCenter: 3,
    controlStroke: 2,
    controlHandle: 2,
    controlColor: 0xFFFFFF,

    incrementSpeed: 0.5,
    incrementSpeedRandomness: 0.75,


    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function()
    {
		
        this.bind();

		_.bindAll(this, 'init', 'renderCurve', 'renderControls');

        this.pointCount = this.options.pointCount;
        this.color = this.options.color;
        this.graphics = this.options.graphics;
        this.winWidth = this.options.width;
        this.winHeight = this.options.height;
        
        var point;

        for(var i = 0; i < this.pointCount; i++)
        {
            point = new Point();
            point.incrementX = this.incrementSpeed + (Math.random() * 2 - 1) * (this.incrementSpeed * this.incrementSpeedRandomness);
            point.incrementY = this.incrementSpeed + (Math.random() * 2 - 1) * (this.incrementSpeed * this.incrementSpeedRandomness);
            point.oscillateX = Math.round(Math.random() * 360);
            point.oscillateY = Math.round(Math.random() * 360);
            this.points.push(point);
        }
	},

    renderCurve: function()
    {
        this.graphics.beginFill(this.color.color, 1);

        this.graphics.moveTo(0, this.height);

        var p1, p2;

        for(var i = 0; i < this.points.length; i++)
        {
            
            if(i == 0)
            {
                p1 = this.points[i];

                this.graphics.lineTo(p1.x, p1.y);
            }
             else
            {
                p2 = this.points[i];
                p1 = this.points[i-1];

                this.graphics.bezierCurveTo(p1.cpX2, p1.cpY2, p2.cpX1, p2.cpY1, p2.x, p2.y);
            }
            
        }

        this.graphics.lineTo(this.width, this.height);
        this.graphics.lineTo(0, this.height);
        this.graphics.endFill();
    },

    renderControls: function()
    {
        var p;

        for(var c = 0; c < this.points.length; c++)
        {
            p = this.points[c];

            this.graphics.endFill();
            this.graphics.lineStyle(this.controlStroke, this.controlColor, 0.25);
            this.graphics.moveTo(p.cpX1, p.cpY1);
            this.graphics.lineTo(p.x, p.y);
            this.graphics.lineTo(p.cpX2, p.cpY2);

            //Draw control center and handles
            this.graphics.lineStyle(0, 0, 0);
            this.graphics.beginFill(this.controlColor, 1);
            this.graphics.drawCircle(p.cpX1, p.cpY1, this.controlHandle);
            this.graphics.drawCircle(p.cpX2, p.cpY2, this.controlHandle);

            if(p.tracer)
            {  
                this.graphics.beginFill(this.controlColor, Math.abs((p.oscillateX % 18) - 9) / 9);
            }

            this.graphics.drawCircle(p.x, p.y, this.controlCenter);
        }

        this.graphics.endFill();
    }

});