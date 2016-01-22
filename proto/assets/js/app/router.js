var StaringContestRouter = function() {
	
	var Router = Backbone.Router.extend({

		//----------------------------------------
        // Variables
        //----------------------------------------

        // Navigation
        routes: {
            
            'create'            : 'create',
            'about'             : 'about',
            'moves'             : 'moves',
            'shake'             : 'shake',
            'shake/:id'         : 'shake',

            // Default
            '*actions'          : 'landing'
        },

        // General
        mainSiteTitle: 'Slap Five',
        analytics: ['UA-42057438-1'],
        siteLoaded: true,

        // Views
        appView: null,
        navigation: null,
        loader: null,
        queuedSection: null,
        currentView: null,

        // Preload Elements


        // Elements
        $container: null,

        //----------------------------------------
        // Public Methods
        //----------------------------------------
        
		initialize: function(options){
			_.bindAll(this, 'initialize', 'trackPageview', 'trackEvent', 'animateSiteIn', 'addMenu', 'blockMouseEvents', 'landing', 'create', 'moves', 'about', 'shake', 'onResize', 'onEventBlock', 'onSiteLoadComplete');
            
            // Events
            
            window.addEventListener('resize', this.onResize, false);

            this.onResize();

            //this.$container = $('#container');

            //this.appView = new SlapAppView({container:this.$container});
            //this.appView.init();

            return this;
		},

        trackPageview: function()
        {
            ga('send', 'pageview');
        },
        
        trackEvent: function(category, action, label, value)
        {
            ga('send', 'event', category, action, label, value);
        },

        //----------------------------------------
        // Private Methods
        //----------------------------------------

        animateSiteIn: function() {
            
            
        },

        addMenu: function() {
            
            this.menu = new SlapMenu($('#menu'), $('#navigation'), $('#container'));
            
        },

        blockMouseEvents: function() {

            if (document.attachEvent)
            {
                document.attachEvent("mousedown", this.onEventBlock);
            }
             else if (document.addEventListener)
            {
                document.addEventListener("mousedown", this.onEventBlock, false);
            }
        },

        //----------------------------------------
        // Routes
        //----------------------------------------

        landing: function() {
            
            if(!this.siteLoaded)
            {
                this.queuedSection = this.landing;
                return;
            }

            //var view = new SlapLandingView();
            //view.init();
            //this.appView.updateView(view);
        },

        create: function() {

            if(!this.siteLoaded)
            {
                this.queuedSection = this.create;
                return;
            }

            //var view = new SlapCreateView();
            //view.init();
            //this.appView.updateView(view);
        },

        moves: function() {

            if(!this.siteLoaded)
            {
                this.queuedSection = this.moves;
                return;
            }

            var view = new SlapMovesView();
            view.init();
            this.appView.updateView(view);
        },

        about: function() {

            if(!this.siteLoaded)
            {
                this.queuedSection = this.about;
                return;
            }

            var view = new SlapAboutView();
            view.init();
            this.appView.updateView(view);
        },

        shake: function(id) {

            if(!this.siteLoaded)
            {
                this.queuedSection = this.shake;
                return;
            }

            var view = new SlapCreateView();
            view.init();
            this.appView.updateView(view);
        },

        //----------------------------------------
        // Event Handlers
        //----------------------------------------

        onEventBlock: function(event) {
            event.stopPropagation();
            event.preventDefault();
        },

        onSiteLoadComplete: function()
        {
            this.siteLoaded = true;

            // Initialize views

            if(this.queuedSection)
                this.queuedSection();
            
            setTimeout(this.animateSiteIn, 20);
        },

        onResize: function()
        {
            var w = window.innerWidth;
            var h = window.innerHeight;
            
        }

	});

	return new Router();
}