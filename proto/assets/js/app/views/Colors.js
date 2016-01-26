var Colors = function()
{
	var c = {

		//----------------------------------------
    	// VARIABLES
    	//----------------------------------------

        list: [],
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

            var defaultColors = this.colorList[0];
            
            this.list = [];

            var color;

            for(var i = 0; i < defaultColors.length; i++)
            {
                color = new Color(defaultColors[i]);
                color.setPower(0.1 + 0.075 * i);
                this.list.push(color);
            }
    	},

        shift: function(index)
        {
            this.colorIndex = index;
            
            for(var i = 0; i < this.list.length; i++)
            {
                this.list[i].shift(this.colorList[this.colorIndex][i]);
            }

        },

    	update: function(delta) 
    	{
	        for(var i = 0; i < this.list.length; i++)
            {
                this.list[i].update(delta);
            }
    	}

	};

	c.init();

	return c;
}