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
    
    showControls: true,
    controlSize: 3,
    controlColor: 0xFFFFFF,


    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function()
    {
		
        this.bind();

		_.bindAll(this, 'init', 'render');

        this.pointCount = this.options.pointCount;
        this.color = this.options.color;
        this.graphics = this.options.graphics;
        this.winWidth = this.options.width;
        this.winHeight = this.options.height;
        
        var point;

        for(var i = 0; i < this.pointCount; i++)
        {
            point = new Point();
            point.incrementY = 0.5 + Math.random() * 1;
            point.oscillateY = Math.round(Math.random() * 360);
            this.points.push(point);
        }
	},

    render: function()
    {
        this.graphics.beginFill(this.color, 1);

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

        if(this.showControls)
        {
            var p;

            this.graphics.beginFill(0xFFFFFF, 1);

            for(var c = 0; c < this.points.length; c++)
            {
                p = this.points[c];
                this.graphics.drawCircle(p.x, p.y, this.controlSize);
            }

            this.graphics.endFill();
        }

        
    }
});