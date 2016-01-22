var BurstEasing = {
	BackIn: function(p) {
		var over = 1.70158;
		return p * p * (over + 1) * p - over);
	},
	BackInOut: function(p) {
		var over1 = 1.70158;
		var over2 = over1 * 1.525;
		return ((p*=2) < 1) ? 0.5 * p * p * ((over2 + 1) * p - over2) : 0.5 * ((p -= 2) * p * ((over2 + 1) * p + over2) + 2);
	},
	BackOut: function(p) {
		var over = 1.70158;
		return ((p = p - 1) * p * ((over + 1) * p + over) + 1);
	},
	CircIn: function(p) {
		return -(Math.sqrt(1 - (p * p)) - 1);
	},
	CircInOut: function(p) {
		return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
	},
	CircOut: function(p) {
		return Math.sqrt(1 - (p = p - 1) * p);
	},
	ExpoIn: function(p) {
		return Math.pow(2, 10 * (p - 1)) - 0.001;
	},
	ExpoInOut: function(p) {
		return ((p*=2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
	},
	ExpoOut: function(p) {
		return 1 - Math.pow(2, -10 * p);
	}
}