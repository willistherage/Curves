var Burst = BaseView.extend({
	
	//----------------------------------------
    // VARIABLES
    //----------------------------------------

    stage: null,
    graphics: null,
    burstType: BurstType.SPARK,
    burstAreaType: BurstType.SQUARE,
    burstAreaSize: 200,
    lineCount: 8,
    showGuides: true,
    turbulence: 0,
    bursts:[],

    //
    progress: 0,
    duration: 1,

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();

		_.bindAll(this, 'init', 'addListeners', 'removeListeners', 'createBlast', 'createSpark', 'solveForX', 'solveForY', 'onUpdate');

        this.addListeners();
	},

	build: function(stage, type, count, area)
	{
        // Reference to the PIXI stage that the burst will live on. 
		this.stage = stage;

        // The type of burst that will be created.
        this.burstType = type;
        
        // The area of the burst in both width and height.
        this.burstArea = area;

        // The number of lines in the burst.
        this.lineCount = count;

        // The graphics layer the burst will be drawn onto.
		this.graphics = new PIXI.Graphics();
        
        switch(type)
        {
            case BurstType.SPARK:
                this.createSpark();
                break;
            case BurstType.BLAST:
                this.createBlast();
                break;
            default:
                console.log('Burst type '+type+' not found.');
                break;
        }

        this.stage.addChild(this.graphics);
	},

    //----------------------------------------
    // PRIVATE METHODS
    //----------------------------------------

    createBlast: function()
    {
        
    },

    createSpark: function()
    {
        this.bursts = [];

        // Degree at which the burst is split up.
        var angle = 360 / (this.lineCount * 2);
        var turbulenceAngle = angle * 0.5;

        var length = this.burstArea * 0.5;

        var x1, x2, y1, y2 = 0;

        for(var i = 0; i < this.lineCount * 2; i++)
        {
            // Determine stroke type
            var isMinor = (i % 2) == 0;

            // Determine paths
            var innerTurbulence = turbulenceAngle * ( (Math.random() * 2 - 1) * this.turbulence);
            var innerAngle = i * angle + innerTurbulence;
            
            var quarter = Math.floor(innerAngle / 90);
            var quarterAngle = innerAngle % 90;
            
            var eighth = Math.floor(innerAngle / 45);
            var eighthAngle = innerAngle % 45;
            
            var segment = eighth - quarter * 2;

            var bx, by, tx, ty = 0;
            var t;

            switch(quarter)
            {
                case 0:
                    solver = (segment == 0) ? this.solveForX : this.solveForY;
                    t = solver.call(this, length, Math.abs(eighth % 2 * 90 - quarterAngle));
                    break;
                case 1:
                    solver = (segment == 0) ? this.solveForY : this.solveForX;
                    t = solver.call(this, length, Math.abs(eighth % 2 * 90 - quarterAngle));
                    t.y *= -1;
                    break;
                case 2:
                    solver = (segment == 0) ? this.solveForX : this.solveForY;
                    t = solver.call(this, length, Math.abs(eighth % 2 * 90 - quarterAngle));
                    t.x *= -1;
                    t.y *= -1;
                    break;
                case 3:
                    solver = (segment == 0) ? this.solveForY : this.solveForX;
                    t = solver.call(this, length, Math.abs(eighth % 2 * 90 - quarterAngle));
                    t.x *= -1;
                    break;

            }

            tx = t.x;
            ty = t.y;

            //// Create guide

            var guideProp = new BurstProps({x1: bx,
                                            y1: by,
                                            x2: tx,
                                            y2: ty,
                                            color: BurstType.GUIDE_COLOR,
                                            thickness: BurstType.GUIDE_THICKNESS});

            var g = new BurstLine({props: [guideProp], guide: true});
            g.init();

            this.bursts.push(g);
            
            //// Start position
            x1 = 0;
            y1 = 0;

            x2 = 0;
            y2 = 0;

            var prop1 = new BurstProps({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2, 
                color: 0xFFFFFF,
                thickness: 8
            });

            //// End position

            x1 = 0;
            y1 = 0;

            x2 = t.x;
            y2 = t.y;

            var prop2 = new BurstProps({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2, 
                color: 0xFFFFFF,
                thickness: 8
            });

            var b = new BurstLine({props: [guideProp], guide: true});
            b.init();

            this.bursts.push(b);

            // Determine animation properties

            // Create burst
        }
    },

    addListeners: function()
    {
        AnimationFrame.addListener(this.onUpdate);
    },

    removeListeners: function()
    {
        AnimationFrame.removeListener(this.onUpdate);
    },

    solveForX: function(length, angle)
    {
        var t = {x:0, y:length, h:0, a:angle};
        t.x = Math.tan(MathUtils.DEGREES_TO_RADIANS * angle) * length;
        t.h = MathUtils.hypotenuse(t.x, t.y);
        return t;
    },

    solveForY: function(length, angle)
    {
        var t = {x:length, y:0, h:0, a:angle};
        t.y = Math.tan(MathUtils.DEGREES_TO_RADIANS * angle) * length;
        t.h = MathUtils.hypotenuse(t.x, t.y);
        return t;
    },

    play: function()
    {

    },

    //----------------------------------------
    // EVENT HANDLERS
    //----------------------------------------

    onUpdate: function() {

        if(this.graphics)
            this.graphics.clear();

        if(this.bursts.length)
        {
            var burst;

            for(var i = 0; i < this.bursts.length; i++)
            {
                burst = this.bursts[i];
                burst.update(0);
                burst.drawTo(this.graphics);
            }
        }
        
    }
});