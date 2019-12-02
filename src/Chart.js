import { csv, tsv, json } from 'd3-fetch';
import { select } from 'd3-selection';
import get from 'lodash.get';
import { addFontGaegu, addFontIndieFlower } from './utils/addFonts';

class Chart {
  constructor(opts) {
    this.el = opts.element;
    this.element = opts.element;
    this.title = opts.title;
    this.titleFontSize = opts.titleFontSize;
    this.font = get(opts, 'font', 0);
    this.fillStyle = opts.fillStyle;
    this.tooltipFontSize = get(opts, 'tooltipFontSize', '0.95rem');
    this.bowing = get(opts, 'bowing', 0);
    this.simplification = get(opts, 'simplification', 0.2);
    this.interactive = opts.interactive !== false;
  }

  initChartValues(opts, chartWidth, chartHeight, addRadius = false) {
    const width = opts.width ? opts.width : chartWidth;
    const height = opts.height ? opts.height : chartHeight;

    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;
    this.roughId = this.el + '_svg';
    this.graphClass = this.el.substring(1, this.el.length);
    this.interactionG = 'g.' + this.graphClass;

    if (addRadius) {
      this.radius = Math.min(this.width, this.height) / 2;
    };

    this.setSvg();
  }

  setSvg() {
    this.svg = select(this.el)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('id', this.roughId)
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
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
    ) {
      addFontIndieFlower(this.svg);
      this.fontFamily = 'indie_flowerregular';
    } else {
      this.fontFamily = this.font;
    }
  }

  resolveData(data, processStackedData = false) {
    // if data from file, read in
    // else if data from json object, read in
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
      } else if (data.includes('.json')) {
        return () => {
          json(data).then((d) => {
            this.data = d;
            this.drawFromFile();
          });
        };
      }
    } else {
      return () => {
        this.data = data;
        if (processStackedData) {
          for (let i = 0; i < data.length; ++i) {
            let t = 0;
            let keys = Object.keys(data[i]);
            keys.forEach(d => {
              if (d !== this.labels) {
                t += data[i][d];
                data[i].total = t;
              }
            });
          }
        };
        this.drawFromObject();
      };
    }
  }

  drawFromFile() {
    throw Error('Please implement drawFromFile()');
  }

  drawFromObject() {
    throw Error('Please implement drawFromObject()');
  }

  setTitle(title, { marginTopFactor = 2, fontSizeMin = 40, fontSizeFactor = 4 }) {
    this.svg.append('text')
      .attr('x', this.width / 2)
      .attr('y', 0 - (this.margin.top / marginTopFactor))
      .attr('class', 'title')
      .attr('text-anchor', 'middle')
      .style('font-size', (this.titleFontSize === undefined) ?
        `${Math.min(fontSizeMin, Math.min(this.width, this.height) / fontSizeFactor)}px` :
        this.titleFontSize)
      .style('font-family', this.fontFamily)
      .style('opacity', 0.8)
      .text(title);
  }
}

export default Chart;
