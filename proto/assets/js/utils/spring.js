
var SpringSmooth = function(round) {
	var s = {

		//----------------------------------------
		// VARIABLES
		//----------------------------------------
		
		position: 0,
		target: 0,
		diff: 0,
		power: 0,
		velocity: 0,
		round: false,
		roundTo: 100000,
		eps: 0.001,
		still: true,
		debug: false,
		lowpass: false,
		lowpassRange: 200,

		//----------------------------------------
		// PUBLIC METHODS
		//----------------------------------------

		init: function() {
			_.bindAll(this, 'update');

			if(round != undefined)
			{
				this.round = round;
			}
		},

		update: function (dt) {

			var stillness = true;
			var low = true;
			dt *= 0.001;

			if(this.power <= 0)
			{
				this.position = this.target;
				this.velocity = 0;
				return this.target;
			}

			var delta = this.position - this.target;
			var omega = 2.0 / this.power;
			var x = omega * dt;
			var exp = 1.0 / Math.exp(x);
			var temp = (this.velocity + omega * delta) * dt;
			
			this.velocity = (this.velocity - omega * temp) * exp;
			this.position = (this.target + (delta + temp) * exp);
			this.diff = this.target - this.position;

			if(this.round)
			{
				this.diff = Math.round(this.diff * this.roundTo) / this.roundTo;
			}

			if(Math.abs(this.diff) > this.eps && stillness)
			{
				stillness = false;
			}

			if(Math.abs(this.velocity) > this.lowpassRange && low)
			{
				low = false;
			}

			this.still = stillness;
			this.lowpass = low;
			
			return this.position;
		}
	};

	s.init();

	return s;
}
