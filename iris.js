d3.csv("http://localhost:8000/iris.csv", function (err, data) {
	if (!err)
		handleData(data);
});

function handleData(data) {
	var 	w = 250,
		h = 250,
		padding = {
			top: 20,
			right: 40,
			bottom: 50,
			left: 40
		};

	var xScale = d3.scale.linear()
		.domain([0, 
			d3.max(data, 
			function (d) {
				return Math.max(d.sepalLength, d.petalLength);
			})])
		.range([padding.left, w - padding.right]);

	var yScale = d3.scale.linear()
		.domain([0, 
			d3.max(data, 
			function (d) {
				return Math.max(d.sepalWidth, d.petalWidth);
			})])
		.range([h - padding.bottom, padding.top]);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')
		.ticks(8);

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left')
		.ticks(5);

	var drawSpecies = function(svg, species, xParam, yParam, color) {
		svg.append('g').selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.filter(function (d) { return d.species === species; })
			.attr('cx', function (d) { return xScale(d[xParam]); })
			.attr('cy', function (d) { return yScale(d[yParam]);})
			.attr('r', 2)
			.style('fill', color);
	};

	var createScatterPlot = function (species) {
		var svg = d3.select('body')
		.append('svg')
		.attr('width', w)
		.attr('height', h);

		svg.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(0,' + (h - padding.bottom) + ')')
			.call(xAxis);

		svg.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(' + padding.left + ', 0)')
			.call(yAxis);

		svg.append('g')
			.attr('class', 'label')
			.append('text')
			.attr('class', 'xlabel')
			.attr('text-anchor', 'middle')
			.attr('x', w / 2)
			.attr('y', h - 10)
			.text("Length (cm)");

		svg.append('g')
			.attr('class', 'label')
			.append('text')
			.attr('class', 'xlabel')
			.attr('text-anchor', 'middle')
			.attr('x', - h / 2)
			.attr('y', 10)
			.attr('transform', 'rotate(-90)')
			.text("Width (cm)");

		drawSpecies(svg, species, "sepalLength", "sepalWidth", 'rgba(255, 0, 0, 0.7)');
		drawSpecies(svg, species, "petalLength", "petalWidth", 'rgba(204, 102, 0, 0.7)');
	};

	createScatterPlot("setosa");
	createScatterPlot("versicolor");
	createScatterPlot("virginica");
}
