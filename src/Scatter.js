import { extent, min, max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { csv, tsv } from "d3-fetch";
import { format } from "d3-format";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { mouse, select, selectAll } from "d3-selection";
import rough from "roughjs/bundled/rough.esm.js";
import Chart from "./Chart";
import { roughCeiling } from "./utils/roughCeiling";

const defaultColors = [
  "pink",
  "skyblue",
  "coral",
  "gold",
  "teal",
  "darkgreen",
  "brown",
  "slateblue",
  "orange",
];

/**
 * Scatter chart class, which extends the Chart class.
 */
class Scatter extends Chart {
  /**
   * Constructs a new Scatter instance.
   * @param {Object} opts - Configuration object for the scatter chart.
   */
  constructor(opts) {
    super(opts);

    // load in arguments from config object
    // this.data = opts.data;
    this.margin = opts.margin || { top: 50, right: 20, bottom: 50, left: 100 };
    this.colorVar = opts.colorVar;
    this.roughness = roughCeiling({ roughness: opts.roughness });
    this.highlight = opts.highlight;
    this.highlightLabel = opts.highlightLabel || "xy";
    // this.radius = opts.radius || 8;
    this.radiusExtent = opts.radiusExtent || [5, 20];
    this.radius = opts.radius || 20;
    this.axisStrokeWidth = opts.axisStrokeWidth || 0.4;
    this.axisRoughness = opts.axisRoughness || 0.9;
    this.curbZero = opts.curbZero === true;
    this.innerStrokeWidth = opts.innerStrokeWidth || 1;
    this.stroke = opts.stroke || "black";
    this.fillWeight = opts.fillWeight || 0.85;
    this.colors = opts.colors || defaultColors;
    this.strokeWidth = opts.strokeWidth || 1;
    this.axisFontSize = opts.axisFontSize;
    this.x = this.dataFormat === "object" ? "x" : opts.x;
    this.y = this.dataFormat === "object" ? "y" : opts.y;
    this.xValueFormat = opts.xValueFormat;
    this.yValueFormat = opts.yValueFormat;
    this.xLabel = opts.xLabel || "";
    this.yLabel = opts.yLabel || "";
    this.labelFontSize = opts.labelFontSize || "1rem";
    this.responsive = true;
    this.boundRedraw = this.redraw.bind(this, opts);
    this.radiusScale;
    // new width
    this.initChartValues(opts);
    // resolve font
    this.resolveFont();
    // create the chart
    this.drawChart = this.resolveData(opts.data);
    this.drawChart();
    if (opts.title !== "undefined") this.setTitle(opts.title);
    window.addEventListener("resize", this.resizeHandler.bind(this));
  }

  /**
   * Handles window resize to redraw chart if responsive.
   */
  resizeHandler() {
    if (this.responsive) {
      this.boundRedraw();
    }
  }

  /**
   * Removes SVG elements and tooltips associated with the chart.
   */
  remove() {
    select(this.el).select("svg").remove();
  }

  /**
   * Redraws the bar chart with updated options.
   * @param {Object} opts - Updated configuration object for the bar chart.
   */
  redraw(opts) {
    // 1. Remove the current SVG associated with the chart.
    this.remove();

    // 2. Recalculate the size of the container.
    this.initChartValues(opts);

    // 3. Redraw everything.
    this.resolveFont();
    this.drawChart = this.resolveData(opts.data);
    this.drawChart();

    // if (opts.title !== "undefined") {
    //   this.setTitle(opts.title);
    // }
  }

  /**
   * Initialize the chart with default attributes.
   * @param {Object} opts - Configuration object for the chart.
   */
  initChartValues(opts) {
    this.roughness = opts.roughness || this.roughness;
    this.stroke = opts.stroke || this.stroke;
    this.strokeWidth = opts.strokeWidth || this.strokeWidth;
    this.axisStrokeWidth = opts.axisStrokeWidth || this.axisStrokeWidth;
    this.axisRoughness = opts.axisRoughness || this.axisRoughness;
    this.innerStrokeWidth = opts.innerStrokeWidth || this.innerStrokeWidth;
    this.fillWeight = opts.fillWeight || this.fillWeight;
    this.fillStyle = opts.fillStyle || this.fillStyle;
    this.colors = opts.colors || this.colors;
    const divDimensions = select(this.el).node().getBoundingClientRect();
    const width = divDimensions.width;
    const height = divDimensions.height;
    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;
    this.roughId = this.el + "_svg";
    this.graphClass = this.el.substring(1, this.el.length);
    this.interactionG = "g." + this.graphClass;
    this.setSvg();
  }

  // add this to abstract base
  resolveData(data) {
    if (typeof data === "string") {
      if (data.includes(".csv")) {
        return () => {
          csv(data).then((d) => {
            this.data = d;
            this.drawFromFile();
          });
        };
      } else if (data.includes(".tsv")) {
        return () => {
          tsv(data).then((d) => {
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

  addScaleLine() {
    let dataExtent;
    if (this.dataFormat !== "file") {
      dataExtent = allDataExtent(this.data);
    } else {
      const extents = this.dataSources.map((key) =>
        extent(this.data, (d) => +d[key])
      );
      const dataMin = min(extents, (d) => d[0]);
      const dataMax = max(extents, (d) => d[1]);
      dataExtent = [dataMin, dataMax];
    }
    // get value domains and pad axes by 5%
    // if this.x is undefined, use index for x
    let xExtent;
    if (this.x === undefined) {
      // get length of longest array
      const keys = Object.keys(this.data);
      const lengths = keys.map((key) => this.data[key].length);
      const maxLen = max(lengths);
      // Need to make xScale, when this.x is given, ordinal.
      xExtent =
        this.dataFormat === "file" ? [0, this.data.length] : [0, maxLen];
    } else {
      xExtent = extent(this.x);
    }

    const yExtent = dataExtent;

    const yRange = yExtent[1] - yExtent[0];

    this.xScale =
      this.x === undefined
        ? scalePoint()
            .range([0, this.width])
            .domain([...Array(xExtent[1]).keys()])
        : scalePoint().range([0, this.width]).domain(this.x);

    this.yScale = scaleLinear()
      .range([this.height, 0])
      .domain([0, yExtent[1] + yRange * 0.05]);
  }

  addScales() {
    // get value domains and pad axes by 5%
    const xExtent =
      this.dataFormat === "file"
        ? extent(this.data, (d) => +d[this.x])
        : extent(this.data[this.x]);
    const xRange = xExtent[1] - xExtent[0];
    const yExtent =
      this.dataFormat === "file"
        ? extent(this.data, (d) => +d[this.y])
        : extent(this.data[this.y]);
    const yRange = yExtent[1] - yExtent[0];
    // todo: why use xRange?
    // todo: why use yRange?

    const colorExtent =
      this.dataFormat === "file"
        ? extent(this.data, (d) => d[this.colorVar])
        : [1, 1];

    if (this.dataFormat === "file") {
      const radiusExtent = extent(this.data, (d) => +d[this.radius]);
      const radiusMax = Math.min(this.width, this.height) / 2 / 2;
      this.radiusScale = scaleLinear()
        .range([8, radiusMax])
        .domain(radiusExtent);
    } else {
      this.radiusScale = scaleLinear()
        .domain([0, 20])
        .range([this.radiusExtent[0], this.radiusExtent[1]]);
    }

    // force zero baseline if all data is positive
    if (this.curbZero === true) {
      if (yExtent[0] > 0) {
        yExtent[0] = 0;
      }
      if (xExtent[0] > 0) {
        xExtent[0] = 0;
      }
    }

    this.xScale = scaleLinear()
      .range([0, this.width])
      .domain([xExtent[0] - xRange * 0.05, xExtent[1] + xRange * 0.05]);

    this.yScale = scaleLinear()
      .range([this.height, 0])
      .domain([yExtent[0] - yRange * 0.05, yExtent[1] + yRange * 0.05]);

    this.colorScale = scaleOrdinal().range(this.colors).domain(colorExtent);
  }

  /**
   * Create x and y labels for chart.
   */
  addLabels() {
    // xLabel
    if (this.xLabel !== "") {
      this.svg
        .append("text")
        .attr("x", this.width / 2)
        .attr("y", this.height + this.margin.bottom / 1.3)
        .attr("dx", "1em")
        .attr("class", "labelText")
        .style("text-anchor", "middle")
        .style("font-family", this.fontFamily)
        .style("font-size", this.labelFontSize)
        .text(this.xLabel);
    }
    // yLabel
    if (this.yLabel !== "") {
      this.svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - this.margin.left / 2)
        .attr("x", 0 - this.height / 2)
        .attr("dy", "1em")
        .attr("class", "labelText")
        .style("text-anchor", "middle")
        .style("font-family", this.fontFamily)
        .style("font-size", this.labelFontSize)
        .text(this.yLabel);
    }
  }

  /**
   * Create x and y axes for chart.
   */
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
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(xAxis)
      .attr("class", `xAxis${this.graphClass}`)
      .selectAll("text")
      .attr("transform", "translate(-10, 0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-family", this.fontFamily)
      .style(
        "font-size",
        this.axisFontSize === undefined
          ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem`
          : this.axisFontSize
      );

    // y-axis
    this.svg
      .append("g")
      .call(yAxis)
      .attr("class", `yAxis${this.graphClass}`)
      .selectAll("text")
      .style("font-family", this.fontFamily)
      .style(
        "font-size",
        this.axisFontSize === undefined
          ? `${Math.min(0.95, Math.min(this.width, this.height) / 140)}rem`
          : this.axisFontSize
      );

    // hide original axes
    selectAll("path.domain").attr("stroke", "transparent");

    selectAll("g.tick").style("opacity", 1);
  }

  makeAxesRough(roughSvg, rcAxis) {
    const xAxisClass = `xAxis${this.graphClass}`;
    const yAxisClass = `yAxis${this.graphClass}`;
    const roughXAxisClass = `rough-${xAxisClass}`;
    const roughYAxisClass = `rough-${yAxisClass}`;

    select(`.${xAxisClass}`)
      .selectAll("path.domain")
      .each(function (d, i) {
        const pathD = select(this).node().getAttribute("d");
        const roughXAxis = rcAxis.path(pathD, {
          stroke: "black",
          fillStyle: "hachure",
        });
        roughXAxis.setAttribute("class", roughXAxisClass);
        roughSvg.appendChild(roughXAxis);
      });
    selectAll(`.${roughXAxisClass}`).attr(
      "transform",
      `translate(0, ${this.height})`
    );

    select(`.${yAxisClass}`)
      .selectAll("path.domain")
      .each(function (d, i) {
        const pathD = select(this).node().getAttribute("d");
        const roughYAxis = rcAxis.path(pathD, {
          stroke: "black",
          fillStyle: "hachure",
        });
        roughYAxis.setAttribute("class", roughYAxisClass);
        roughSvg.appendChild(roughYAxis);
      });
  }

  /**
   * Set the chart title with the given title.
   * @param {string} title - The title for the chart.
   */
  setTitle(title) {
    this.svg
      .append("text")
      .attr("x", this.width / 2)
      .attr("y", 0 - this.margin.top / 2)
      .attr("text-anchor", "middle")
      .style(
        "font-size",
        this.titleFontSize === undefined
          ? `${Math.min(20, Math.min(this.width, this.height) / 4)}px`
          : this.titleFontSize
      )
      .style("font-family", this.fontFamily)
      .style("opacity", 0.8)
      .text(title);
  }

  /**
   * Add interaction elements to chart.
   */
  addInteraction() {
    // const that = this;
    // add highlight helper dom nodes
    const circles = selectAll(this.interactionG)
      .data(this.dataFormat === "file" ? this.data : this.data.x)
      .append("circle")
      .attr("cx", (d, i) => {
        // return 5;
        return this.dataFormat === "file"
          ? this.xScale(+d[this.x])
          : this.xScale(+this.data[this.x][i]);
      })
      .attr("cy", (d, i) => {
        return this.dataFormat === "file"
          ? this.yScale(+d[this.y])
          : this.yScale(+this.data[this.y][i]);
      });

    if (this.dataFormat === "file") {
      circles
        .attr("r", (d) =>
          typeof this.radius === "number"
            ? this.radius * 0.7
            : this.radiusScale(+d[this.radius]) * 0.6
        )
        .attr("fill", "transparent");
    } else {
      circles
        .attr("r", (d, i) => {
          const nodeRadius = this.data[this.radius][i];
          return typeof this.radius === "number"
            ? this.radius * 0.7
            : this.radiusScale(nodeRadius);
        })
        .attr("fill", "transparent");
    }

    // create tooltip
    let Tooltip = select(this.el)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "3px")
      .style("font-family", this.fontFamily)
      .style("font-size", this.tooltipFontSize)
      .style("pointer-events", "none");

    // event functions
    let mouseover = function (d) {
      Tooltip.style("opacity", 1);
    };

    const that = this;
    let thisColor;

    let mousemove = function (d) {
      const attrX = select(this).attr("attrX");
      const attrY = select(this).attr("attrY");
      const attrHighlightLabel = select(this).attr("attrHighlightLabel");
      const mousePos = mouse(this);
      // get size of enclosing div
      Tooltip.html(
        that.highlightLabel === "xy"
          ? `<b>x</b>: ${attrX} <br><b>y</b>: ${attrY}`
          : `<b>${attrHighlightLabel}</b>`
      )
        .attr("class", function (d) {})
        .style(
          "transform",
          `translate(${mousePos[0] + that.margin.left}px, 
          ${
            mousePos[1] -
            (that.height + that.margin.top + that.margin.bottom / 2)
          }px)`
        );
    };
    let mouseleave = function (d) {
      Tooltip.style("opacity", 0);
    };

    // d3 event handlers
    selectAll(this.interactionG).on("mouseover", function () {
      mouseover();
      thisColor = select(this).selectAll("path").style("stroke");
      that.highlight === undefined
        ? select(this).selectAll("path:nth-child(1)").style("opacity", 0.4)
        : select(this)
            .selectAll("path:nth-child(1)")
            .style("stroke", that.highlight);
      select(this)
        .selectAll("path:nth-child(2)")
        .style("stroke-width", that.strokeWidth + 1.2);
    });

    selectAll(this.interactionG).on("mouseout", function () {
      mouseleave();
      select(this).selectAll("path").style("opacity", 1);

      select(this).selectAll("path:nth-child(1)").style("stroke", thisColor);
      // highlight stroke back to its color
      select(this).selectAll("path:nth-child(2)").style("stroke", that.stroke);
      select(this)
        .selectAll("path:nth-child(2)")
        .style("stroke-width", that.strokeWidth);
    });

    selectAll(this.interactionG).on("mousemove", mousemove);
  }

  /**
   * Draw rough SVG elements on chart.
   */
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
        stroke: this.stroke === "none" ? undefined : this.stroke,
        strokeWidth: this.innerStrokeWidth,
        roughness: this.roughness,
        bowing: this.bowing,
        fillStyle: this.fillStyle,
      },
    });
  }

  /**
   * Draw chart from object input.
   */
  drawFromObject() {
    const that = this;
    this.radiusScale = scaleLinear()
      .domain([0, 20])
      .range([this.radiusExtent[0], this.radiusExtent[1]]);

    let radiusScale;
    let roughnessScale;

    if (typeof this.radius === "number") {
      radiusScale = scaleLinear()
        .domain([0, 1])
        .range([this.radiusExtent[0], this.radiusExtent[1]]);
    } else {
      const dataMin = min(this.data[this.radius]);
      const dataMax = max(this.data[this.radius]);
      // Create a scale based on data's min and max values
      radiusScale = scaleLinear()
        .domain([dataMin, dataMax])
        .range([this.radiusExtent[0], this.radiusExtent[1]]);
    }

    // set default color
    if (typeof this.colors === "string") this.colors = this.colors;
    if (this.colors === undefined) this.colors = defaultColors[0];

    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);
    this.addLabels();

    // Add scatterplot
    this.data.x.forEach((d, i) => {
      const nodeRadius =
        typeof that.radius === "number"
          ? that.radius
          : radiusScale(+this.data[that.radius][i]);
      const node = this.rc.circle(
        this.xScale(+d),
        this.yScale(+this.data[this.y][i]),
        nodeRadius,
        {
          fill:
            typeof this.colors === "string"
              ? this.colors
              : this.colors.length === 1
              ? this.colors[0]
              : this.colors[i],
          simplification: this.simplification,
          fillWeight: this.fillWeight,
        }
      );
      const roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute("class", this.graphClass);
      roughNode.setAttribute("attrX", d);
      roughNode.setAttribute("attrY", this.data[this.y][i]);
      roughNode.setAttribute(
        "attrHighlightLabel",
        this.data[this.highlightLabel]
      );
    });

    selectAll(this.interactionG)
      .selectAll("path:nth-child(2)")
      .style("stroke-width", this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }
  }

  /**
   * Draw chart from file.
   */
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
      const node = this.rc.circle(
        this.xScale(+d[this.x]),
        this.yScale(+d[this.y]),
        typeof this.radius === "number"
          ? this.radius
          : this.radiusScale(+d[this.radius]),
        {
          fill:
            this.colorVar === undefined
              ? this.colors[0]
              : this.colorScale(d[this.colorVar]),
          simplification: this.simplification,
          fillWeight: this.fillWeight,
        }
      );
      const roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute("class", this.graphClass);
      roughNode.setAttribute("attrX", d[this.x]);
      roughNode.setAttribute("attrY", d[this.y]);
      roughNode.setAttribute("attrHighlightLabel", d[this.highlightLabel]);
    });

    selectAll(this.interactionG)
      .selectAll("path:nth-child(2)")
      .style("stroke-width", this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }
  }
}

export default Scatter;
