import { extent, max, min } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { csv, tsv } from 'd3-fetch';
import { addFontGaegu, addFontIndieFlower } from './utils/addFonts';
import { scaleLinear, scalePoint } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import rough from 'roughjs/dist/rough.umd';

// linechart will use index for x, value for label

const roughCeiling = (roughness) => {
  let roughVal = roughness > 20 ? 20 : roughness;
  return roughVal;
};

const defaultColors = ['pink', 'skyblue', 'coral', 'gold', 'teal', 'grey',
  'darkgreen', 'pink', 'brown', 'slateblue', 'grey1', 'orange'];

const allDataExtent = (data) => {
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
    this.roughness = roughCeiling(opts.roughness) || 1.5;
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
    this.strokeWidth = opts.strokeWidth || 2;
    this.titleFontSize = opts.titleFontSize;
    this.axesFontSize = opts.axesFontSize;
    this.tooltipFontSize = opts.tooltipFontSize || '0.95rem';
    this.font = opts.font || 0;
    this.dataFormat = (typeof opts.data === 'object') ? 'object' : 'file';
    this.x = opts.x;
    this.y = (this.dataFormat === 'object') ? 'y' : opts.y;
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
    const dataExtent = allDataExtent(this.data);

    // get value domains and pad axes by 5%
    // if this.x is undefined, use index for x
    let xExtent;
    if (this.x === undefined) {
      // get length of longest array
      const keys = Object.keys(this.data);
      const lengths = keys.map(key => this.data[key].length);
      const maxLen = max(lengths);
      console.log('maxlen', maxLen);
      // Need to make xScale, when this.x is given, ordinal.
      xExtent = this.dataFormat === 'file' ?
        [0, this.data.length] :
        [0, maxLen];
      console.log('thisone here', xExtent)
    } else {
      xExtent = this.dataFormat === 'file' ?
        extent(this.data, d => +d[this.x]) :
        extent(this.x);
      // console.log('this.x', this.x)
      // console.log('xExtent', xExtent)
    }
    // console.log('xx', xExtent)
    // const yExtent = this.dataFormat === 'file' ?
    //   extent(this.data, d => +d[this.y]) :
    //   extent(this.data[this.y]);
    const yExtent = dataExtent;

    const yRange = yExtent[1] - yExtent[0];

    // this.xScale = scaleLinear()
    //   .range([0, this.width])
    //   .domain(xExtent);

    this.xScale = this.x === undefined ? 
      scalePoint()
        .range([0, this.width])
        .domain([...Array(xExtent[1]).keys()]) :
      scalePoint()
        .range([0, this.width])
        .domain(this.x);

      console.log('domain', this.x)

      console.log('this.xscale', this.xScale.domain())

    // console.log('1', this.xScale(1))
    const t = this.x === undefined ? 3 : 4;

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

    // add highlight helper dom nodes


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
    if (this.colors === undefined) this.colors = defaultColors;

    const dataSources = Object.keys(this.data);
    // const dataExtent = allDataExtent(this.data);
    // console.log('de', dataExtent);
    
    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);

    dataSources.map((key, i) => {
      const points = this.data[key].map((d, idx)=> {
        // console.log('d', d)
        // console.log('currentkey', key)
        // console.log('idx', idx)
        // console.log('this.x[idx]', this.x[idx])
        return this.x === undefined ?
          [this.xScale(idx), this.yScale(+d)] :
          [this.xScale(this.x[idx]), this.yScale(d)] 
      });

      // console.log('points', points)
      // remove undefined elements so no odd behavior
      const drawPoints = points.filter(d => d[0] !== undefined);

      let node = this.rc.curve(drawPoints,{
        stroke: this.colors.length === 1 ? this.colors[0] : this.colors[i],
        // strokeWidth: this.strokeWidth,
          roughness: this.roughness,
          bowing: this.bowing,
          fillStyle: 'hachure'
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

  }

  drawFromFile() {

    // set default colors
    if (this.colors === undefined) this.colors = defaultColors;

    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);

    const points = this.data.map((d,i)=>{
      return [this.xScale(i), this.yScale(+d[this.y])] 
    });

    console.log('points', points)

    let node = this.rc.curve(points,{
    stroke:'teal',
    // strokeWidth: 1,
      roughness: 1,
      bowing: 10,
      fillStyle: 'hachure'
  });

    let roughNode = this.roughSvg.appendChild(node);
    roughNode.setAttribute('class', this.graphClass);
    roughNode.setAttribute('attrX', this.data[this.x]);
    roughNode.setAttribute('attrY', this.data[this.y]);
    roughNode.setAttribute('attrHighlightLabel', this.data[this.highlightLabel]);
  }
}

export default Line;

// give xScale
// if x not supplied, default to indices
// if supplied, only go as far as the x domain

// allow multiple for file inputs

// if multiple entries, get the max from all of them

// apply color to multiple
