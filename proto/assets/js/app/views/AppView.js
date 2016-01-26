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

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

	init: function() {
		
        this.bind();
        
        _.bindAll(this, 'init', 'addListeners', 'removeListeners', 'onKeyPress', 'onUpdate', 'onResize');

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

        this.addListeners();
	},

    //----------------------------------------
    // PRIVATE METHODS
    //----------------------------------------

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
                this.curves.toggleControls();
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



    onUpdate: function(event)
    {    
        this.renderer.render(this.stage);
    },

    onResize: function(event)
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.curves.resize(this.width, this.height);

        this.renderer.resize(this.width, this.height);
    }
});