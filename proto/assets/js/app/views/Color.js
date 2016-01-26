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

        power: 0.4,
        
    	//----------------------------------------
    	// PUBLIC METHODS
    	//----------------------------------------

    	init: function(color)
    	{
    		_.bindAll(this, 'init', 'shift', 'update', 'setPower');

            this.color = color;
            this.r = color >> 16;
            this.g = (color - (this.r << 16)) >> 8;
            this.b = color - (this.r << 16) - (this.g << 8);

            this.sR = new SpringSmooth();
            this.sR.target = this.sR.position = this.r;
            this.sR.power = this.power;

            this.sG = new SpringSmooth();
            this.sG.target = this.sG.position = this.g;
            this.sG.power = this.power;

            this.sB = new SpringSmooth();
            this.sB.target = this.sB.position = this.b;
            this.sB.power = this.power;
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

        setPower: function(value)
        {
            this.power = value;
            this.sR.power = value;
            this.sG.power = value;
            this.sB.power = value;
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