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
    guiControl: null,

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();
        
        _.bindAll(this, 'init', 'setupGUI', 'addListeners', 'removeListeners', 'onKeyPress', 'onUpdate', 'onResize', 'onPointsChanged', 'onStrengthChanged', 'onWaveChanged', 'onShowFPSChanged', 'onShowWaveChanged', 'onShowCurvesChanged');

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
        this.guiControl = new GUIControl();

        this.guiControl.pointFolder = this.gui.addFolder("Curves");
        this.roamDampenerControl = this.guiControl.pointFolder.add(this.guiControl, 'roamDampener', 0, 1).step(0.01);
        this.roamDampenerControl.onFinishChange(this.onRoamDampenerChanged);
        this.neighborInfluenceControl = this.guiControl.pointFolder.add(this.guiControl, 'neighborInfluence', 0, 1).step(0.01);
        this.neighborInfluenceControl.onFinishChange(this.onNeighborInfluenceChanged);
        this.uniformHandlesControl = this.guiControl.pointFolder.add(this.guiControl, 'uniformHandles');
        this.uniformHandlesControl.onFinishChange(this.onUniformHandlesChanged);

        this.guiControl.forceFolder = this.gui.addFolder("Forces");
        this.strengthControl = this.guiControl.forceFolder.add(this.guiControl, 'strength', 0, 2000).step(10);
        this.strengthControl.onFinishChange(this.onStrengthChanged);
        this.strengthDampenerControl = this.guiControl.forceFolder.add(this.guiControl, 'strengthDampener', 0, 1).step(0.01);
        this.strengthDampenerControl.onFinishChange(this.onStrengthDampenerChanged);

        this.guiControl.waveFolder = this.gui.addFolder("Waves");
        this.waveWidthControl = this.guiControl.waveFolder.add(this.guiControl, 'waveWidth', 0, 1).step(0.01);
        this.waveWidthControl.onFinishChange(this.onWaveChanged);
        this.waveAmplitudeControl = this.guiControl.waveFolder.add(this.guiControl, 'waveAmplitude', 0, 1).step(0.01);
        this.waveAmplitudeControl.onFinishChange(this.onWaveChanged);
        this.waveDurationControl = this.guiControl.waveFolder.add(this.guiControl, 'waveDuration', 0, 20).step(1);
        this.waveDurationControl.onFinishChange(this.onWaveChanged);
        
        this.guiControl.debugFolder = this.gui.addFolder("Debug");
        this.showFPSControl = this.guiControl.debugFolder.add(this.guiControl, 'showFPS');
        this.showFPSControl.onFinishChange(this.onShowFPSChanged);
        this.showWaveControl = this.guiControl.debugFolder.add(this.guiControl, 'showWave');
        this.showWaveControl.onFinishChange(this.onShowWaveChanged);
        this.showCurvesControl = this.guiControl.debugFolder.add(this.guiControl, 'showCurves');
        this.showCurvesControl.onFinishChange(this.onShowCurvesChanged);

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
    
    onPointsChanged:function(value)
    {
        this.curves.updatePoints(this.guiControl.roamDampener, this.guiControl.neighborInfluence, this.guiControl.uniformHandles);
    },

    onStrengthChanged:function(value)
    {
        this.curves.updateStrength(this.guiControl.strength, this.guiControl.strengthDampener);
    },

    onWaveChanged:function(value)
    {
        this.curves.updateWave(this.guiControl.waveWidth, this.guiControl.waveAmplitude, this.guiControl.waveDuration);
    },

    onShowFPSChanged:function(value)
    {
        // toggle fps
    }, 

    onShowWaveChanged:function(value)
    {
        this.curves.showWaveControls = value;
    }, 

    onShowCurvesChanged:function(value)
    {
        this.curves.showCurveControls = value;
    }
});