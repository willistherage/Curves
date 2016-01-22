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
        
        _.bindAll(this, 'init', 'addListeners', 'removeListeners', 'onUpdate', 'onResize');

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
    },

    removeListeners: function()
    {
        $(window).unbind('resize', this.onResize);

        AnimationFrame.removeListener(this.onUpdate);
    },

    //----------------------------------------
    // EVENT HANDLERS
    //----------------------------------------

    onUpdate: function() {
        
        this.renderer.render(this.stage);
    },

    onResize: function()
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.curves.resize(this.width, this.height);

        this.renderer.resize(this.width, this.height);
    }
});