var GUIControl = function() {

	var g = {

		canvas: {
			name: "Canvas",
			folder: null,
			properties: {
				width: {type: 'number', value: 1200, min: 600, max: 1600, incr: 1, control: null},
				height: {type: 'number', value: 630, min: 300, max: 1200, incr: 1, control: null}
			},
			eventHandler: null
		},

		group1: {
			name: "Curve Group 1",
			folder: null,
			properties: {
				rangeX: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				rangeY: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				roamX: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				roamY: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				percentageY: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				originY: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				centerY: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null}
			},
			randomize: {type: 'bool', control: null},
			eventHandler: null
		},

		points: {
			name: "Points",
			folder: null,
			properties: {
				roamDampener: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				neighborInfluence: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				uniformHandles: {type: 'bool', value: true, control: null}
			},
			eventHandler: null
		},

		forces: {
			name: "Forces",
			folder: null,
			properties: {
				strength: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				strengthDampener: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null}
			},
			eventHandler: null
		},

		wave: {
			name: "Wave",
			folder: null,
			properties: {
				width: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				amplitude: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null},
				duration: {type: 'number', value: 0, min: 0, max: 100, incr: 1, control: null}
			},
			eventHandler: null
		},

		debug: {
			name: "Debug",
			folder: null,
			properties: {
				showFPS: {type: 'bool', value: false, control: null},
				showWave: {type: 'bool', value: false, control: null},
				showBezier: {type: 'bool', value: false, control: null}
			}
		}

	}

	return g;
	
}