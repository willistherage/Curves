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
    showCurveControls: false,
    showWaveControls: false,
    colors: null,
    fullscreen: true,

    // Wave
    waveProgress: 0.5,
    waveTime: 0,
    waveDuration: 10,
    waveAmplitude: 0.1,
    waveLength: 0.9,

    // Force
    strength: 0,
    strengthDampener: 0,

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();

		_.bindAll(this, 'init', 'addListeners', 'removeListeners', 'onMouseMove', 'update', 'setColor', 'incrementColor');

        this.addListeners();

        this.stage = this.options.stage;
        this.curveCount = this.options.curveCount;
        this.winWidth = this.options.width;
        this.winHeight = this.options.height;

        this.graphics = new PIXI.Graphics();

        this.stage.addChild(this.graphics);
        
        this.colors = new Colors();

        this.curves = [];
        
        var curve;
        
        for(var i = 0; i < this.curveCount; i++)
        {
            curve = new Curve({
                pointCount: this.pointCount,
                color: this.colors.list[i+1],
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

        this.groups[0].neighbors = [this.groups[0], this.groups[1]];
        this.groups[1].neighbors = [this.groups[0], this.groups[2]];
        this.groups[1].points[0].tracer = true;
        this.groups[2].neighbors = [this.groups[1], this.groups[3]];
        this.groups[3].neighbors = [this.groups[2], this.groups[4]];
        this.groups[4].neighbors = [this.groups[3], this.groups[5]];
        this.groups[5].neighbors = [this.groups[4], this.groups[5]];
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

            //this.groups[p].updatePointValues();
        }
    },

    setColor: function(index)
    {
        var length = this.colors.colorList.length-1;

        this.colors.shift(MathUtils.loopIndex(0, length, index));
    },

    incrementColor: function(incr)
    {
        var length = this.colors.colorList.length-1;
        var target = this.colors.colorIndex + incr;

        this.colors.shift(MathUtils.loopIndex(0, length, target));
    },

    //----------------------------------------
    // GUI CONNECTIONS
    //----------------------------------------

    updateGroups: function()
    {

    },

    updatePoints: function(dampener, influence, uniform)
    {

    },

    updateForces: function(strength, dampener)
    {

    },

    //----------------------------------------
    // PRIVATE METHODS
    //----------------------------------------

    addListeners: function()
    {
        window.addEventListener('mousemove', this.onMouseMove);
    },

    removeListeners: function()
    {
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

    update: function(delta, time)
    {
        if(!this.graphics || !this.groups || !this.curves)
            return;

        this.graphics.clear();

        this.graphics.beginFill(this.colors.list[0].color, 1);
        this.graphics.drawRect(0, 0, this.winWidth, this.winHeight);
        this.graphics.endFill();

        var group, curve;

        this.colors.update(delta);

        // Calculate Wave
        this.waveTime += delta;
        this.waveProgress = this.waveTime  / (this.waveDuration * 1000) % 1;
        
        var waveWidth = this.winWidth * this.waveLength;
        var wavePosition = this.waveProgress * (this.winWidth + waveWidth) - waveWidth * 0.5;

        for(var p = 0; p < this.groups.length; p++)
        {
            group = this.groups[p];
            group.bulgeX = this.mouseX;
            group.bulgeY = this.mouseY;
            group.strength = this.strength;
            group.strengthDampener = this.strengthDampener;
            group.waveWidth = waveWidth;
            group.wavePosition = wavePosition;
            group.waveAmplitude = this.waveAmplitude;
            group.update(delta);
        }

        for(var i = 0; i < this.curves.length; i++)
        {
            curve = this.curves[i];
            curve.renderCurve();
        }

        if(this.showCurveControls)
        {
            for(var i = 0; i < this.curves.length; i++)
            {
                curve = this.curves[i];
                curve.renderControls();
            }
        }

        if(this.showWaveControls)
        {
            this.graphics.beginFill(0x111111, 0.1);
            this.graphics.drawRect(wavePosition - 1, 0, 2, this.winHeight);
            this.graphics.drawRect(wavePosition - waveWidth * 0.5, 0, waveWidth, this.winHeight);
            this.graphics.endFill();
        }
    }
});