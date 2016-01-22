var BurstLine = BaseView.extend({
    
    //----------------------------------------
    // VARIABLES
    //----------------------------------------

    // If the line is a guide it will be rendered below everything else and can be easily be flagged to be hidden.
    guide: false,

    // Progress of the animation.
    progress: 0,

    // The keyframes of the line animations.
    keyframes: [],

    // The properties of each keyframe.
    properties: [],

    // The current state of the stroke start value. 0 - 100
    start: 0,

    // The current state of the stroke end value. 100 - 0
    end: 0,

    // The current state of hte stroke offset that shifts the start and end values along the stroke. -100 - 100
    offset: 0,

    // The x and y values of the stroke. Soon to be deprecated.
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,

    // The thickness of the stoke.
    thickness: 1,

    // The color of the stroke.
    color: 0xFFFFFF,

    // The opacity of the stroke.
    opacity: 0.5,

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();

		_.bindAll(this, 'init', 'update', 'drawTo');

        this.properties = this.options.props;
        this.guide = this.options.guide;
	},

    update: function(progress)
    {
        this.progress = progress;

        // Property list is empty
        if(this.properties.length == 0)
            return;

        var prop;

        // There is only one property set or the line is a guide
        if(this.guide || this.properties.length == 1)
        {
            prop = this.properties[0];
            this.x1 = prop.x1;
            this.y1 = prop.y1;
            this.x2 = prop.x2;
            this.y2 = prop.y2;

            this.thickness = prop.thickness;
            this.color = prop.color;
        }

        // Determine the line segment based on the progress between the property sets

    },

    drawTo: function(graphics)
    {
        graphics.lineStyle(this.thickness, this.color, this.opacity);
        graphics.moveTo(this.x1, this.y1);
        graphics.lineTo(this.x2, this.y2);

    }

});