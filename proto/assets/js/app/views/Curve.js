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
    dotSize: 10,

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
        this.dotSize = this.options.dotSize;
        
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

        var point;

        for(var i = 0; i < this.points.length; i++)
        {
            point = this.points[i];

            this.graphics.drawCircle(point.x, point.y, this.dotSize);
        }
        
    }
});