import { bisect, extent, max, min, range } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { addLegend } from './utils/addLegend';
import { scaleLinear, scalePoint } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import { line } from 'd3-shape';
import rough from 'roughjs/dist/rough.umd';
import { colors } from './utils/colors';
import { roughCeiling } from './utils/roughCeiling';
import get from 'lodash.get';
import Chart from './Chart';

const allDataExtent = (data) => {
  // get extend for all keys in data
  const keys = Object.keys(data);
  const extents = keys.map(key => extent(data[key]));
  const dataMin = min(extents, d => d[0]);
  const dataMax = max(extents, d => d[1]);
  return [dataMin, dataMax];
};

class Line extends Chart {
  constructor(opts) {
    super(opts);

    // load in arguments from config object
    this.margin = opts.margin || { top: 50, right: 20, bottom: 50, left: 100 };
    this.roughness = roughCeiling({ roughness: opts.roughness, defaultValue: 2.2 });
    this.axisStrokeWidth = get(opts, 'axisStrokeWidth', 0.4);
    this.axisRoughness = get(opts, 'axisRoughness', 0.9);
    this.stroke = get(opts, 'stroke', 'black');
    this.fillWeight = get(opts, 'fillWeight', 0.85);
    this.colors = get(opts, 'colors', colors);
    this.strokeWidth = get(opts, 'strokeWidth', 8);
    this.axisFontSize = opts.axisFontSize;
    this.dataFormat = (typeof opts.data === 'object') ? 'object' : 'file';
    this.x = opts.x;
    this.y = (this.dataFormat === 'object') ? 'y' : opts.y;
    this.xValueFormat = opts.xValueFormat;
    this.yValueFormat = opts.yValueFormat;
    this.legend = opts.legend !== false;
    this.legendPosition = get(opts, 'legendPosition', 'right');
    this.circle = opts.circle !== false;
    this.circleRadius = get(opts, 'circleRadius', 10);
    this.circleRoughness = roughCeiling({ roughness: opts.circleRoughness, defaultValue: 2 });
    this.xLabel = get(opts, 'xLabel', '');
    this.yLabel = get(opts, 'yLabel', '');
    this.labelFontSize = get(opts, 'labelFontSize', '1rem');
    if (this.dataFormat === 'file') {
      this.dataSources = [];
      this.yKeys = Object.keys(opts).filter((name) => /y/.test(name));
      this.yKeys.map((key, i) => {
        if (key !== 'yLabel') this.dataSources.push(opts[key]);
      });
    };
    // new width
    this.initChartValues(opts, 300, 400);
    // resolve font
    this.resolveFont();
    // create the chart
    this.drawChart = this.resolveData(opts.data);
    this.drawChart();
    if (opts.title !== 'undefined') this.setTitle(opts.title, { fontSizeMin: 20 });
  }

  addScales() {
    let dataExtent;
    if (this.dataFormat !== 'file') {
      dataExtent = allDataExtent(this.data);
    } else {
      const extents = this.dataSources.map(key => extent(this.data, d => +d[key]));
      const dataMin = min(extents, d => d[0]);
      const dataMax = max(extents, d => d[1]);
      dataExtent = [dataMin, dataMax];
    }
    // get value domains and pad axes by 5%
    // if this.x is undefined, use index for x
    let xExtent;
    if (this.x === undefined) {
      // get length of longest array
      const keys = Object.keys(this.data);
      const lengths = keys.map(key => this.data[key].length);
      const maxLen = max(lengths);
      // Need to make xScale, when this.x is given, ordinal.
      xExtent = this.dataFormat === 'file' ?
        [0, this.data.length] :
        [0, maxLen];
    } else {
      xExtent = extent(this.x);
    }

    const yExtent = dataExtent;

    const yRange = yExtent[1] - yExtent[0];

    this.xScale = this.x === undefined ?
      scalePoint()
        .range([0, this.width])
        .domain([...Array(xExtent[1]).keys()]) :
      scalePoint()
        .range([0, this.width])
        .domain(this.x);

    this.yScale = scaleLinear()
      .range([this.height, 0])
      .domain([0, yExtent[1] + (yRange * 0.05)]);
  }

  addLabels() {
    // xLabel
    if (this.xLabel !== '') {
      this.svg.append('text')
        .attr('x', this.width / 2)
        .attr('y', this.height + this.margin.bottom / 1.3)
        .attr('dx', '1em')
        .attr('class', 'labelText')
        .style('text-anchor', 'middle')
        .style('font-family', this.fontFamily)
        .style('font-size', this.labelFontSize)
        .text(this.xLabel);
    };
    // yLabel
    if (this.yLabel !== '') {
      this.svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - this.margin.left / 2)
        .attr('x', 0 - (this.height / 2))
        .attr('dy', '1em')
        .attr('class', 'labelText')
        .style('text-anchor', 'middle')
        .style('font-family', this.fontFamily)
        .style('font-size', this.labelFontSize)
        .text(this.yLabel);
    };
  }

  addAxes() {
    const xAxis = axisBottom(this.xScale)
      .tickSize(0)
      .tickFormat((d) => {
        return this.xValueFormat ? format(this.xValueFormat)(d) : d;
      });

    const yAxis = axisLeft(this.yScale)
      .tickSize(0)
      .tickFormat((d) => {
        return this.yValueFormat ? format(this.yValueFormat)(d) : d;
      });

    // x-axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis)
      .attr('class', `xAxis${this.graphClass}`)
      .selectAll('text')
      .attr('transform', 'translate(-10, 0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-family', this.fontFamily)
      .style('font-size', (this.axisFontSize === undefined) ?
        `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` :
        this.axisFontSize);

    // y-axis
    this.svg.append('g')
      .call(yAxis)
      .attr('class', `yAxis${this.graphClass}`)
      .selectAll('text')
      .style('font-family', this.fontFamily)
      .style('font-size', (this.axisFontSize === undefined) ?
        `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` :
        this.axisFontSize);

    // hide original axes
    selectAll('path.domain')
      .attr('stroke', 'transparent');

    selectAll('g.tick')
      .style('opacity', 1);
  }


  makeAxesRough(roughSvg, rcAxis) {
    let xAxisClass = `xAxis${this.graphClass}`;
    let yAxisClass = `yAxis${this.graphClass}`;
    let roughXAxisClass = `rough-${xAxisClass}`;
    let roughYAxisClass = `rough-${yAxisClass}`;

    select(`.${xAxisClass}`)
      .selectAll('path.domain').each(function(d, i) {
        let pathD = select(this).node().getAttribute('d');
        let roughXAxis = rcAxis.path(pathD, {
          stroke: 'black',
          fillStyle: 'hachure',
        });
        roughXAxis.setAttribute('class', roughXAxisClass);
        roughSvg.appendChild(roughXAxis);
      });
    selectAll(`.${roughXAxisClass}`)
      .attr('transform', `translate(0, ${this.height})`);

    select(`.${yAxisClass}`)
      .selectAll('path.domain').each(function(d, i) {
        let pathD = select(this).node().getAttribute('d');
        let roughYAxis = rcAxis.path(pathD, {
          stroke: 'black',
          fillStyle: 'hachure',
        });
        roughYAxis.setAttribute('class', roughYAxisClass);
        roughSvg.appendChild(roughYAxis);
      });
  }

  addInteraction() {
    const that = this;
    this.chartScreen = this.svg.append('g')
      .attr('pointer-events', 'all');

    this.dataSources.map((key, idx) => {
      const points = this.data[key].map((d, i) => {
        return this.x === undefined ?
          [this.xScale(i), this.yScale(d[key])] :
          [this.xScale(this.x[i]), this.yScale(+d[key])];
      });

      // remove undefined elements so no odd behavior
      const drawPoints = points.filter(d => d[0] !== undefined);

      const lineGen = line()
        .x(d => d[0])
        .y(d => d[1]);

      // create lines
      this.svg
        .append('path')
        .datum(drawPoints)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1.5)
        .attr('d', lineGen)
        .attr('visibility', 'hidden');

      // create tracking class (for interaction)
      const iClass = key + 'class';

      // create hover text
      this.svg.append('g')
        .attr('class', iClass + 'text')
        .append('text')
        .style('font-size', this.tooltipFontSize)
        .style('opacity', 0)
        .style('font-family', this.fontFamily)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle');
    });

    const mousemove = function(d) {

      // recover coordinate we need
      const xPos = mouse(this)[0];
      const domain = that.xScale.domain();
      const xRange = that.xScale.range();
      const rangePoints = range(xRange[0], xRange[1] + 1, that.xScale.step());
      const xSpot = bisect(rangePoints, xPos);
      const yPos = domain[xSpot];

      that.dataSources.map((key, i) => {
        const hoverData = that.dataFormat === 'file' ?
          that.x === undefined ? that.data[yPos] : that.data[xSpot] :
          that.data[key][xSpot];
        // resolve select classes for hover effects
        const thatClass = '.' + key + 'class';
        const textClass = thatClass + 'text';

        if (that.dataFormat === 'file') {
          select(textClass).selectAll('text')
            .style('opacity', 1)
            .html(that.x === undefined ?
              `(${xSpot},${hoverData[key]})` :
              `(${that.x[xSpot]}, ${hoverData[key]})`)
            .attr('x', that.x === undefined ?
              that.xScale(xSpot) :
              that.xScale(that.x[xSpot]))
            .attr('y', that.yScale(hoverData[key]) - 6);
        } else {
          select(textClass).selectAll('text')
            .style('opacity', 1)
            .html(that.x === undefined ?
              `(${xSpot}, ${hoverData})` :
              `(${that.x[xSpot]}, ${hoverData})`)
            .attr('x', that.x === undefined ?
              that.xScale(xSpot) :
              that.xScale(that.x[xSpot]))
            .attr('y', that.yScale(hoverData));
        }
      });
    };


    this.chartScreen.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'none')
      .on('mousemove', mousemove)
      .on('mouseout', () => {
        that.dataSources.map((key) => {
          const thatClass = '.' + key + 'class';
          const textClass = thatClass + 'text';
          select(textClass).selectAll('text')
            .style('opacity', 0);
        });
      });

  }

  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId);
    this.rcAxis = rough.svg(this.roughSvg,
      {options: {
        strokeWidth: this.axisStrokeWidth,
        roughness: this.axisRoughness,
      },
      });
    this.rc = rough.svg(this.roughSvg, {
      options: {
        // fill: this.color,
        stroke: this.stroke === 'none' ? undefined : this.stroke,
        strokeWidth: this.strokeWidth,
        roughness: this.roughness,
        bowing: this.bowing,
        fillStyle: this.fillStyle,
      },
    });
  }

  drawFromObject() {
    this.dataSources = Object.keys(this.data);
    this.initRoughObjects();
    this.addScales();
    this.dataSources.map((key, idx) => {
      const points = this.data[key].map((d, i) => {
        return this.x === undefined ?
          [this.xScale(i), this.yScale(+d)] :
          [this.xScale(this.x[i]), this.yScale(d)];
      });

      // remove undefined elements so no odd behavior
      const drawPoints = points.filter(d => d[0] !== undefined);

      let node = this.rc.curve(drawPoints, {
        stroke: this.colors.length === 1 ? this.colors[0] : this.colors[idx],
        roughness: this.roughness,
        bowing: this.bowing,
      });

      let roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute('class', this.graphClass);
      if (this.circle === true) {
        points.forEach((d, i) => {
          let node = this.rc.circle(
            d[0],
            d[1],
            this.circleRadius, {
              stroke: this.colors[idx],
              fill: this.colors[idx],
              fillStyle: 'solid',
              strokeWidth: 1,
              roughness: this.circleRoughness,
            });
          this.roughSvg.appendChild(node);
        });
      };
    });
    // ADD LEGEND
    const legendItems = this.dataSources.map((key, i) => ({
      color: this.colors[i],
      text: key,
    }));
    // find length of longest text item
    const legendWidth = legendItems.reduce(
      (pre, cur) => (pre > cur.text.length ? pre : cur.text.length),
      0,
    ) * 6 + 35;
    const legendHeight = legendItems.length * 11 + 8;

    if (this.legend === true) {
      addLegend(this, legendItems, legendWidth, legendHeight, 2);
    };

    this.addAxes();
    this.addLabels();
    this.makeAxesRough(this.roughSvg, this.rcAxis);

    if (this.interactive === true) {
      this.addInteraction();
    };
  }

  drawFromFile() {
    this.initRoughObjects();
    this.addScales();

    // Add scatterplot
    this.dataSources.map((key, idx) => {
      const points = this.data.map((d, i) => {
        return this.x === undefined ?
          [this.xScale(i), this.yScale(d[key])] :
          [this.xScale(this.x[i]), this.yScale(+d[key])];
      });

      // remove undefined elements so no odd behavior
      const drawPoints = points.filter(d => d[0] !== undefined);
      let node = this.rc.curve(drawPoints, {
        stroke: this.colors[idx],
        strokeWidth: this.strokeWidth,
        roughness: 1,
        bowing: 10,
      });

      this.roughSvg.appendChild(node);
      if (this.circle === true) {
        drawPoints.forEach((d, i) => {
          let node = this.rc.circle(
            d[0],
            d[1],
            this.circleRadius, {
              stroke: this.colors[idx],
              fill: this.colors[idx],
              fillStyle: 'solid',
              strokeWidth: 1,
              roughness: this.circleRoughness,
            });
          this.roughSvg.appendChild(node);
        });
      };
    });

    // ADD LEGEND
    const legendItems = this.dataSources.map((key, i) => ({
      color: this.colors[i],
      text: key,
    }));
    // find length of longest text item
    const legendWidth = legendItems.reduce(
      (pre, cur) => (pre > cur.text.length ? pre : cur.text.length),
      0,
    ) * 6 + 35;
    const legendHeight = legendItems.length * 11 + 8;
    if (this.legend === true) {
      addLegend(this, legendItems, legendWidth, legendHeight, 2);
    };

    this.addAxes();
    this.addLabels();
    this.makeAxesRough(this.roughSvg, this.rcAxis);

    if (this.interactive === true) {
      this.addInteraction();
    };
  }

}

export default Line;
