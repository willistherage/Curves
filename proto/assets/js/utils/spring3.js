
var SpringSmooth3 = function(round) {
	var s = {

		//----------------------------------------
		// VARIABLES
		//----------------------------------------
		
		position: {x: 0, y: 0, z: 0},
		target: {x: 0, y: 0, z: 0},
		diff: {x: 0, y: 0, z: 0},
		power: {x: 0.15, y: 0.15, z: 0.15},
		velocity: {x: 0, y: 0, z: 0},
		axes: ['x', 'y', 'z'],
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

			for(var i = 0; i < this.axes.length; i++)
			{
				var axis = this.axes[i];

				if(this.power[axis] <= 0)
				{
					this.position[axis] = this.target[axis];
					this.velocity[axis] = 0;
					return this.target;
				}

				var delta = this.position[axis] - this.target[axis];
				var omega = 2.0 / this.power[axis];
				var x = omega * dt;
				var exp = 1.0 / Math.exp(x);
				var temp = (this.velocity[axis] + omega * delta) * dt;
				
				this.velocity[axis] = (this.velocity[axis] - omega * temp) * exp;
				this.position[axis] = (this.target[axis] + (delta + temp) * exp);
				this.diff[axis] = this.target[axis] - this.position[axis];

				if(this.round)
				{
					this.diff[axis] = Math.round(this.diff[axis] * this.roundTo) / this.roundTo;
				}

				if(Math.abs(this.diff[axis]) > this.eps && stillness)
				{
					stillness = false;
				}

				if(Math.abs(this.velocity[axis]) > this.lowpassRange && low)
				{
					low = false;
				}
			}

			this.still = stillness;
			this.lowpass = low;
			
			return this.position;
		}
	};

	s.init();

	return s;
}
