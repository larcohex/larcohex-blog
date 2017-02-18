$(document).ready (function() {
	var pentagon = [ [43.5726157799226, 186.832815729997 ], [8.69857443566525, 79.5015528100076], [100, 13.1671842700025], [191.301425564335, 79.5015528100076], [156.427384220077, 186.832815729997] ];
	var reversePentagon = [ [43.5726157799226, 186.832815729997 ], [156.427384220077, 186.832815729997], [191.301425564335, 79.5015528100076], [100, 13.1671842700025], [8.69857443566525, 79.5015528100076] ];

	var line = d3.svg.line()
		.interpolate ("linear-closed");


	function prepare() {
		document.getElementById ("loading").innerHTML = "";
		var svg = d3.select ("#loading").append("svg")
			.datum (pentagon)
			.attr ("width", 400)
			.attr ("height", 400)
			.attr ("viewBox", "0 0 200 200");

		svg.append ("path")
			.attr ("d", line)
			.call (transition);
	}

	function transition (path) {
		path.transition()
			.duration (3000)
			.ease (d3.ease("linear"))
			.attrTween ("stroke-dasharray", tweenDash)
			.each ("end", function() { d3.select (this).call (prepareReverse); });
	}

	function prepareReverse() {
		document.getElementById ("loading").innerHTML = "";
		var svg = d3.select ("#loading").append("svg")
			.datum (reversePentagon)
			.attr ("width", 400)
			.attr ("height", 400)
			.attr ("viewBox", "0 0 200 200");


		svg.append ("path")
			.attr ("d", line)
			.call (reverseTransition);
	}


	function reverseTransition (path) {
		path.transition()
			.duration (3000)
			.ease (d3.ease("linear"))
			.attrTween ("stroke-dasharray", reverseTweenDash)
			.each ("end", function() { d3.select (this).call (prepare); });
	}

	function tweenDash() {
		var l = this.getTotalLength(),
			i = d3.interpolateString("0," + l, l + "," + l);
		return function (t) { return i(t); };
	}

	function reverseTweenDash() {
		var l = this.getTotalLength(),
			i = d3.interpolateString(l + "," + l, "0," + l);
		return function (t) { return i(t); };
	}

	prepare();
});