import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import { colors } from './utils/colors';
import { roughCeiling } from './utils/roughCeiling';
import rough from 'roughjs/dist/rough.umd';
import get from 'lodash.get';
import Chart from './Chart';

class StackedBar extends Chart {
  constructor(opts) {
    super(opts);

    // load in arguments from config object
    this.data = opts.data;
    this.margin = opts.margin || { top: 50, right: 20, bottom: 70, left: 100 };
    this.colors = get(opts, 'colors', colors);
    this.highlight = get(opts, 'highlight', 'coral');
    this.roughness = roughCeiling({ roughness: opts.roughness });
    this.stroke = get(opts, 'stroke', 'black');
    this.strokeWidth = get(opts, 'strokeWidth', 1);
    this.axisStrokeWidth = get(opts, 'axisStrokeWidth', 0.5);
    this.axisRoughness = get(opts, 'axisRoughness', 0.5);
    this.innerStrokeWidth = get(opts, 'innerStrokeWidth', 1);
    this.fillWeight = get(opts, 'fillWeight', 0.5);
    this.axisFontSize = opts.axisFontSize;
    this.dataFormat = typeof opts.data === 'object' ? 'object' : 'file';
    this.labels = opts.labels;
    this.values = opts.values;
    this.padding = get(opts, 'padding', 0.1);
    this.xLabel = get(opts, 'xLabel', '');
    this.yLabel = get(opts, 'yLabel', '');
    this.labelFontSize = get(opts, 'labelFontSize', '1rem');
    // new width
    this.initChartValues(opts, 350, 450);
    // resolve font
    this.resolveFont();
    // create the chart
    this.drawChart = this.resolveData(opts.data, true);
    this.drawChart();
    if (opts.title !== 'undefined') this.setTitle(opts.title, { fontSizeFactor: 5 });
  }

  // Helper Method to get the Total Value of the Stack
  getTotal(d){
    for (let x = 0; x < d.length; x++) {
      let t = 0;
      for (let i = 0; i < d.columns.length; ++i) {
        if (d.columns[i] !== this.labels) {
          t += d[x][d.columns[i]] = +d[x][d.columns[i]];
        }
      }
      d[x].total = t;
    }
    return d;
  }

  addScales() {
    this.xScale = scaleBand()
      .rangeRound([0, this.width])
      .padding(this.padding)
      .domain(this.data.map(d => d[this.labels]));

    this.data.sort(function(a, b) {
      return b.total - a.total;
    });
    this.yScale = scaleLinear()
      .rangeRound([this.height, 0])
      .domain([
        0,
        max(this.data, d => {
          return d.total;
        }),
      ])
      .nice();

    // set the colors
    let keys = this.dataFormat === 'object' ? this.data.map(d => d[this.labels]) : this.data.columns;
    this.zScale = scaleOrdinal()
      .range([
        '#98abc5',
        '#8a89a6',
        '#7b6888',
        '#6b486b',
        '#a05d56',
        '#d0743c',
        '#ff8c00',
      ])
      .domain(keys);
  }

  addLabels() {
    // xLabel
    if (this.xLabel !== '') {
      this.svg
        .append('text')
        .attr('x', this.width / 2)
        .attr('y', this.height + this.margin.bottom / 2)
        .attr('dx', '1em')
        .attr('class', 'labelText')
        .style('text-anchor', 'middle')
        .style('font-family', this.fontFamily)
        .style('font-size', this.labelFontSize)
        .text(this.xLabel);
    }
    // yLabel
    if (this.yLabel !== '') {
      this.svg
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - this.margin.left / 1.4)
        .attr('x', 0 - this.height / 2)
        .attr('dy', '1em')
        .attr('class', 'labelText')
        .style('text-anchor', 'middle')
        .style('font-family', this.fontFamily)
        .style('font-size', this.labelFontSize)
        .text(this.yLabel);
    }
  }

  addAxes() {
    const xAxis = axisBottom(this.xScale).tickSize(0);

    // x-axis
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis)
      .attr('class', `xAxis${this.graphClass}`)
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-family', this.fontFamily)
      .style(
        'font-size',
        this.axisFontSize === undefined
          ? `${Math.min(0.8, Math.min(this.width, this.height) / 140)}rem`
          : this.axisFontSize
      )
      .style('opacity', 0.9);

    // y-axis
    const yAxis = axisLeft(this.yScale).tickSize(0);
    this.svg
      .append('g')
      .call(yAxis)
      .attr('class', `yAxis${this.graphClass}`)
      .selectAll('text')
      .style('font-family', this.fontFamily)
      .style(
        'font-size',
        this.axisFontSize === undefined
          ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem`
          : this.axisFontSize
      )
      .style('opacity', 0.9);

    // hide original axes
    selectAll('path.domain').attr('stroke', 'transparent');
  }

  makeAxesRough(roughSvg, rcAxis) {
    let xAxisClass = `xAxis${this.graphClass}`;
    let yAxisClass = `yAxis${this.graphClass}`;
    let roughXAxisClass = `rough-${xAxisClass}`;
    let roughYAxisClass = `rough-${yAxisClass}`;

    select(`.${xAxisClass}`)
      .selectAll('path.domain')
      .each(function(d, i) {
        let pathD = select(this)
          .node()
          .getAttribute('d');
        let roughXAxis = rcAxis.path(pathD, {
          fillStyle: 'hachure',
        });
        roughXAxis.setAttribute('class', roughXAxisClass);
        roughSvg.appendChild(roughXAxis);
      });
    selectAll(`.${roughXAxisClass}`).attr(
      'transform',
      `translate(0, ${this.height})`
    );

    select(`.${yAxisClass}`)
      .selectAll('path.domain')
      .each(function(d, i) {
        let pathD = select(this)
          .node()
          .getAttribute('d');
        let roughYAxis = rcAxis.path(pathD, {
          fillStyle: 'hachure',
        });
        roughYAxis.setAttribute('class', roughYAxisClass);
        roughSvg.appendChild(roughYAxis);
      });
  }

  addInteraction() {
    selectAll(this.interactionG)
      // .data(this.data)
      // .append('rect')
      .each(function(d, i){
        let attr = this['attributes'];
        select(this)
          .append('rect')
          .attr('x', attr['x'].value)
          .attr('y', attr['y'].value)
          .attr('width', attr['width'].value)
          .attr('height', attr['height'].value)
          .attr('fill', 'transparent');
      });

    // create tooltip
    const Tooltip = select(this.el)
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
    let mouseover = function(d) {
      Tooltip.style('opacity', 1);
    };
    let that = this;
    let thisColor;

    let mousemove = function(d) {
      let attrX = select(this).attr('attrX');
      let attrY = select(this).attr('attrY');
      let keyY = select(this).attr('keyY');
      let mousePos = mouse(this);
      // get size of enclosing div
      Tooltip.html(`<h4>${attrX}</h4> <b>${keyY}</b>: ${attrY}`)
        .style('opacity', 0.95)
        .attr('class', function(d) {})
        .style(
          'transform',
          `translate(${mousePos[0] + that.margin.left}px, 
          ${mousePos[1] -
            (that.height + that.margin.top + that.margin.bottom)}px)`
        );
    };
    let mouseleave = function(d) {
      Tooltip.style('opacity', 0);
    };

    // d3 event handlers
    selectAll(this.interactionG).on('mouseover', function() {
      mouseover();
      thisColor = select(this)
        .selectAll('path')
        .style('stroke');
      select(this)
        .select('path')
        .style('stroke', that.highlight);
      select(this)
        .selectAll('path:nth-child(2)')
        .style('stroke-width', that.strokeWidth + 1.2);
    });

    selectAll(this.interactionG).on('mouseout', function() {
      mouseleave();
      select(this)
        .select('path')
        .style('stroke', thisColor);
      select(this)
        .selectAll('path:nth-child(2)')
        .style('stroke-width', that.strokeWidth);
    });

    selectAll(this.interactionG).on('mousemove', mousemove);
  }

  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId);
    this.rcAxis = rough.svg(this.roughSvg, {
      options: {
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

  // Helper Method to create the Stack
  stacking() {
    // Add Stackedbarplot
    this.data.forEach(d => {
      let keys = Object.keys(d);
      let yStack = 0;
      keys.forEach((yValue, i) => {
        if (i > 0 && yValue !== 'total') {
          yStack += parseInt(d[yValue], 10);
          let x = this.xScale(d[this.labels]);
          let y = this.yScale(yStack);
          let width = this.xScale.bandwidth();
          let height = this.height - this.yScale(+d[yValue]);
          let node = this.rc.rectangle(
            x,
            y,
            width,
            height,
            {
              fill: this.colors[i],
              stroke: this.colors[i],
              simplification: this.simplification,
              fillWeight: this.fillWeight,
            }
          );
          let roughNode = this.roughSvg.appendChild(node);
          roughNode.setAttribute('class', this.graphClass);
          roughNode.setAttribute('attrX', d[this.labels]);
          roughNode.setAttribute('keyY', yValue);
          roughNode.setAttribute('attrY', +d[yValue]);
          // Set Attributes to access them later
          roughNode.setAttribute('x', x);
          roughNode.setAttribute('y', y);
          roughNode.setAttribute('width', width);
          roughNode.setAttribute('height', height);
        }
      });
    });
  }

  drawFromObject() {
    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);
    this.addLabels();
    // Add Stackedbarplot
    this.stacking();

    selectAll(this.interactionG)
      .selectAll('path:nth-child(2)')
      .style('stroke-width', this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }
  } // draw

  drawFromFile() {
    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);
    this.addLabels();
    // Add Stackedbar
    this.stacking();

    selectAll(this.interactionG)
      .selectAll('path:nth-child(2)')
      .style('stroke-width', this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }
  } // draw
}

export default StackedBar;
