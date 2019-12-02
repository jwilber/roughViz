import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { scaleBand, scaleLinear } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import rough from 'roughjs/dist/rough.umd';
import get from 'lodash.get';
import { roughCeiling } from './utils/roughCeiling';
import Chart from './Chart';

class BarH extends Chart {
  constructor(opts) {
    super(opts);

    // load in arguments from config object
    // this.data = opts.data;
    this.margin = opts.margin || { top: 50, right: 20, bottom: 50, left: 100 };
    this.color = get(opts, 'color', 'skyblue');
    this.highlight = get(opts, 'highlight', 'coral');
    this.roughness = roughCeiling({ roughness: opts.roughness });
    this.stroke = get(opts, 'stroke', 'black');
    this.strokeWidth = get(opts, 'strokeWidth', 1);
    this.axisStrokeWidth = get(opts, 'axisStrokeWidth', 0.5);
    this.axisRoughness = get(opts, 'axisRoughness', 0.5);
    this.innerStrokeWidth = get(opts, 'innerStrokeWidth', 1);
    this.fillWeight = get(opts, 'fillWeight', 0.5);
    this.axisFontSize = opts.axisFontSize;
    this.dataFormat = (typeof opts.data === 'object') ? 'object' : 'file';
    this.labels = (this.dataFormat === 'object') ? 'labels' : opts.labels;
    this.values = (this.dataFormat === 'object') ? 'values' : opts.values;
    this.xValueFormat = opts.xValueFormat;
    this.yValueFormat = opts.yValueFormat;
    this.padding = get(opts, 'padding', 0.1);
    this.xLabel = get(opts, 'xLabel', '');
    this.yLabel = get(opts, 'yLabel', '');
    this.labelFontSize = get(opts, 'labelFontSize', '1rem');
    // new width
    this.initChartValues(opts, 350, 450);
    // resolve font
    this.resolveFont();
    // create the chart
    this.drawChart = this.resolveData(opts.data);
    this.drawChart();
    if (opts.title !== 'undefined') this.setTitle(opts.title, { fontSizeFactor: 5 });
  }

  addScales() {
    const that = this;
    this.yScale = scaleBand()
      .rangeRound([0, this.height])
      .padding(this.padding)
      .domain(this.dataFormat === 'file' ?
        this.data.map(d => d[that.labels]) :
        this.data[that.labels]);

    this.xScale = scaleLinear()
      .rangeRound([0, this.width])
      .domain(this.dataFormat === 'file' ?
        [0, max(this.data, d => +d[that.values])] :
        [0, max(this.data[that.values])]
      );
  }

  addLabels() {
    // xLabel
    if (this.xLabel !== '') {
      this.svg.append('text')
        .attr('x', this.width / 2)
        .attr('y', this.height + this.margin.bottom / 2.4)
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
        .attr('y', 0 - this.margin.left / 1.5)
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
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis)
      .attr('class', `xAxis${this.graphClass}`)
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-family', this.fontFamily)
      .style('font-size', (this.axisFontSize === undefined) ?
        `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` :
        this.axisFontSize)
      .style('opacity', 0.85);

    // y-axis
    this.svg.append('g')
      .call(yAxis)
      .attr('class', `yAxis${this.graphClass}`)
      .selectAll('text')
      .style('font-family', this.fontFamily)
      .style('font-size', (this.axisFontSize === undefined) ?
        `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` :
        this.axisFontSize)
      .style('opacity', 0.85);


    // hide original axes
    selectAll('path.domain')
      .attr('stroke', 'transparent');
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
    // add highlight helper dom nodes
    selectAll(this.interactionG)
      .data((this.dataFormat === 'file') ?
        this.data :
        this.data.values
      )
      .append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => {
        return this.dataFormat === 'file' ?
          this.yScale(d[this.labels]) :
          this.yScale(this.data[this.labels][i]);
      })
      .attr('width', (d, i) => {
        return this.dataFormat === 'file' ?
          this.xScale(+d[this.values]) :
          this.xScale(this.data[this.values][i]);
      })
      .attr('height', this.yScale.bandwidth())
      .attr('fill', 'transparent');


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
    var mouseover = function(d) {
      Tooltip
        .style('opacity', 1);
    };
    let that = this;

    var mousemove = function(d) {
      let attrX = select(this).attr('attrX');
      let attrY = select(this).attr('attrY');
      let mousePos = mouse(this);
      // get size of enclosing div
      Tooltip
        .html(`<b>${attrX}</b>: ${attrY}`)
        .style('opacity', 0.95)
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
        select(this).select('path').style('stroke', that.highlight);
        select(this).selectAll('path:nth-child(2)')
          .style('stroke-width', that.strokeWidth + 1.2);
      });

    selectAll(this.interactionG)
      .on('mouseout', function() {
        mouseleave();
        select(this).select('path').style('stroke', that.color);
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
        fill: this.color,
        stroke: this.stroke === 'none' ? undefined : this.stroke,
        strokeWidth: this.innerStrokeWidth,
        roughness: this.roughness,
        bowing: this.bowing,
        fillStyle: this.fillStyle,
      },
    });
  }

  drawFromObject() {
    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);
    this.addLabels();

    this.data.values.forEach((d, i) => {
      let node = this.rc.rectangle(
        0,
        this.yScale(this.data[this.labels][i]),
        this.xScale(d),
        this.yScale.bandwidth(), {
          simplification: this.simplification,
          fillWeight: this.fillWeight,
        });
      let roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute('class', this.graphClass);
      roughNode.setAttribute('attrX', this.data[this.labels][i]);
      roughNode.setAttribute('attrY', +d);
    });

    selectAll(this.interactionG).selectAll('path:nth-child(2)')
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

    // Add barplot
    this.data.forEach((d) => {
      let node = this.rc.rectangle(
        0,
        this.yScale(d[this.labels]),
        this.xScale(+d[this.values]),
        this.yScale.bandwidth(), {
          simplification: this.simplification,
          fillWeight: this.fillWeight,
        });
      let roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute('class', this.graphClass);
      roughNode.setAttribute('attrX', d[this.labels]);
      roughNode.setAttribute('attrY', +d[this.values]);
    });

    selectAll(this.interactionG).selectAll('path:nth-child(2)')
      .style('stroke-width', this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }

  } // draw

}

export default BarH;
