var CurveAppView = BaseView.extend({
	
	//----------------------------------------
    // VARIABLES
    //----------------------------------------

    $container: null,
    $canvas: null,
    stage: null,
    sprite: null,
    renderer: null,
    curves:null,
    resolution: 1,
    defaultWidth: 800,
    defaultHeight: 600,
    stats: null,
    gui: null,
    gc: null,
    downloadCount: 0,
    pixelratio: false,

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();
        
        _.bindAll(this, 'init', 'setupGUI', 'syncGUI', 'addListeners', 'removeListeners', 'saveImage', 'onKeyPress', 'onUpdate', 'onResize', 'onCanvasChanged', 'onGroup1Changed', 'onGroup2Changed', 'onGroup3Changed', 'onGroup4Changed', 'onGroup5Changed', 'onGroup6Changed', 'onPointsChanged', 'onForcesChanged', 'onWaveChanged', 'onColorsChanged', 'onShowFPSChanged', 'onShowWaveChanged', 'onShowBezierChanged');

        // Initializing animation frame
        AnimationFrame.init();

        // Grabbing reference to the container
        this.$container = $('#container');

        var context = document.createElement("canvas").getContext("2d");
        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio || 1;
        
        //this.resolution = devicePixelRatio / backingStoreRatio;

        // Initializing pixi renderer
        this.stage = new PIXI.Container();
        this.renderer = new PIXI.CanvasRenderer(this.defaultWidth * this.resolution, this.defaultHeight * this.resolution, {antialias: true, preserveDrawingBuffer: true});
        this.$container.append(this.renderer.view);
        
        // Grabbing reference to the canvas
        this.$canvas = this.$container.find('canvas');

        //TweenMax.set(this.$canvas, {scale:1/this.resolution});
        
        

        // Setting the resolution of the canvas
        //this.renderer.resolution = this.resolution;

        TweenMax.set(this.$canvas, {scale:1/this.resolution});

        /*
        if(devicePixelRatio !== backingStoreRatio)
        {
            var oldWidth = this.renderer.view.width;
            var oldHeight = this.renderer.view.height;

            this.renderer.view.width = oldWidth * ratio;
            this.renderer.view.height = oldHeight * ratio;

            this.renderer.view.style.width = oldWidth + 'px';
            this.renderer.view.style.height = oldHeight + 'px';

            this.context.scale(ratio, ratio);
        }
        */

        // Creating the Curves
        this.curves = new Curves({curveCount: 8, width: this.defaultWidth * this.resolution, height: this.defaultHeight * this.resolution});
        this.curves.init();

        // Adding graphic to stage
        this.stage.addChild(this.curves.graphics);

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
        this.gc.group1.eventHandler = this.onGroup1Changed;
        this.gc.group2.eventHandler = this.onGroup2Changed;
        this.gc.group3.eventHandler = this.onGroup3Changed;
        this.gc.group4.eventHandler = this.onGroup4Changed;
        this.gc.group5.eventHandler = this.onGroup5Changed;
        this.gc.group6.eventHandler = this.onGroup6Changed;
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
                
                switch(prop.type)
                {
                    case 'number':
                        prop.control = data.folder.add(prop, p, prop.min, prop.max).step(prop.incr).listen();
                        if(data.eventHandler)
                        {
                            prop.control.onChange(data.eventHandler);
                            prop.control.onFinishChange(data.eventHandler);
                        }
                        break;
                    case 'bool':
                        prop.control = data.folder.add(prop, p).listen();
                        if(data.eventHandler)
                        {
                            prop.control.onFinishChange(data.eventHandler);
                        }
                        break;
                    case 'array':
                        //
                        break;
                }
            }
        }

        this.gc.debug.properties.showFPS.control.onFinishChange(this.onShowFPSChanged);
        this.gc.debug.properties.showWave.control.onFinishChange(this.onShowWaveChanged);
        this.gc.debug.properties.showBezier.control.onFinishChange(this.onShowBezierChanged);

        this.syncGUI();
    },

    syncGUI: function()
    {
        this.onCanvasChanged(this.gc.canvas.properties.fullscreen.fullscreen);
        this.onGroup1Changed();
        this.onGroup2Changed();
        this.onGroup3Changed();
        this.onGroup4Changed();
        this.onGroup5Changed();
        this.onGroup6Changed();
        this.onPointsChanged();
        this.onForcesChanged();
        this.onWaveChanged();
        this.onColorsChanged();
        this.onShowFPSChanged();
        this.onShowWaveChanged();
        this.onShowBezierChanged();
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

    saveImage: function()
    {
        var image = this.renderer.view.toDataURL("image/png").replace("image/png", "image/octet-stream");
        
        var link = document.createElement("a");
        link.download = "LoveNoteCurve"+this.downloadCount+".png";
        link.href = image;
        link.click();

        this.downloadCount++;
    },

    //----------------------------------------
    // EVENT HANDLERS
    //----------------------------------------

    onKeyPress: function(event)
    {
        switch(event.keyCode)
        {
            case 32: //Space
                this.saveImage();
                break;
            case 38: //Up Arrow
                this.curves.incrementColor(1);
                break;
            case 40: //Down Arrow
                this.curves.incrementColor(-1);
                break;
            case 37: //Left Arrow
                //this.curves.shiftColors(-1);
                break;
            case 39: //Right Arrow
                //this.curves.shiftColors(1);
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

        this.curves.resize(this.width * this.resolution, this.height * this.resolution);

        if(this.gc.canvas.properties.fullscreen.fullscreen)
        {
            this.renderer.resize(this.width * this.resolution, this.height * this.resolution);
        }
    },

    //----------------------------------------
    // GUI CHANGE EVENTS
    //----------------------------------------
    
    onCanvasChanged: function(value)
    {
        var toggle = typeof value === 'boolean';

        var props = this.gc.canvas.properties;

        if(!toggle && props.fullscreen.fullscreen)
        {
            props.fullscreen.fullscreen = false;
        }

        if(props.fullscreen.fullscreen)
        {
            this.renderer.resize(this.width * this.resolution, this.height * this.resolution);
            this.curves.resize(this.width * this.resolution, this.height * this.resolution);
        }
         else
        {
            var w = props.width.width * this.resolution;
            var h = props.height.height * this.resolution;
            this.renderer.resize(w, h);
            this.curves.resize(w, h);
        }
    },

    onGroup1Changed: function(value)
    {
        var props = this.gc.group1.properties;
        var group = this.curves.groups[0];

        group.rangeX = props.rangeX.rangeX * 0.001;
        group.rangeY = props.rangeY.rangeY * 0.001;
        group.roamX = props.roamX.roamX * 0.001;
        group.roamY = props.roamY.roamY * 0.001;
        group.roamDampener = props.roamDampener.roamDampener * 0.01;
        group.percentageY = props.percentageY.percentageY * 0.01;
        group.originY = props.originY.originY * 0.01;
        group.centerY = props.centerY.centerY * 0.01;
    },

    onGroup2Changed: function(value)
    {
        var props = this.gc.group2.properties;
        var group = this.curves.groups[1];

        group.rangeX = props.rangeX.rangeX * 0.001;
        group.rangeY = props.rangeY.rangeY * 0.001;
        group.roamX = props.roamX.roamX * 0.001;
        group.roamY = props.roamY.roamY * 0.001;
        group.roamDampener = props.roamDampener.roamDampener * 0.01;
        group.percentageY = props.percentageY.percentageY * 0.01;
        group.originY = props.originY.originY * 0.01;
        group.centerY = props.centerY.centerY * 0.01;
    },

    onGroup3Changed: function(value)
    {
        var props = this.gc.group3.properties;
        var group = this.curves.groups[2];

        group.rangeX = props.rangeX.rangeX * 0.001;
        group.rangeY = props.rangeY.rangeY * 0.001;
        group.roamX = props.roamX.roamX * 0.001;
        group.roamY = props.roamY.roamY * 0.001;
        group.roamDampener = props.roamDampener.roamDampener * 0.01;
        group.percentageY = props.percentageY.percentageY * 0.01;
        group.originY = props.originY.originY * 0.01;
        group.centerY = props.centerY.centerY * 0.01;
    },

    onGroup4Changed: function(value)
    {
        var props = this.gc.group4.properties;
        var group = this.curves.groups[3];

        group.rangeX = props.rangeX.rangeX * 0.001;
        group.rangeY = props.rangeY.rangeY * 0.001;
        group.roamX = props.roamX.roamX * 0.001;
        group.roamY = props.roamY.roamY * 0.001;
        group.roamDampener = props.roamDampener.roamDampener * 0.01;
        group.percentageY = props.percentageY.percentageY * 0.01;
        group.originY = props.originY.originY * 0.01;
        group.centerY = props.centerY.centerY * 0.01;
    },

    onGroup5Changed: function(value)
    {
        var props = this.gc.group5.properties;
        var group = this.curves.groups[4];

        group.rangeX = props.rangeX.rangeX * 0.001;
        group.rangeY = props.rangeY.rangeY * 0.001;
        group.roamX = props.roamX.roamX * 0.001;
        group.roamY = props.roamY.roamY * 0.001;
        group.roamDampener = props.roamDampener.roamDampener * 0.01;
        group.percentageY = props.percentageY.percentageY * 0.01;
        group.originY = props.originY.originY * 0.01;
        group.centerY = props.centerY.centerY * 0.01;
    },

    onGroup6Changed: function(value)
    {
        var props = this.gc.group6.properties;
        var group = this.curves.groups[5];

        group.rangeX = props.rangeX.rangeX * 0.001;
        group.rangeY = props.rangeY.rangeY * 0.001;
        group.roamX = props.roamX.roamX * 0.001;
        group.roamY = props.roamY.roamY * 0.001;
        group.roamDampener = props.roamDampener.roamDampener * 0.01;
        group.percentageY = props.percentageY.percentageY * 0.01;
        group.originY = props.originY.originY * 0.01;
        group.centerY = props.centerY.centerY * 0.01;
    },

    onPointsChanged: function(value)
    {
        var props = this.gc.points.properties;

        var groups = this.curves.groups;
        var group;

        for(var i = 0; i < groups.length; i++)
        {
            group = groups[i];
            group.uniformHandles = props.uniformHandles.uniformHandles;
            group.neighborInfluence = props.neighborInfluence.neighborInfluence * 0.01;
        }
    },

    onForcesChanged: function(value)
    {
        var props = this.gc.forces.properties;

        this.curves.strength = props.strength.strength;
        this.curves.strengthDampener = props.strengthDampener.strengthDampener * 0.01;
    },

    onWaveChanged: function(value)
    {
        var props = this.gc.wave.properties;
        this.curves.waveLength = props.width.width * 0.01;
        this.curves.waveAmplitude = props.amplitude.amplitude * 0.01;
        this.curves.waveDuration = props.duration.duration;
    },

    onColorsChanged: function(value)
    {
        //this.curves.updateWave(this.gc.waveWidth, this.gc.waveAmplitude, this.gc.waveDuration);
    },

    onShowFPSChanged: function(value)
    {
        if(!this.gc.debug.properties.showFPS.showFPS)
        {
            $(this.stats.domElement).addClass('hide');
        }
         else
        {
            $(this.stats.domElement).removeClass('hide');
        }
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