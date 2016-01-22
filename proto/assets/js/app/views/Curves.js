var Curves = BaseView.extend({
	
	//----------------------------------------
    // VARIABLES
    //----------------------------------------

    stage: null,
    graphics: null,
    curveCount: 8,
    pointCount: 6,
    curves:[],
    groups: [],
    dotSize: 6,

    //
    progress: 0,
    duration: 1,
    colors: [0xFF00CC, 0xFF00AA, 0xFF0099, 0xFF0077, 0xFF0055, 0xFF0033, 0xFF0011, 0xFF3333],

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();

		_.bindAll(this, 'init', 'addListeners', 'removeListeners', 'onUpdate');

        this.addListeners();

        this.stage = this.options.stage;
        this.curveCount = this.options.curveCount;
        this.winWidth = this.options.width;
        this.winHeight = this.options.height;

        this.graphics = new PIXI.Graphics();

        this.stage.addChild(this.graphics);
        
        this.curves = [];
        
        var curve;
        
        for(var i = 0; i < this.curveCount; i++)
        {
            curve = new Curve({
                pointCount: this.pointCount,
                color: this.colors[i],
                graphics: this.graphics,
                dotSize: this.dotSize
            });

            curve.init();
            this.curves.push(curve);
        }

        this.groups = [];

        var group;

        var incr = this.winWidth / (this.pointCount - 1);

        for(var p = 0; p < this.pointCount; p++)
        {
            group = new PointGroup();
            group.width = this.winWidth;
            group.height = this.winHeight;
            group.
            group.init();

            for(var c = 0; c < this.curveCount; c++)
            {
                group.points.push(this.curves[c].points[p]);
            }

            this.groups.push(group);
        }

        // Group 1
        group = this.groups[0];
        group.rangeY = 20;
        group.percentageY = 0.4;
        group.originY = 0.5;
        group.centerY = 0.5;
        
        // Group 2
        group = this.groups[1];
        group.rangeY = 20;
        group.percentageY = 0.4;
        group.originY = 0.5;
        group.centerY = 0.5;

         // Group 3
        group = this.groups[2];
        group.rangeY = 20;
        group.percentageY = 0.4;
        group.originY = 0.5;
        group.centerY = 0.5;

         // Group 4
        group = this.groups[3];
        group.rangeY = 20;
        group.percentageY = 0.4;
        group.originY = 0.5;
        group.centerY = 0.5;

         // Group 5
        group = this.groups[4];
        group.rangeY = 20;
        group.percentageY = 0.4;
        group.originY = 0.5;
        group.centerY = 0.5;

         // Group 6
        group = this.groups[5];
        group.rangeY = 20;
        group.percentageY = 0.4;
        group.originY = 0.5;
        group.centerY = 0.5;

	},

    resize: function(width, height) {
        
        this.winWidth = width;
        this.winHeight = height;

        if(!this.curves)
            return;

        for(var i = 0; i < this.curves.length; i++)
        {
            this.curves[i].width = width;
            this.curves[i].height = height;
        }

        if(!this.groups)
            return;

        for(var p = 0; p < this.groups.length; p++)
        {
            this.groups[p].width = width;
            this.groups[p].height = height;
        }
    }

    //----------------------------------------
    // PRIVATE METHODS
    //----------------------------------------

    addListeners: function()
    {
        AnimationFrame.addListener(this.onUpdate);
    },

    removeListeners: function()
    {
        AnimationFrame.removeListener(this.onUpdate);
    },

    //----------------------------------------
    // EVENT HANDLERS
    //----------------------------------------

    onUpdate: function() {

        if(!this.graphics)
            return;

        this.graphics.clear();

        for(var p = 0; p < this.pointGroups.length; p++)
        {
            this.pointGroups[p].update();
        }

        for(var i = 0; i < this.curves.length; i++)
        {
            this.curves[i].render();
            
        }
        
    }
});