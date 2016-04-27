var margin = {top: 20, right: 10, bottom: 20, left: 10};
var width = 850 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;
var rows = 5,
	cols = 4;
var gridwidth = width / cols,
	gridheight = height / rows
	gridpad = 0.15 * Math.min(gridwidth, gridheight);

var counter = 0;
var cellPosition = new Array();
for (i = 0; i < rows; i++) {
	for (j = 0; j < cols; j++) {
		cellPosition[counter] = [i,j]
		counter++;
	}
}

d3.csv("summarizedData.csv", function(error, data) { dataViz(data); });

function dataViz(data) {
	var svg = d3.select("#chart")
		.append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

	var rScale = d3.scale.linear()
		.domain([0,1])
		.range([0.2 * (Math.min(gridwidth, gridheight)/2 - gridpad),
			Math.min(gridwidth, gridheight)/2 - gridpad]);

	hexData = [[1,0], [1,1], [1,2], [1,3], [1,4], [1,5]];

	var hexLine = d3.svg.line.radial()
		.radius( function(d) { return rScale(d[0]); })
		.angle(function(d) {
			return d[1]/6 * 2 * Math.PI;
		});

	var hexagons = svg.selectAll(".hexagons")
		.data(data)
		.enter()
		.append("path")
		.attr("d", hexLine(hexData) + "Z")
		.attr("fill", "gray")
		.attr("fill-opacity", 0.1)
		.attr("stroke", "gray")
		.attr("stroke-width", 2)
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	lineData1 = [[1,0],[1,3]];
	lineData2 = [[1,1],[1,4]];
	lineData3 = [[1,2],[1,5]];

	var line1 = svg.selectAll(".line1")
		.data(data)
		.enter()
		.append("path")
		.attr("d", hexLine(lineData1))
		.attr("fill", "none")
		.attr("stroke", "gray")
		.attr("stroke-width", 1)
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	var line2 = svg.selectAll(".line2")
		.data(data)
		.enter()
		.append("path")
		.attr("d", hexLine(lineData2))
		.attr("fill", "none")
		.attr("stroke", "gray")
		.attr("stroke-width", 1)
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	var line3 = svg.selectAll(".line3")
		.data(data)
		.enter()
		.append("path")
		.attr("d", hexLine(lineData3))
		.attr("fill", "none")
		.attr("stroke", "gray")
		.attr("stroke-width", 1)
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	var dots = svg.selectAll(".dots")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d, i) {
			return gridwidth * cellPosition[i][1] + gridwidth/2;
		})
		.attr("cy", function(d, i) {
			return gridheight * cellPosition[i][0] + gridheight/2;
		})
		.attr("r", 2)
		.attr("fill", "black");

	var playerShapes = svg.selectAll(".playerShapes")
		.data(data)
		.enter()
		.append("path")
		.attr("d", function(d, i) {
			return hexLine([[d["Bench"], 0],
				[d["Broad"], 1],
				[d["Cone3"], 2],
				[d["Shuttle"], 3],
				[d["Vertical"], 4],
				[d["Yd40"], 5]]) + "Z";
		})
		.attr("fill", "#41b6c4")
		.attr("fill-opacity", 0.8)
		//.attr("stroke", "#41b6c4")
		//.attr("stroke-width", 2)
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	var posLabels = svg.selectAll(".posLabels")
		.data(data)
		.enter()
		.append("text")
		.text(function(d) { return d["Pos"]; })
		.attr("text-anchor", "middle")
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridpad/2) + ")"
		});

	var benchLabels = svg.selectAll(".benchLabels")
		.data(data)
		.enter()
		.append("text")
		.text("Bench")
		.attr("text-anchor", "middle")
		.attr("x", rScale(1.1) * Math.cos(0/6 * 2 * Math.PI - Math.PI/2))
		.attr("y", rScale(1.1) * Math.sin(0/6 * 2 * Math.PI - Math.PI/2))
		.attr("class", "statLabel")
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	var broadLabels = svg.selectAll(".broadLabels")
		.data(data)
		.enter()
		.append("text")
		.text("Broad")
		.attr("text-anchor", "start")
		.attr("alignment-baseline", "central")
		.attr("x", rScale(1.1) * Math.cos(1/6 * 2 * Math.PI - Math.PI/2))
		.attr("y", rScale(1.1) * Math.sin(1/6 * 2 * Math.PI - Math.PI/2))
		.attr("class", "statLabel")
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	var coneLabels = svg.selectAll(".coneLabels")
		.data(data)
		.enter()
		.append("text")
		.text("Cone3")
		.attr("text-anchor", "start")
		.attr("alignment-baseline", "central")
		.attr("x", rScale(1.1) * Math.cos(2/6 * 2 * Math.PI - Math.PI/2))
		.attr("y", rScale(1.1) * Math.sin(2/6 * 2 * Math.PI - Math.PI/2))
		.attr("class", "statLabel")
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	var shuttleLabels = svg.selectAll(".shuttleLabels")
		.data(data)
		.enter()
		.append("text")
		.text("Shuttle")
		.attr("text-anchor", "middle")
		.attr("alignment-baseline", "hanging")
		.attr("x", rScale(1.1) * Math.cos(3/6 * 2 * Math.PI - Math.PI/2))
		.attr("y", rScale(1.1) * Math.sin(3/6 * 2 * Math.PI - Math.PI/2))
		.attr("class", "statLabel")
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	var vertLabels = svg.selectAll(".vertLabels")
		.data(data)
		.enter()
		.append("text")
		.text("Vert")
		.attr("text-anchor", "end")
		.attr("alignment-baseline", "central")
		.attr("x", rScale(1.1) * Math.cos(4/6 * 2 * Math.PI - Math.PI/2))
		.attr("y", rScale(1.1) * Math.sin(4/6 * 2 * Math.PI - Math.PI/2))
		.attr("class", "statLabel")
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	var ydLabels = svg.selectAll(".ydLabels")
		.data(data)
		.enter()
		.append("text")
		.text("Yd40")
		.attr("text-anchor", "end")
		.attr("alignment-baseline", "central")
		.attr("x", rScale(1.1) * Math.cos(5/6 * 2 * Math.PI - Math.PI/2))
		.attr("y", rScale(1.1) * Math.sin(5/6 * 2 * Math.PI - Math.PI/2))
		.attr("class", "statLabel")
		.attr("transform", function(d, i) {
			return "translate(" + (gridwidth * cellPosition[i][1] + gridwidth/2) + 
				"," + (gridheight * cellPosition[i][0] + gridheight/2) + ")"
		});

	svg.append("svg:image")
		.attr('x', gridwidth * 2.19)
	    .attr('y', gridheight * 3.99)
	    .attr('width', 300)
	    .attr('height', 300 * 808/1159)
		.attr("xlink:href","key.png");
/**
	var key = svg.selectAll(".key")
		.data(data)
		.enter()
		.append("text")
		//.text(function(d, i) {
		//	return d["Pos"];
		//})
		.html("a" + "<br/>" + "c")
		.attr("x", 0)
		.attr("y", function(d, i) {
			return i * 15
		})
		.attr("transform", "translate(" + (gridwidth * 2.4) + 
				"," + (gridheight * 4.2) + ")");
**/
}
