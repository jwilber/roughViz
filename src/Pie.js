import { addFontGaegu, addFontIndieFlower } from './utils/addFonts';
import { csv, tsv, json } from 'd3-fetch';
import { mouse, select, selectAll } from 'd3-selection';
import { arc, pie } from 'd3-shape';
import rough from 'roughjs/dist/rough.umd';

const roughCeiling = (roughness) => {
  let roughVal = roughness > 30 ? 30 : roughness;
  return roughVal;
};

const colors = ['coral', 'skyblue', '#66c2a5', 'tan', '#8da0cb',
  '#e78ac3', '#a6d854', '#ffd92f', 'coral', 'skyblue', 'tan', 'orange'];

class Pie {

  constructor(opts) {
    // load in arguments from config object
    this.el = opts.element;
    // this.data = opts.data;
    this.element = opts.element;
    this.margin = opts.margin || {top: 50, right: 20, bottom: 10, left: 20};
    this.title = opts.title;
    this.colors = opts.colors || colors;
    this.highlight = opts.highlight;
    this.roughness = roughCeiling(opts.roughness) || 0;
    this.strokeWidth = opts.strokeWidth || 0.75;
    this.innerStrokeWidth = opts.innerStrokeWidth || 1;
    this.fillStyle = opts.fillStyle;
    this.bowing = opts.bowing || 0;
    this.fillWeight = opts.fillWeight || 0.5;
    this.simplification = opts.simplification || 0.2;
    this.interactive = opts.interactive !== false;
    this.titleFontSize = opts.titleFontSize;
    this.tooltipFontSize = opts.tooltipFontSize || '0.95rem';
    this.font = opts.font || 0;
    this.dataFormat = (typeof opts.data === 'object') ? 'object' : 'file';
    this.labels = (this.dataFormat === 'object') ? 'labels' : opts.labels;
    this.values = (this.dataFormat === 'object') ? 'values' : opts.values;
    if (this.labels === undefined || this.values === undefined) {
      console.log(`Error for ${this.el}: Must include labels and values when \
       instantiating Donut chart. Skipping chart.`);
      return;
    }
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
    this.radius = Math.min(this.width, this.height) / 2;
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
    // if data from file, read in
    // else if data from json object, read in
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
            console.log(d);
            this.data = d;
            this.drawFromFile();
          });
        };
      } else if (data.includes('.json')) {
        return () => {
          json(data).then((d) => {
            console.log(d);
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

  setTitle(title) {
    this.svg.append('text')
      .attr('x', (this.width / 2))
      .attr('y', 0 - (this.margin.top / 3))
      .attr('class', 'title')
      .attr('text-anchor', 'middle')
      .style('font-size', (this.titleFontSize === undefined) ?
        `${Math.min(40, Math.min(this.width, this.height) / 4)}px` :
        this.titleFontSize)
      .style('font-family', this.fontFamily)
      .style('opacity', 0.8)
      .text(title);
  }

  addInteraction() {

    selectAll(this.interactionG)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
      .data((this.dataFormat === 'object') ?
        this.makePie(this.data[this.values]) :
        this.makePie(this.data)
      )
      .append('path')
      .attr('d', this.makeArc)
      .attr('stroke-width', '0px')
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
    let thisColor;

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
                            ${mousePos[1] - that.height - that.margin.bottom}px)`);
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
          select(this).selectAll('path').style('opacity', 0.5) :
          select(this).selectAll('path').style('stroke', that.highlight);
      });

    selectAll(this.interactionG)
      .on('mouseout', function() {
        mouseleave();
        select(this).selectAll('path').style('stroke', thisColor);
        select(this).selectAll('path').style('opacity', 1);
      });

    selectAll(this.interactionG)
      .on('mousemove', mousemove);
  }

  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId);
    this.rcAxis = rough.svg(this.roughSvg, {options:
      {strokeWidth: this.strokeWidth >= 3 ? 3 : this.strokeWidth},
    });
    this.rc = rough.svg(this.roughSvg, {
      options: {
        fill: this.color,
        strokeWidth: this.innerStrokeWidth,
        roughness: this.roughness,
        bowing: this.bowing,
        fillStyle: this.fillStyle,
      },
    });
  }

  drawFromObject() {
    this.initRoughObjects();

    this.makePie = pie();

    this.makeArc = arc()
      .innerRadius(0)
      .outerRadius(this.radius);

    this.arcs = this.makePie(this.data[this.values]);

    this.arcs.forEach((d, i) => {
      let node = this.rc.arc(
        this.width / 2, // x
        this.height / 2, // y
        2 * this.radius, // width
        2 * this.radius, // height
        d.startAngle - Math.PI / 2, // start
        d.endAngle - Math.PI / 2, // stop
        true, {
          fill: this.colors[i],
          stroke: this.colors[i],
        });
      node.setAttribute('class', this.graphClass);
      let roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute('attrY', this.data[this.values][i]);
      roughNode.setAttribute('attrX', this.data[this.labels][i]);
    });

    selectAll(this.interactionG).selectAll('path:nth-child(2)')
      .style('stroke-width', this.strokeWidth);

    // Add interactivity
    this.addInteraction();
  }

  drawFromFile() {
    this.initRoughObjects();

    this.makePie = pie()
      .value(d => d[this.values])
      .sort(null);

    this.makeArc = arc()
      .innerRadius(0)
      .outerRadius(this.radius);

    this.arcs = this.makePie(this.data);

    this.arcs.forEach((d, i) => {
      // let c = this.makeArc.centroid(d);
      let node = this.rc.arc(
        this.width / 2, // x
        this.height / 2, // y
        2 * this.radius, // width
        2 * this.radius, // height
        d.startAngle - Math.PI / 2, // start
        d.endAngle - Math.PI / 2, // stop
        true, {
          fill: this.colors[i],
          stroke: this.colors[i],
        });
      node.setAttribute('class', this.graphClass);
      let roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute('attrY', d.data[this.values]);
      roughNode.setAttribute('attrX', d.data[this.labels]);
    });


    selectAll(this.interactionG).selectAll('path:nth-child(2)')
      .style('stroke-width', this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }

  } // draw

}

export default Pie;
