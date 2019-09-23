import { addFontGaegu, addFontIndieFlower } from './utils/addFonts';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { csv, tsv } from 'd3-fetch';
import { scaleBand, scaleLinear } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import rough from 'roughjs/dist/rough.umd';

const roughCeiling = (roughness) => {
  let roughVal = roughness > 20 ? 20 : roughness;
  return roughVal;
};


class Bar {
  constructor(opts) {
    // load in arguments from config object
    this.el = opts.element;
    this.data = opts.data;
    this.element = opts.element;
    this.margin = opts.margin || {top: 50, right: 20, bottom: 70, left: 100};
    this.title = opts.title;
    this.color = opts.color || 'skyblue';
    this.highlight = opts.highlight || 'coral';
    this.roughness = roughCeiling(opts.roughness) || 1;
    this.stroke = opts.stroke || 'black';
    this.strokeWidth = opts.strokeWidth || 1;
    this.axisStrokeW = opts.axisStrokeW || 0.5;
    this.axesRoughness = opts.axesRoughness || 0.5;
    this.innerStrokeWidth = opts.innerStrokeWidth || 1;
    this.fillStyle = opts.fillStyle;
    this.bowing = opts.bowing || 0;
    this.fillWeight = opts.fillWeight || 0.5;
    this.simplification = opts.simplification || 0.2;
    this.interactive = opts.interactive !== false;
    this.titleFontSize = opts.titleFontSize;
    this.axesFontSize = opts.axesFontSize;
    this.tooltipFontSize = opts.tooltipFontSize || '.95rem';
    this.font = opts.font || 0;
    this.dataFormat = (typeof opts.data === 'object') ? 'object' : 'file';
    this.labels = (this.dataFormat === 'object') ? 'labels' : opts.labels;
    this.values = (this.dataFormat === 'object') ? 'values' : opts.values;
    this.padding = opts.padding || 0.1;
    // new width
    this.initChartValues(opts);
    // resolve font
    this.resolveFont();
    // create the chart
    this.drawChart = this.resolveData(opts.data);
    this.drawChart();
    if (opts.title !== 'undefined') this.setTitle(opts.title);
  }

  initChartValues(opts) {
    let width = opts.width ? opts.width : 350;
    let height = opts.height ? opts.height : 450;
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

  // add this to abstract base
  resolveData(data) {
    if (typeof data === 'string') {
      if (data.includes('.csv')) {
        return () => {
          csv(data).then(d => {
            // console.log(d);
            this.data = d;
            this.draw();
          });
        };
      } else if (data.includes('.tsv')) {
        return () => {
          tsv(data).then(d => {
            this.data = d;
            this.draw();
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
    const that = this;

    this.xScale = scaleBand()
      .rangeRound([0, this.width])
      .padding(this.padding)
      .domain(this.dataFormat === 'file' ?
        this.data.map((d) => d[that.labels]) :
        this.data[that.labels]
      );

    this.yScale = scaleLinear()
      .rangeRound([this.height, 0])
      .domain(this.dataFormat === 'file' ?
        [0, max(this.data, d => +d[that.values])] :
        [0, max(this.data[that.values])]
      );
  }


  addAxes() {
    const xAxis = axisBottom(this.xScale)
      .tickSize(0);

    const yAxis = axisLeft(this.yScale)
      .tickSize(0);

    // x-axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis)
      .attr('class', `xAxis${this.graphClass}`)
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font-family', this.fontFamily)
      .style('font-size', (this.axesFontSize === undefined) ?
        `${Math.min(0.8, Math.min(this.width, this.height) / 140)}rem` :
        this.axesFontSize)
      .style('opacity', 0.9);

    // y-axis
    this.svg.append('g')
      .call(yAxis)
      .attr('class', `yAxis${this.graphClass}`)
      .selectAll('text')
      .style('font-family', this.fontFamily)
      .style('font-size', (this.axesFontSize === undefined) ?
        `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem` :
        this.axesFontSize)
      .style('opacity', 0.9);

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
      .attr('class', 'title')
      .attr('text-anchor', 'middle')
      .style('font-size', (this.titleFontSize === undefined) ?
        `${Math.min(40, Math.min(this.width, this.height) / 5)}px` :
        this.titleFontSize)
      .style('font-family', this.fontFamily)
      .style('opacity', 0.8)
      .text(title);
  }

  addInteraction() {

    selectAll(this.interactionG)
      .data((this.dataFormat === 'file') ?
        this.data :
        this.data.values
      )
      .append('rect')
      .attr('x', (d, i) => {
        return this.dataFormat === 'file' ?
          this.xScale(d[this.labels]) :
          this.xScale(this.data[this.labels][i]);
      })
      .attr('y', (d, i) => {
        return this.dataFormat === 'file' ?
          this.yScale(+d[this.values]) :
          this.yScale(this.data[this.values][i]);
      })
      .attr('width', this.xScale.bandwidth())
      .attr('height', (d, i) => {
        return this.dataFormat === 'file' ?
          this.height - this.yScale(+d[this.values]) :
          this.height - this.yScale(this.data[this.values][i]);
      })
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
        strokeWidth: this.axisStrokeW,
        roughness: this.axesRoughness,
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

    // Add barplot
    this.data.values.forEach((d, i) => {
      let node = this.rc.rectangle(
        this.xScale(this.data[this.labels][i]),
        this.yScale(+d),
        this.xScale.bandwidth(),
        this.height - this.yScale(+d), {
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

  draw() {
    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);

    // Add barplot
    this.data.forEach((d) => {
      let node = this.rc.rectangle(
        this.xScale(d[this.labels]),
        this.yScale(+d[this.values]),
        this.xScale.bandwidth(),
        this.height - this.yScale(+d[this.values]), {
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

export default Bar;
