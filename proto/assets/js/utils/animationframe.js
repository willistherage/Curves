var AnimationFrame  = {

	//----------------------------------------
	// Variables
	//----------------------------------------

	lastTime: new Date().getTime(),
	listeners: [],

	//----------------------------------------
	// Public Methods
	//----------------------------------------

	addListener: function(callback) {
		
		var runFrame = false;

		if(this.listeners.length < 1)
		{
			runFrame = true;
		}

		if(this.listeners.indexOf(callback) > -1)
		{
			return;
		}

		this.listeners.push(callback);

		if(runFrame)
		{
			this.onAnimationFrame();
		}
	},

	removeListener: function(callback) {

		var index = this.listeners.indexOf(callback);

		if(index > -1)
		{
			this.listeners.splice(index, 1);
		}
	},

	init: function () {

		_.bindAll(this, 'init', 'addListener', 'removeListener', 'onAnimationFrame');
		
		var vendors = ['webkit', 'moz'];
	    
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	    
		window.lastTime = 0;

	    if(!window.requestAnimationFrame)
	    {
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - window.lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall) }, timeToCall);
	            window.lastTime = currTime + timeToCall;
	            return id;
	        }
	    }
	    
	    if(!window.cancelAnimationFrame)
	    {
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        }
		}
	},


	//----------------------------------------
	// Event Handlers
	//----------------------------------------

	onAnimationFrame: function() {
		
		var l = this.listeners.length;
		var time = new Date().getTime();
		var delta = time - this.lastTime;
		this.lastTime = time;

		for(var i = 0; i < l; i++)
		{
			this.listeners[i](delta, time);
		}

		if(l)
		{
			requestAnimationFrame(this.onAnimationFrame);
		}
	}
}