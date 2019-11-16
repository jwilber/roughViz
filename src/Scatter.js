import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { csv, tsv } from 'd3-fetch';
import { format } from 'd3-format';
import { addFontGaegu, addFontIndieFlower } from './utils/addFonts';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import rough from 'roughjs/dist/rough.umd';

const roughCeiling = (roughness) => {
  let roughVal = roughness > 20 ? 20 : roughness;
  return roughVal;
};

const defaultColors = ['pink', 'skyblue', 'coral', 'gold', 'teal', 'grey',
  'darkgreen', 'pink', 'brown', 'slateblue', 'grey1', 'orange'];

class Scatter {
  constructor(opts) {
    // load in arguments from config object
    this.el = opts.element;
    // this.data = opts.data;
    this.element = opts.element;
    this.margin = opts.margin || {top: 50, right: 20, bottom: 50, left: 100};
    this.title = opts.title;
    this.colorVar = opts.colorVar;
    this.roughness = roughCeiling(opts.roughness) || 1;
    this.highlight = opts.highlight;
    this.highlightLabel = opts.highlightLabel || 'xy';
    this.radius = opts.radius || 8;
    this.fillStyle = opts.fillStyle;
    this.bowing = opts.bowing || 0;
    this.axisStrokeWidth = opts.axisStrokeWidth || 0.4;
    this.axisRoughness = opts.axisRoughness || 0.9;
    this.interactive = opts.interactive !== false;
    this.curbZero = opts.curbZero === true;
    this.innerStrokeWidth = opts.innerStrokeWidth || 1;
    this.stroke = opts.stroke || 'black';
    this.fillWeight = opts.fillWeight || 0.85;
    this.simplification = opts.simplification || 0.2;
    this.colors = opts.colors;
    this.strokeWidth = opts.strokeWidth || 1;
    this.titleFontSize = opts.titleFontSize;
    this.axisFontSize = opts.axisFontSize;
    this.tooltipFontSize = opts.tooltipFontSize || '0.95rem';
    this.font = opts.font || 0;
    this.dataFormat = (typeof opts.data === 'object') ? 'object' : 'file';
    this.x = (this.dataFormat === 'object') ? 'x' : opts.x;
    this.y = (this.dataFormat === 'object') ? 'y' : opts.y;
    this.xValueFormat = opts.xValueFormat;
    this.yValueFormat = opts.yValueFormat;
    this.xLabel = opts.xLabel || '';
    this.yLabel = opts.yLabel || '';
    this.labelFontSize = opts.labelFontSize || '1rem';
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
            console.log(d);
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
    // get value domains and pad axes by 5%
    const xExtent = this.dataFormat === 'file' ?
      extent(this.data, d => +d[this.x]) :
      extent(this.data[this.x]);
    const xRange = xExtent[1] - xExtent[0];
    const yExtent = this.dataFormat === 'file' ?
      extent(this.data, d => +d[this.y]) :
      extent(this.data[this.y]);
    const yRange = yExtent[1] - yExtent[0];

    const colorExtent = this.dataFormat === 'file' ?
      extent(this.data, d => d[this.colorVar]) :
      [1, 1];

    if (this.dataFormat === 'file') {
      const radiusExtent = extent(this.data, d => +d[this.radius]);
      const radiusMax = (Math.min(this.width, this.height) / 2) / 2;
      this.radiusScale = scaleLinear()
        .range([8, radiusMax])
        .domain(radiusExtent);
    }

    // force zero baseline if all data is positive
    if (this.curbZero === true) {
      if (yExtent[0] > 0) { yExtent[0] = 0; };
      if (xExtent[0] > 0) { xExtent[0] = 0; };
    };

    this.xScale = scaleLinear()
      .range([0, this.width])
      .domain([xExtent[0] - (xRange * 0.05), xExtent[1] + (xRange * 0.05)]);

    this.yScale = scaleLinear()
      .range([this.height, 0])
      .domain([yExtent[0] - (yRange * 0.05), yExtent[1] + (yRange * 0.05)]);

    this.colorScale = scaleOrdinal()
      .range(this.colors)
      .domain(colorExtent);
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
      .tickFormat((d) => { return this.xValueFormat ? format(this.xValueFormat)(d) : d; });

    const yAxis = axisLeft(this.yScale)
      .tickSize(0)
      .tickFormat((d) => { return this.yValueFormat ? format(this.yValueFormat)(d) : d; });

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

    // add highlight helper dom nodes
    const circles = selectAll(this.interactionG)
      .data((this.dataFormat === 'file') ?
        this.data :
        this.data.x
      )
      .append('circle')
      .attr('cx', (d, i) => {
        return this.dataFormat === 'file' ?
          this.xScale(+d[this.x]) :
          this.xScale(+this.data[this.x][i]);
      })
      .attr('cy', (d, i) => {
        return this.dataFormat === 'file' ?
          this.yScale(+d[this.y]) :
          this.yScale(+this.data[this.y][i]);
      });

    if (this.dataFormat === 'file') {
      circles.attr('r', d => (typeof this.radius === 'number') ? this.radius * 0.7 :
        this.radiusScale(+d[this.radius]) * 0.6)
        .attr('fill', 'transparent');
    } else {
      circles.attr('r', (d, i) => (typeof this.radius === 'number') ? this.radius * 0.7 :
        this.radius[i] * 0.6)
        .attr('fill', 'transparent');
    };

    // create tooltip
    var Tooltip = select(this.el)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '3px')
      .style('font-family', this.fontFamily)
      .style('font-size', this.tooltipFontSize)
      .style('pointer-events', 'none');

    // event functions
    var mouseover = function(d) {
      Tooltip
        .style('opacity', 1);
    };

    let that = this;
    let thisColor;

    var mousemove = function(d) {
      let attrX = select(this).attr('attrX');
      let attrY = select(this).attr('attrY');
      let attrHighlightLabel = select(this).attr('attrHighlightLabel');
      let mousePos = mouse(this);
      // get size of enclosing div
      Tooltip
        .html(that.highlightLabel === 'xy' ? `<b>x</b>: ${attrX} <br><b>y</b>: ${attrY}` :
          `<b>${attrHighlightLabel}</b>`)
        .attr('class', function(d) {
        })
        .style('transform', `translate(${mousePos[0] + that.margin.left}px, 
          ${mousePos[1] - (that.height + that.margin.top + that.margin.bottom)}px)`);
    };
    var mouseleave = function(d) {
      Tooltip
        .style('opacity', 0);
    };

    // d3 event handlers
    selectAll(this.interactionG)
      .on('mouseover', function() {
        mouseover();
        thisColor = select(this).selectAll('path').style('stroke');
        (that.highlight === undefined) ?
          select(this).selectAll('path:nth-child(1)').style('opacity', 0.4) :
          select(this).selectAll('path:nth-child(1)').style('stroke', that.highlight);
        select(this).selectAll('path:nth-child(2)')
          .style('stroke-width', that.strokeWidth + 1.2);
      });

    selectAll(this.interactionG)
      .on('mouseout', function() {
        mouseleave();
        select(this).selectAll('path').style('opacity', 1);

        select(this).selectAll('path:nth-child(1)').style('stroke', thisColor);
        // highlight stroke back to its color
        select(this).selectAll('path:nth-child(2)').style('stroke', that.stroke);
        select(this).selectAll('path:nth-child(2)')
          .style('stroke-width', that.strokeWidth);
      });

    selectAll(this.interactionG)
      .on('mousemove', mousemove);
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
        strokeWidth: this.innerStrokeWidth,
        roughness: this.roughness,
        bowing: this.bowing,
        fillStyle: this.fillStyle,
      },
    });
  }

  drawFromObject() {

    // set default color
    if (this.colors === undefined) this.colors = defaultColors[0];

    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);
    this.addLabels();

    // Add scatterplot
    this.data.x.forEach((d, i) => {
      let node = this.rc.circle(
        this.xScale(+d),
        this.yScale(+this.data[this.y][i]),
        typeof this.radius === 'number' ? this.radius :
          this.radius[i], {
          fill: typeof this.colors === 'string' ?
            this.colors :
            this.colors.length === 1 ? this.colors[0] : this.colors[i],
          simplification: this.simplification,
          fillWeight: this.fillWeight,
        });
      let roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute('class', this.graphClass);
      roughNode.setAttribute('attrX', d);
      roughNode.setAttribute('attrY', this.data[this.y][i]);
      roughNode.setAttribute('attrHighlightLabel', this.data[this.highlightLabel]);
    });

    selectAll(this.interactionG).selectAll('path:nth-child(2)')
      .style('stroke-width', this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }

  }

  drawFromFile() {

    // set default colors
    if (this.colors === undefined) this.colors = defaultColors;

    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);
    this.addLabels();

    // Add scatterplot
    this.data.forEach((d, i) => {
      let node = this.rc.circle(
        this.xScale(+d[this.x]),
        this.yScale(+d[this.y]),
        (typeof this.radius === 'number') ? this.radius :
          this.radiusScale(+d[this.radius]), {
          fill: this.colorVar === undefined ?
            this.colors[0] :
            this.colorScale(d[this.colorVar]),
          simplification: this.simplification,
          fillWeight: this.fillWeight,
        });
      let roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute('class', this.graphClass);
      roughNode.setAttribute('attrX', d[this.x]);
      roughNode.setAttribute('attrY', d[this.y]);
      roughNode.setAttribute('attrHighlightLabel', d[this.highlightLabel]);
    });

    selectAll(this.interactionG).selectAll('path:nth-child(2)')
      .style('stroke-width', this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }
  }
}

export default Scatter;
