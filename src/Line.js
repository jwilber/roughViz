import { bisect, bisector, extent, max, min, range } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { csv, tsv } from 'd3-fetch';
import { addFontGaegu, addFontIndieFlower } from './utils/addFonts';
import { addLegend } from './utils/addLegend';
import { scaleLinear, scalePoint } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import { line } from 'd3-shape';
import rough from 'roughjs/dist/rough.umd';
import { colors } from './utils/colors';

// linechart will use index for x, value for label
console.log('range', range(0, 5))
const roughCeiling = (roughness) => {
  let roughVal = roughness > 20 ? 20 : roughness;
  return roughVal;
};

function scalePointPosition(it) {
    var xPos = mouse(it)[0];
    var domain = this.xScale.domain(); 
    var range = this.xScale.range();
    var rangePoints = range(range[0], range[1], it.xScale.step())
    var yPos = domain[bisect(rangePoints, xPos) -1];
    console.log(yPos);
    return yPos
}

const allDataExtent = (data) => {
  // get extend for all keys in data
  const keys = Object.keys(data);
  const extents = keys.map(key => extent(data[key]));
  const dataMin = min(extents, d => d[0]);
  const dataMax = max(extents, d => d[1]);
  return [dataMin, dataMax];
};

class Line {
  constructor(opts) {
    // load in arguments from config object
    this.el = opts.element;
    // this.data = opts.data;
    this.element = opts.element;
    this.margin = opts.margin || {top: 50, right: 20, bottom: 50, left: 100};
    this.title = opts.title;
    this.colorVar = opts.colorVar;
    this.roughness = roughCeiling(opts.roughness) || 2.2;
    this.highlight = opts.highlight;
    this.highlightLabel = opts.highlightLabel || 'xy';
    this.fillStyle = opts.fillStyle;
    this.bowing = opts.bowing || 0;
    this.axisStrokeWidth = opts.axisStrokeWidth || 0.4;
    this.axesRoughness = opts.axesRoughness || 0.9;
    this.interactive = opts.interactive !== false;
    this.stroke = opts.stroke || 'black';
    this.fillWeight = opts.fillWeight || 0.85;
    this.simplification = opts.simplification || 0.2;
    this.colors = opts.colors;
    this.strokeWidth = opts.strokeWidth || 8;
    this.titleFontSize = opts.titleFontSize;
    this.axesFontSize = opts.axesFontSize;
    this.tooltipFontSize = opts.tooltipFontSize || '0.95rem';
    this.font = opts.font || 0;
    this.dataFormat = (typeof opts.data === 'object') ? 'object' : 'file';
    this.x = opts.x;
    this.y = (this.dataFormat === 'object') ? 'y' : opts.y;
    this.legend = opts.legend !== false;
    this.legendPosition = opts.legendPosition || 'right';
    if (this.dataFormat === 'file') {
      this.dataSources = [];
      this.yKeys = Object.keys(opts).filter((name) => /y/.test(name));
      this.yKeys.map((key, i) => {
        this.dataSources.push(opts[key]);
      })
    };
    // new width
    this.initChartValues(opts);
    // resolve font
    this.resolveFont();
    // create the chart
    this.drawChart = this.resolveData(opts.data);
    this.drawChart();
    if (opts.title !== 'undefined') this.setTitle(opts.title);
  }

  resolveFont() {
    if (
      this.font === 0 ||
      this.font === undefined ||
      this.font.toString().toLowerCase() === 'gaegu'
    ) {
      addFontGaegu(this.svg);
      this.fontFamily = 'gaeguregular';
    } else if (
      this.font === 1 ||
        this.font.toString().toLowerCase() === 'indie flower'
    ){
      addFontIndieFlower(this.svg);
      this.fontFamily = 'indie_flowerregular';
    } else {
      this.fontFamily = this.font;
    }
  }

  initChartValues(opts) {
    let width = opts.width ? opts.width : 300;
    let height = opts.height ? opts.height : 400;
    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;
    this.roughId = this.el + '_svg';
    this.graphClass = this.el.substring(1, this.el.length);
    this.interactionG = 'g.' + this.graphClass;
    this.setSvg();
  }

  setSvg() {
    this.svg = select(this.el)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('id', this.roughId)
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  // add this to abstract base
  resolveData(data) {
    if (typeof data === 'string') {
      if (data.includes('.csv')) {
        return () => {
          csv(data).then(d => {
            this.data = d;
            this.drawFromFile();
          });
        };
      } else if (data.includes('.tsv')) {
        return () => {
          tsv(data).then(d => {
            this.data = d;
            this.drawFromFile();
          });
        };
      }
    } else {
      return () => {
        this.data = data;
        this.drawFromObject();
      };
    }
  }

  addScales() {
    let dataExtent;
    if (this.dataFormat !== 'file') {
      dataExtent = allDataExtent(this.data);
    } else {
      const extents= this.dataSources.map(key => extent(this.data, d => +d[key]))
      const dataMin = min(extents, d=> d[0]);
      const dataMax = max(extents, d=> d[1]);
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
      xExtent = this.dataFormat === 'file' ?
        extent(this.data, d => +d[this.x]) :
        extent(this.x);
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


  addAxes() {
    // x-axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(axisBottom(this.xScale).tickSize(0))
      .attr('class', `xAxis${this.graphClass}`)
      .selectAll('text')
      .attr('transform', 'translate(-10, 0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-family', this.fontFamily)
      .style('font-size', (this.axesFontSize === undefined) ?
        `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` :
        this.axesFontSize);

    // y-axis
    this.svg.append('g')
      .call(axisLeft(this.yScale).tickSize(0))
      .attr('class', `yAxis${this.graphClass}`)
      .selectAll('text')
      .style('font-family', this.fontFamily)
      .style('font-size', (this.axesFontSize === undefined) ?
        `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` :
        this.axesFontSize);

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

  setTitle(title) {
    this.svg.append('text')
      .attr('x', (this.width / 2))
      .attr('y', 0 - (this.margin.top / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', (this.titleFontSize === undefined) ?
        `${Math.min(20, Math.min(this.width, this.height) / 4)}px` :
        this.titleFontSize)
      .style('font-family', this.fontFamily)
      .style('opacity', 0.8)
      .text(title);
  }

  addInteraction() {
    const that = this;
    this.graphPart = this.svg.append('g')
      .attr('pointer-events', 'all');

    let dataPoints = this.dataFormat === 'file' ?
      this.dataSources :
      Object.keys(this.data);

    console.log('dataPoints', dataPoints)

    this.dataSources.map((key, idx) => {
      let currData = this.dataFormat === 'file' ?
        this.data :
        this.data[key];
      const points = currData.map((d, i) => {
        return [this.xScale(i), this.yScale(d[key])];
      });
      var line2 = line()
        .x(function(d, i) { 
          return d[0]; 
        }) // set the x values for the line generator
        .y(function(d) { return d[1] }); // set the y values for the line generator 

        // create lines
        this.svg
          .append("path")
          .datum(points)
          .attr('fill', 'none')
          .attr("stroke", "blue")
          .attr("stroke-width", 1.5)
          .attr("d", line2)
          .attr('visibility', 'hidden');

        // create tracking class (for interaction)
        const iClass = key + 'class';

        // create hover circle
        this.svg
          .append('g')
          .attr('class', iClass)
          .append('circle')
            .attr("fill", "red")
            // .attr("stroke", "black")
            .attr('r', 2.5)
            .style("opacity", 0)

        // create hover text
        this.svg
          .append('g')
          .attr('class', iClass + 'text')
          .append('text') 
            .style('font-size', '.8rem')
            .style("opacity", 0)
            .style('font-family', this.fontFamily)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")

    });

    var mousemove = function(d) {

    // recover coordinate we need
      var xPos = mouse(this)[0];
      var domain = that.xScale.domain(); 
      var xRange = that.xScale.range();
      var rangePoints = range(xRange[0], xRange[1] + 1, that.xScale.step())
      var xSpot = bisect(rangePoints, xPos) - 1;
      var yPos = domain[xSpot];
      // var ddata = that.data[yPos];

      let mousePos = mouse(this);
      that.dataSources.map((key, i) => {
        var ddata = that.dataFormat === 'file' ?
          that.data[yPos] :
          that.data[key][xSpot];
        // resolve select classes for hover effects
        const thatClass = '.' + key + 'class';
        const textClass = thatClass + 'text';


        select(thatClass).selectAll('circle')
          .style('opacity', 1)
          .attr("cx", that.xScale(xSpot))
          .attr("cy", that.dataFormat === 'file' ?
            that.yScale(ddata[key]) :
            that.yScale(ddata));

        select(textClass).selectAll('text')
          .style('opacity', 1)
          .html(that.dataFormat === 'file' ?
            `(${xSpot},${ddata[key]})` :
            `(${xSpot},${ddata})`)
          .attr("x", that.dataFormat === 'file' ?
            that.xScale(xSpot) :
            that.xScale(that.x[xSpot]))
          .attr("y", that.dataFormat === 'file' ?
            that.yScale(ddata[key]) - 5 :
            that.yScale(ddata));
      })
    };


    this.graphPart.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'none')
      // .attr('stroke', 'black')
      .on('mouseover', () => {
      })
      .on('mousemove', mousemove)
      .on('mouseout', () => {
        that.dataSources.map((key) => {
          const thatClass = '.' + key + 'class';
          const textClass = thatClass + 'text';
          select(thatClass).selectAll('circle')
            .style('opacity', 0);
          select(textClass).selectAll('text')
            .style('opacity', 0);
        });
      })

  }

  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId);
    this.rcAxis = rough.svg(this.roughSvg,
      {options: {
        strokeWidth: this.axisStrokeWidth,
        roughness: this.axesRoughness,
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
    // set default color
    if (this.colors === undefined) this.colors = colors;

    this.dataSources = Object.keys(this.data);
    this.initRoughObjects();
    this.addScales();

    this.dataSources.map((key, i) => {
      const points = this.data[key].map((d, idx) => {
        return this.x === undefined ?
          [this.xScale(idx), this.yScale(+d)] :
          [this.xScale(this.x[idx]), this.yScale(d)];
      });

      // remove undefined elements so no odd behavior
      const drawPoints = points.filter(d => d[0] !== undefined);

      let node = this.rc.curve(drawPoints, {
        stroke: this.colors.length === 1 ? this.colors[0] : this.colors[i],
        roughness: this.roughness,
        bowing: this.bowing,
        fillStyle: 'hachure',
      });

      let roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute('class', this.graphClass);
      // roughNode.setAttribute('attrX', d[this.x]);
      // roughNode.setAttribute('attrY', d[this.y]);
      // roughNode.setAttribute('attrHighlightLabel', d[this.highlightLabel]);
    });
    // // If desired, add interactivity
    // if (this.interactive === true) {
    //   this.addInteraction();
    // }

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
    // END ADD LEGEND
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);

    this.addInteraction()
  }

  drawFromFile() {

    // this.graphPart = this.svg.append('g')
    //   .attr('pointer-events', 'all');

    // set default colors
    if (this.colors === undefined) this.colors = colors;

    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);

    // Add scatterplot
    this.dataSources.map((key, idx) => {
      const points = this.data.map((d, i) => {
        // console.log('d', d)
        return [this.xScale(i), this.yScale(d[key])];
      });
      let node = this.rc.curve(points, {
        stroke: this.colors[idx],
        strokeWidth: this.strokeWidth,
        roughness: 1,
        bowing: 10,
        fillStyle: 'hachure',
      });

      let roughNode = this.roughSvg.appendChild(node);
      // roughNode.setAttribute('class', this.graphClass);
      // roughNode.setAttribute('attrX', this.data[this.x]);
      // roughNode.setAttribute('attrY', this.data[this['y']]);
      // roughNode.setAttribute('attrHighlightLabel', this.data[this.highlightLabel]);
      // add scatter plots for hover
      points.forEach((d,i) => {
        let node = this.rc.circle(
          d[0],
          d[1],
          10, {
            stroke: this.colors[idx],
            fill: this.colors[idx],
            fillStyle: 'solid',
            strokeWidth: 1,
            roughness: 3,
          });
        this.roughSvg.appendChild(node);
        })
    })

    // let roughNode = this.roughSvg.appendChild(node);
    // roughNode.setAttribute('class', this.graphClass);
    // roughNode.setAttribute('attrX', this.data[this.x]);
    // roughNode.setAttribute('attrY', this.data[this['y']]);
    // roughNode.setAttribute('attrHighlightLabel', this.data[this.highlightLabel]);


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

    this.addInteraction()
  }

}

export default Line;

// give xScale
// if x not supplied, default to indices
// if supplied, only go as far as the x domain

// allow multiple for file inputs

// if multiple entries, get the max from all of them

// apply color to multiple

// get all y names with regex
// create legend using them
