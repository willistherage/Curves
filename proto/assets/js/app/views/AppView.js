var CurveAppView = BaseView.extend({
	
	//----------------------------------------
    // VARIABLES
    //----------------------------------------

    $container: null,
    $canvas: null,
    stage: null,
    renderer: null,
    graphics: null,
    curves:null,
    resolution: 1,
    defaultWidth: 800,
    defaultHeight: 600,
    stats: null,
    gui: null,
    gc: null,

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();
        
        _.bindAll(this, 'init', 'setupGUI', 'addListeners', 'removeListeners', 'onKeyPress', 'onUpdate', 'onResize', 'onCanvasChanged', 'onGroupsChanged', 'onPointsChanged', 'onForcesChanged', 'onWaveChanged', 'onColorsChanged', 'onShowFPSChanged', 'onShowWaveChanged', 'onShowBezierChanged');

        // Initializing animation frame
        AnimationFrame.init();

        // Grabbing reference to the container
        this.$container = $('#container');

        // Initializing pixi renderer
        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(this.defaultWidth, this.defaultHeight, {antialias: true});
        this.$container.append(this.renderer.view);
        
        // Grabbing reference to the canvas
        this.$canvas = this.$container.find('canvas');

        // Setting the resolution of the canvas
        this.renderer.resolution = this.resolution;
        TweenMax.set(this.$canvas, {scale:1/this.resolution});

        // Creating the Curves
        this.curves = new Curves({stage: this.stage, curveCount: 8, width: this.defaultWidth, height: this.defaultHeight});
        this.curves.init();

        this.stats = new Stats();
        this.stats.setMode( 2 );
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';

        document.body.appendChild( this.stats.domElement );

        this.setupGUI();

        this.addListeners();
	},

    //----------------------------------------
    // PRIVATE METHODS
    //----------------------------------------

    setupGUI: function()
    {
        // Initialize GUI
        this.gui = new dat.GUI();
        this.gc = new GUIControl();

        this.gc.canvas.eventHandler = this.onCanvasChanged;
        this.gc.group1.eventHandler = this.onGroupsChanged;
        this.gc.points.eventHandler = this.onPointsChanged;
        this.gc.forces.eventHandler = this.onForcesChanged;
        this.gc.wave.eventHandler = this.onWaveChanged;

        for(var el in this.gc)
        {
            var data = this.gc[el];

            data.folder = this.gui.addFolder(data.name);

            for(var p in data.properties)
            {
                var prop = data.properties[p];
                
                //prop.control = data.folder.add(data.properties, )
            }
        }

        /*
        this.gc.canvasFolder = this.gui.addFolder("Canvas");
        this.

        this.gc.pointFolder = this.gui.addFolder("Curves");
        this.roamDampenerControl = this.gc.pointFolder.add(this.gc, 'roamDampener', 0, 1).step(0.01);
        this.roamDampenerControl.onFinishChange(this.onRoamDampenerChanged);
        this.neighborInfluenceControl = this.gc.pointFolder.add(this.gc, 'neighborInfluence', 0, 1).step(0.01);
        this.neighborInfluenceControl.onFinishChange(this.onNeighborInfluenceChanged);
        this.uniformHandlesControl = this.gc.pointFolder.add(this.gc, 'uniformHandles');
        this.uniformHandlesControl.onFinishChange(this.onUniformHandlesChanged);

        this.gc.forceFolder = this.gui.addFolder("Forces");
        this.strengthControl = this.gc.forceFolder.add(this.gc, 'strength', 0, 2000).step(10);
        this.strengthControl.onFinishChange(this.onStrengthChanged);
        this.strengthDampenerControl = this.gc.forceFolder.add(this.gc, 'strengthDampener', 0, 1).step(0.01);
        this.strengthDampenerControl.onFinishChange(this.onStrengthDampenerChanged);

        this.gc.waveFolder = this.gui.addFolder("Waves");
        this.waveWidthControl = this.gc.waveFolder.add(this.gc, 'waveWidth', 0, 1).step(0.01);
        this.waveWidthControl.onFinishChange(this.onWaveChanged);
        this.waveAmplitudeControl = this.gc.waveFolder.add(this.gc, 'waveAmplitude', 0, 1).step(0.01);
        this.waveAmplitudeControl.onFinishChange(this.onWaveChanged);
        this.waveDurationControl = this.gc.waveFolder.add(this.gc, 'waveDuration', 0, 20).step(1);
        this.waveDurationControl.onFinishChange(this.onWaveChanged);
        
        this.gc.debugFolder = this.gui.addFolder("Debug");
        this.showFPSControl = this.gc.debugFolder.add(this.gc, 'showFPS');
        this.showFPSControl.onFinishChange(this.onShowFPSChanged);
        this.showWaveControl = this.gc.debugFolder.add(this.gc, 'showWave');
        this.showWaveControl.onFinishChange(this.onShowWaveChanged);
        this.showCurvesControl = this.gc.debugFolder.add(this.gc, 'showCurves');
        this.showCurvesControl.onFinishChange(this.onShowCurvesChanged);
        */

        //controller.onChange(function(value) {});
        //controller.onFinishChange(function(value) {});

        
    },

    addListeners: function()
    {
        $(window).bind('resize', this.onResize);
        this.onResize();

        AnimationFrame.addListener(this.onUpdate);

        /*
        document.addEventListener('touchstart', this.onBlockedEvent, false);
        document.addEventListener('touchmove', this.onBlockedEvent, false);
        document.addEventListener('touchend', this.onBlockedEvent, false);
        */

        if (document.attachEvent)
        {
            document.attachEvent("onkeydown", this.onKeyPress);
        }
         else if (document.addEventListener)
        {
            document.addEventListener("keydown", this.onKeyPress, false);
        }

    },

    removeListeners: function()
    {
        $(window).unbind('resize', this.onResize);

        AnimationFrame.removeListener(this.onUpdate);

        /*
        document.removeEventListener('touchstart', this.onBlockedEvent, false);
        document.removeEventListener('touchmove', this.onBlockedEvent, false);
        document.removeEventListener('touchend', this.onBlockedEvent, false);
        */

        if (document.detachEvent)
        {
            document.detachEvent("onkeydown", this.onKeyPress);
        }
         else if (document.removeEventListener)
        {
            document.removeEventListener("keydown", this.onKeyPress);
        }
    },

    //----------------------------------------
    // EVENT HANDLERS
    //----------------------------------------

    onKeyPress: function(event)
    {
        switch(event.keyCode)
        {
            case 32: //Space
                //this.curves.toggleControls();
                break;
            case 38: //Up Arrow
                this.curves.incrementColor(1);
                break;
            case 40: //Down Arrow
                this.curves.incrementColor(-1);
                break;
            case 37: //Left Arrow
                //
                break;
            case 39: //Right Arrow
                //
                break;
            default:
                break;
        }
    },



    onUpdate: function(delta, time)
    {
        this.stats.begin();
        this.curves.update(delta, time);
        this.renderer.render(this.stage);
        this.stats.end();
    },

    onResize: function(event)
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.curves.resize(this.width, this.height);

        this.renderer.resize(this.width, this.height);
    },

    //----------------------------------------
    // GUI CHANGE EVENTS
    //----------------------------------------
    
    onCanvasChanged: function()
    {
        //
    },

    onGroupsChanged: function()
    {
        //
    },

    onPointsChanged: function()
    {
        //this.curves.updatePoints(this.gc.roamDampener, this.gc.neighborInfluence, this.gc.uniformHandles);
    },

    onForcesChanged: function()
    {
        //this.curves.updateStrength(this.gc.strength, this.gc.strengthDampener);
    },

    onWaveChanged: function()
    {
        //this.curves.updateWave(this.gc.waveWidth, this.gc.waveAmplitude, this.gc.waveDuration);
    },

    onColorsChanged: function()
    {
        //this.curves.updateWave(this.gc.waveWidth, this.gc.waveAmplitude, this.gc.waveDuration);
    },

    onShowFPSChanged: function(value)
    {
        // toggle fps
    }, 

    onShowWaveChanged: function(value)
    {
        this.curves.showWaveControls = value;
    }, 

    onShowBezierChanged:function(value)
    {
        this.curves.showCurveControls = value;
    }
});