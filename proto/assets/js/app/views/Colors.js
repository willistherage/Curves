var Colors = function()
{
	var c = {

		//----------------------------------------
    	// VARIABLES
    	//----------------------------------------

        colors: [],
        colorList: [],
    	colorIndex: 0,

        // Color Shift Smoother
        spring: null,

    	//----------------------------------------
    	// PUBLIC METHODS
    	//----------------------------------------

    	init: function()
    	{
    		_.bindAll(this, 'init', 'shift', 'update');

    		this.colorList = [
                [0xa1c3d1, 0xf172a1, 0xad2e95, 0xb39bc8, 0xe64398, 0xa1c3d1, 0xad2e95, 0xb39bc8, 0xe64398],
                [0xb39bc8, 0xad2e95, 0xf172a1, 0x1f3463, 0xe64398, 0xb39bc8, 0xad2e95, 0xe64398, 0x1f3463],
                [0xf274a0, 0x4f3850, 0xb39bc8, 0xe64398, 0xad2e95, 0x4f3850, 0xed3da4, 0xf274a0, 0xad2e95],
                [0xe64398, 0x8a1a33, 0xe71f37, 0xf274a0, 0xad2e95, 0x8a1a33, 0xe71f37, 0xe64398, 0xad2e95],
                [0xe71f37, 0xf274a0, 0xe64398, 0xad2e95, 0x1f3463, 0xe64398, 0xe71f37, 0x1f3463, 0xad2e95]
            ];

            
    	},

        shift: function(index)
        {
            this.colorIndex = index;
            this.targetColors = this.colors[this.colorIndex];

        },

    	update: function(delta) 
    	{
	        
    	}

	};

	c.init();

	return c;
}