var BaseView = {

	//----------------------------------------
    // VARIABLES
    //----------------------------------------

    $view: null,
    $content: null,
    animating: false,
    options: {},
    listeners: {},
    winWidth: 0,
    winHeight: 0,

    //----------------------------------------
    // PUBLIC METHODS
    //----------------------------------------

    /**
     *  Initializes the class. Automatically called at instantiation.
     */
    init: function() {

    },

    /**
     *  Cleans everything up and prepares for garbage collection.
     */
    destroy: function() {
        
        
        
    },
    
    /**
     *  Binding
     */
    bind: function() {
       _.bindAll(this, 'clone', 'destroy', 'extend', 'addEventListener', 'removeEventListener', 'dispatchEvent', 'resize');
    },

    /**
     *  Extends the abstract object and returns a function so you can instantiate it.
     */
    extend: function(b) {

        var a = this;

        var f = function(options) {
            var c = $.extend(true, {}, a, b);
            c.options = options;
            return c;
        }

        return f;
    },

    clone: function() {
        return $.extend(true, {}, this);
    },

    /**
     *  Adds callbacks on an event type.
     */
    addEventListener: function(type, callback) {
        if(!this.listeners[type])
        {
            this.listeners[type] = [];
        }

        var index = this.listeners[type].indexOf(callback);

        if(index >= 0)
            return;

        this.listeners[type].push(callback);
    },

    /**
     *  Removes callbacks on an event type.
     */
    removeEventListener: function(type, callback) {
        if(!this.listeners[type])
            return;

        var index = this.listeners[type].indexOf(callback);
        
        if(index < 0)
            return;

        this.listeners[type].splice(index, 1);
    },

    /**
     *  Calls any listeners on the event type and passes along the data.
     */
    dispatchEvent: function(type, data) {

        if(!this.listeners[type])
        {
            return;
        }

        for(var i = 0; i < this.listeners[type].length; i++)
        {
            var e = $.extend(data, {type: type, target: this});
            this.listeners[type][i](e);
        }
    },

    /**
     *  Placeholder for resize method.
     */
    resize: function(width, height) {
    	this.winWidth = width;
    	this.winHeight = height;
    }
};