var GUIControl = function() {

	var g = {

		canvas: {
			name: "Canvas",
			folder: null,
			properties: {
				width: {type: 'number', width: 1200, min: 600, max: 1600, incr: 1, control: null},
				height: {type: 'number', height: 630, min: 300, max: 1200, incr: 1, control: null},
				fullscreen: {type: 'bool', fullscreen: true, control: null},
			},
			eventHandler: null
		},

		group1: {
			name: "Curve Group 1",
			folder: null,
			properties: {
				rangeX: {type: 'number', rangeX: 0, min: 0, max: 1000, incr: 1, control: null},
				rangeY: {type: 'number', rangeY: 4, min: 0, max: 1000, incr: 1, control: null},
				roamX: {type: 'number', roamX: 0, min: 0, max: 1000, incr: 1, control: null},
				roamY: {type: 'number', roamY: 4, min: 0, max: 1000, incr: 1, control: null},
				roamDampener: {type: 'number', roamDampener: 75, min: 0, max: 100, incr: 1, control: null},
				percentageY: {type: 'number', percentageY: 20, min: 0, max: 100, incr: 1, control: null},
				originY: {type: 'number', originY: 120, min: -100, max: 200, incr: 1, control: null},
				centerY: {type: 'number', centerY: 100, min: 0, max: 100, incr: 1, control: null}
			},
			randomize: {type: 'bool', control: null},
			eventHandler: null
		},

		group2: {
			name: "Curve Group 2",
			folder: null,
			properties: {
				rangeX: {type: 'number', rangeX: 25, min: 0, max: 1000, incr: 1, control: null},
				rangeY: {type: 'number', rangeY: 10, min: 0, max: 1000, incr: 1, control: null},
				roamX: {type: 'number', roamX: 25, min: 0, max: 1000, incr: 1, control: null},
				roamY: {type: 'number', roamY: 10, min: 0, max: 1000, incr: 1, control: null},
				roamDampener: {type: 'number', roamDampener: 75, min: 0, max: 100, incr: 1, control: null},
				percentageY: {type: 'number', percentageY: 65, min: 0, max: 100, incr: 1, control: null},
				originY: {type: 'number', originY: 100, min: -100, max: 200, incr: 1, control: null},
				centerY: {type: 'number', centerY: 75, min: 0, max: 100, incr: 1, control: null}
			},
			randomize: {type: 'bool', control: null},
			eventHandler: null
		},

		group3: {
			name: "Curve Group 3",
			folder: null,
			properties: {
				rangeX: {type: 'number', rangeX: 25, min: 0, max: 1000, incr: 1, control: null},
				rangeY: {type: 'number', rangeY: 20, min: 0, max: 1000, incr: 1, control: null},
				roamX: {type: 'number', roamX: 25, min: 0, max: 1000, incr: 1, control: null},
				roamY: {type: 'number', roamY: 20, min: 0, max: 1000, incr: 1, control: null},
				roamDampener: {type: 'number', roamDampener: 75, min: 0, max: 100, incr: 1, control: null},
				percentageY: {type: 'number', percentageY: 45, min: 0, max: 100, incr: 1, control: null},
				originY: {type: 'number', originY: 65, min: -100, max: 200, incr: 1, control: null},
				centerY: {type: 'number', centerY: 50, min: 0, max: 100, incr: 1, control: null}
			},
			randomize: {type: 'bool', control: null},
			eventHandler: null
		},

		group4: {
			name: "Curve Group 4",
			folder: null,
			properties: {
				rangeX: {type: 'number', rangeX: 20, min: 0, max: 1000, incr: 1, control: null},
				rangeY: {type: 'number', rangeY: 30, min: 0, max: 1000, incr: 1, control: null},
				roamX: {type: 'number', roamX: 20, min: 0, max: 1000, incr: 1, control: null},
				roamY: {type: 'number', roamY: 30, min: 0, max: 1000, incr: 1, control: null},
				roamDampener: {type: 'number', roamDampener: 75, min: 0, max: 100, incr: 1, control: null},
				percentageY: {type: 'number', percentageY: 80, min: 0, max: 100, incr: 1, control: null},
				originY: {type: 'number', originY: 50, min: -100, max: 200, incr: 1, control: null},
				centerY: {type: 'number', centerY: 50, min: 0, max: 100, incr: 1, control: null}
			},
			randomize: {type: 'bool', control: null},
			eventHandler: null
		},

		group5: {
			name: "Curve Group 5",
			folder: null,
			properties: {
				rangeX: {type: 'number', rangeX: 20, min: 0, max: 1000, incr: 1, control: null},
				rangeY: {type: 'number', rangeY: 15, min: 0, max: 1000, incr: 1, control: null},
				roamX: {type: 'number', roamX: 20, min: 0, max: 1000, incr: 1, control: null},
				roamY: {type: 'number', roamY: 15, min: 0, max: 1000, incr: 1, control: null},
				roamDampener: {type: 'number', roamDampener: 75, min: 0, max: 100, incr: 1, control: null},
				percentageY: {type: 'number', percentageY: 60, min: 0, max: 100, incr: 1, control: null},
				originY: {type: 'number', originY: 50, min: -100, max: 200, incr: 1, control: null},
				centerY: {type: 'number', centerY: 50, min: 0, max: 100, incr: 1, control: null}
			},
			randomize: {type: 'bool', control: null},
			eventHandler: null
		},

		group6: {
			name: "Curve Group 6",
			folder: null,
			properties: {
				rangeX: {type: 'number', rangeX: 0, min: 0, max: 1000, incr: 1, control: null},
				rangeY: {type: 'number', rangeY: 30, min: 0, max: 1000, incr: 1, control: null},
				roamX: {type: 'number', roamX: 0, min: 0, max: 1000, incr: 1, control: null},
				roamY: {type: 'number', roamY: 30, min: 0, max: 1000, incr: 1, control: null},
				roamDampener: {type: 'number', roamDampener: 75, min: 0, max: 100, incr: 1, control: null},
				percentageY: {type: 'number', percentageY: 50, min: 0, max: 100, incr: 1, control: null},
				originY: {type: 'number', originY: 60, min: -100, max: 200, incr: 1, control: null},
				centerY: {type: 'number', centerY: 50, min: 0, max: 100, incr: 1, control: null}
			},
			randomize: {type: 'bool', control: null},
			eventHandler: null
		},

		points: {
			name: "Points",
			folder: null,
			properties: {
				neighborInfluence: {type: 'number', neighborInfluence: 0, min: 0, max: 100, incr: 1, control: null},
				uniformHandles: {type: 'bool', uniformHandles: false, control: null}
			},
			eventHandler: null
		},

		forces: {
			name: "Forces",
			folder: null,
			properties: {
				strength: {type: 'number', strength: 1000, min: 0, max: 10000, incr: 1, control: null},
				strengthDampener: {type: 'number', strengthDampener: 0, min: 0, max: 100, incr: 1, control: null}
			},
			eventHandler: null
		},

		wave: {
			name: "Wave",
			folder: null,
			properties: {
				width: {type: 'number', width: 90, min: 1, max: 100, incr: 1, control: null},
				amplitude: {type: 'number', amplitude: 10, min: 0, max: 100, incr: 1, control: null},
				duration: {type: 'number', duration: 10, min: 0, max: 100, incr: 1, control: null}
			},
			eventHandler: null
		},

		debug: {
			name: "Debug",
			folder: null,
			properties: {
				showFPS: {type: 'bool', showFPS: true, control: null},
				showWave: {type: 'bool', showWave: false, control: null},
				showBezier: {type: 'bool', showBezier: false, control: null}
			}
		}

	}

	return g;
	
}