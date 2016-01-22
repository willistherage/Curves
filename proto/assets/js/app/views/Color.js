var Color = function(color)
{
	var c = {

		//----------------------------------------
    	// VARIABLES
    	//----------------------------------------

        color: 0,
    	r: 0,
        g: 0,
        b: 0,

        // Color Shift Smoother
        sR: null,
        sG: null,
        sB: null,
        
    	//----------------------------------------
    	// PUBLIC METHODS
    	//----------------------------------------

    	init: function(color)
    	{
    		_.bindAll(this, 'init', 'shift', 'update');

            this.color = color;
            this.r = color >> 16;
            this.g = (color - (this.r << 16)) >> 8;
            this.b = color - (this.r << 16) - (this.g << 8);

            this.sR = new Spring();
            this.sR.target = this.sR.position = this.r;
            this.sR.power = 0.25;

            this.sG = new Spring();
            this.sG.target = this.sG.position = this.g;
            this.sG.power = 0.25;

            this.sB = new Spring();
            this.sB.target = this.sB.position = this.b;
            this.sB.power = 0.25;
    	},

        shift: function(color)
        {
            var r = color >> 16;
            var g = (color - (r << 16)) >> 8;
            var b = color - (r << 16) - (g << 8);

            this.sR.target = r;
            this.sG.target = g;
            this.sB.target = b;
        },

    	update: function(delta) 
    	{
            this.r = this.sR.update(delta);
            this.g = this.sG.update(delta);
	        this.b = this.sB.update(delta);
            this.color = (this.r << 16) + (this.g << 8) + this.b;
    	}

	};

	c.init(color);

	return c;
}