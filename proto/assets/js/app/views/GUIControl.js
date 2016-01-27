var GUIControl = function() {

	var g = {

		// Curves
		pointFolder: null,
		roamX: 0,
		roamXControl: null,
		roamY: 0,
		roamYControl: null,
		roamDampener: 0,
		roamDampenerControl: null,

		neighborInfluence: 0,
		neighborInfluenceControl: null,
		uniformHandles: false,
		uniformHandlesControl: null,

		// Forces
		forceFolder: null,
		strength: 1000,
		strengthControl: null,
		strengthDampener: 0,
		strengthDampenerControl: null,

		// Wave
		waveFolder: null,
		waveWidth: 0,
		waveWidthControl: null,
		waveAmplitude: 0,
		waveAmplitudeControl: null,
		waveDuration: 10,
		waveDurationControl: null,

		// Debug
		debugFolder: null,
		showFPS: false,
		showFPSControl: null,
		showWave: false,
		showWaveControl: null,
		showCurves: false,
		showCurvesControl: null
	}

	return g;
	
}