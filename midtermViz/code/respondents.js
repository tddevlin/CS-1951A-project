var margin = { top: 40, right: 50, bottom: 100, left: 80 },
	width = 500 - margin.left - margin.right,
	height = 1800 - margin.top - margin.bottom,
	sideWidth = margin.left + margin.right;
	colors = ["#E45B4E","#3A9D94","#293447","#3187D1"],
	areas = ["Humanities", "Social", "Life", "Physical"],
	semesters = ["S10", "F10", "S11", "F11", "S12", "F12",
		"S13", "F13", "S14", "F14", "S15"],
	areaLabs = [["CHIN", "Humanities"], ["AFRI", "Social Sciences"],
		["BIOL", "Life Sciences"], ["APMA", "Physical Sciences"]],
	vdist = 15,
	hdist = 30,
	smallerCircle = 1/2;

d3.csv("../data/cleanMidterm.csv", function(error, data) { dataViz(data); });

function dataViz(data) {
	var svg = d3.select("#chart")
		.append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + 
	    	margin.top + ")");

	var deptScale = d3.scale.ordinal()
		.domain(d3.map(data, function(d) { return d.department; }).keys())
		.rangePoints([0, height]);

	var semScale = d3.scale.ordinal()
		.domain(semesters)
		.rangePoints([0, width]);

	var colorScale = d3.scale.ordinal()
		.domain(areas)
		.range(colors);

	var deptLabels = svg.selectAll(".deptLabel")
	    .data(d3.map(data, function(d) {
	    	return [d.department, d.area];
	    }).keys())
	    .enter()
	    .append("text")
		.text(function (d) { return d.split(",")[0]; })
		.attr("x", 0)
		.attr("y", function (d, i) { return deptScale(d.split(",")[0]); })
		.style("text-anchor", "end")
		.attr("transform", "translate(-6," + 0 + ")")
		.attr("alignment-baseline", "middle")
		.attr("class", function(d) {
			return "deptLabel " + d.split(",")[1];
		});

	var semLabels = svg.selectAll(".semLabel")
	    .data(semesters)
	    .enter()
	    .append("text")
		.text(function(d) { return d; })
		.attr("x", function(d, i) { return semScale(d); })
		.attr("y", 0)
		.style("text-anchor", "middle")
		.attr("transform", "translate(" + hdist / 2 + ", -15)")
		.attr("class", "semLabel");

	var semLabels2 = svg.selectAll(".semLabel2")
	    .data(semesters)
	    .enter()
	    .append("text")
		.text(function(d) { return d; })
		.attr("x", function(d, i) { return semScale(d); })
		.attr("y", height)
		.style("text-anchor", "middle")
		.attr("transform", "translate(" + hdist / 2 + ", +25)")
		.attr("class", "semLabel2");

	var horLines = svg.selectAll(".horLine")
		.data(d3.map(data, function(d) { return [d.department, d.area]; }).keys())
		.enter()
		.append("line")
		.attr("x1", function(d) {
			return semScale("S10") + hdist/2;
		})
		.attr("x2", function(d) {
			return semScale("S15") + hdist/2;
		})
		.attr("y1", function(d) {
			return deptScale(d.split(",")[0]);
		})
		.attr("y2", function(d) {
			return deptScale(d.split(",")[0]);
		})
		.attr("class", "horLine")
		.attr("stroke", function(d) {
			return colorScale(d.split(",")[1].split(" ")[0]);
		})
		.attr("stroke-width", 0.5)
		.attr("opacity", 0.3);

	var circleResp = svg.selectAll(".circleResp")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return semScale(d.semester) + hdist/2;
		})
		.attr("cy", function(d) {
			return deptScale(d.department);
		})
		.attr("r", function(d) {
			return Math.sqrt(d.respondents) * smallerCircle;
		})
		.attr("class", "circleResp")
		.attr("fill", function(d) {
			return colorScale(d.area.split(" ")[0]);
		})
		.attr("opacity", 0.5);

	var circleTotal = svg.selectAll(".circleTotal")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return semScale(d.semester) + hdist/2;
		})
		.attr("cy", function(d) {
			return deptScale(d.department);
		})
		.attr("r", function(d) {
			return Math.sqrt(d.total) * smallerCircle;
		})
		.attr("class", "circleTotal")
		.attr("fill", function(d) {
			return colorScale(d.area.split(" ")[0]);
		})
		.attr("opacity", 0.3);

	var svgArea = d3.select("#area")
		.append("svg")
	    .attr("width", sideWidth + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + 0 + "," + 
	    	margin.top + ")");

	var areaLabels = svgArea.selectAll(".areaLabel")
	    .data(areaLabs)
	    .enter()
	    .append("text")
		.text(function (d) { return d[1]; })
		.attr("x", 0)
		.attr("y", function (d) { return deptScale(d[0]); })
		.style("text-anchor", "start")
		.attr("alignment-baseline", "middle")
		.attr("class", function(d) {
			return "areaLabel " + d[1];
		});
	


	console.log(semScale("S15"));
}
