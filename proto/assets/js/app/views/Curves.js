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
    mouseX: 0,
    mouseY: 0,

    //
    progress: 0,
    duration: 1,
    colors: [0xb39bc8, 0xad2e95, 0xf172a1, 0x1f3463, 0xe64398, 0xb39bc8, 0xad2e95, 0xe64398, 0x1f3463],

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();

		_.bindAll(this, 'init', 'addListeners', 'removeListeners', 'onMouseMove', 'onUpdate');

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
                color: this.colors[i+1],
                graphics: this.graphics
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
            group.originX = p / (this.pointCount-1);
            group.controlPointLength = this.winWidth / (this.pointCount-1);
            group.init();

            for(var c = 0; c < this.curveCount; c++)
            {
                group.points.push(this.curves[c].points[p]);
            }

            this.groups.push(group);
        }

        // Group 1
        group = this.groups[0];
        group.rangeY = 4;
        group.percentageY = 0.2;
        group.originY = 1.2;
        group.centerY = 1;
        
        // Group 2
        group = this.groups[1];
        group.rangeY = 15;
        group.percentageY = 0.65;
        group.originY = 1;
        group.centerY = 0.75;

         // Group 3
        group = this.groups[2];
        group.rangeY = 5;
        group.percentageY = 0.45;
        group.originY = 0.65;
        group.centerY = 0.5;

         // Group 4
        group = this.groups[3];
        group.rangeY = 30;
        group.percentageY = 0.8;
        group.originY = 0.5;
        group.centerY = 0.5;

         // Group 5
        group = this.groups[4];
        group.rangeY = 15;
        group.percentageY = 0.6;
        group.originY = 0.5;
        group.centerY = 0.5;

         // Group 6
        group = this.groups[5];
        group.rangeY = 20;
        group.percentageY = 0.5;
        group.originY = 0.6;
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

            this.groups[p].controlPointLength = this.winWidth / (this.pointCount-1);
        }
    },

    //----------------------------------------
    // PRIVATE METHODS
    //----------------------------------------

    addListeners: function()
    {
        AnimationFrame.addListener(this.onUpdate);

        window.addEventListener('mousemove', this.onMouseMove);
    },

    removeListeners: function()
    {
        AnimationFrame.removeListener(this.onUpdate);

        window.removeEventListener('mousemove', this.onMouseMove);
    },

    //----------------------------------------
    // EVENT HANDLERS
    //----------------------------------------

    onMouseMove: function(event)
    {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    },

    onUpdate: function(delta, time)
    {
        if(!this.graphics || !this.groups || !this.curves)
            return;

        this.graphics.clear();

        this.graphics.beginFill(this.colors[0], 1);
        this.graphics.drawRect(0, 0, this.winWidth, this.winHeight);
        this.graphics.endFill();

        var group, curve;

        for(var p = 0; p < this.groups.length; p++)
        {
            group = this.groups[p];
            group.bulgeX = this.mouseX;
            group.bulgeY = this.mouseY;
            group.update(delta);
        }

        for(var i = 0; i < this.curves.length; i++)
        {
            curve = this.curves[i];
            curve.render();
            
        }
        
    }
});