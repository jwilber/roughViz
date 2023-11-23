import { bisect, extent, max, min, range } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { csv, tsv } from "d3-fetch";
import { format } from "d3-format";
import { scaleLinear, scalePoint } from "d3-scale";
import { mouse, select, selectAll } from "d3-selection";
import { line } from "d3-shape";
import rough from "roughjs/bundled/rough.esm.js";
import Chart from "./Chart";
import { addLegend } from "./utils/addLegend";
import { colors } from "./utils/colors";
import { roughCeiling } from "./utils/roughCeiling";

const allDataExtent = (data) => {
  // get extend for all keys in data
  const keys = Object.keys(data);
  const extents = keys.map((key) => extent(data[key]));
  const dataMin = min(extents, (d) => d[0]);
  const dataMax = max(extents, (d) => d[1]);
  return [dataMin, dataMax];
};

/**
 * Line chart class, which extends the Chart class.
 */
class Line extends Chart {
  /**
   * Constructs a new Line instance.
   * @param {Object} opts - Configuration object for the line chart.
   */
  constructor(opts) {
    super(opts);

    // load in arguments from config object
    this.margin = opts.margin || { top: 50, right: 20, bottom: 50, left: 100 };
    this.roughness = roughCeiling({
      roughness: opts.roughness,
      defaultValue: 2.2,
    });
    this.axisStrokeWidth = opts.axisStrokeWidth || 0.5;
    this.axisRoughness = opts.axisRoughness || 0.5;
    this.stroke = opts.stroke || "black";
    this.fillWeight = opts.fillWeight || 0.5;
    this.colors = opts.colors;
    this.strokeWidth = opts.strokeWidth || 1;
    this.axisFontSize = opts.axisFontSize;
    this.x = opts.x;
    this.y = this.dataFormat === "object" ? "y" : opts.y;
    this.xValueFormat = opts.xValueFormat;
    this.yValueFormat = opts.yValueFormat;
    this.legend = opts.legend !== false;
    this.legendPosition = opts.legendPosition || "right";
    this.circle = opts.circle !== false;
    this.circleRadius = opts.circleRadius || 10;
    this.circleRoughness = roughCeiling({
      roughness: opts.circleRoughness,
      defaultValue: 2,
    });
    this.xLabel = opts.xLabel || "";
    this.yLabel = opts.yLabel || "";
    this.labelFontSize = opts.labelFontSize || "1rem";
    if (this.dataFormat === "file") {
      this.dataSources = [];
      this.yKeys = Object.keys(opts).filter((name) => /y/.test(name));
      this.yKeys.map((key, i) => {
        if (key !== "yLabel") this.dataSources.push(opts[key]);
      });
    }
    this.responsive = true;
    this.boundRedraw = this.redraw.bind(this, opts);
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

    if (opts.title !== "undefined") {
      this.setTitle(opts.title);
    }
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

  addScales() {
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
    const that = this;
    this.chartScreen = this.svg.append("g").attr("pointer-events", "all");

    this.dataSources.map((key, idx) => {
      const yValues = this.dataFormat === "file" ? this.data : this.data[key];
      const points = yValues.map((d, i) => {
        return this.x === undefined
          ? [this.xScale(i), this.yScale(d[key])]
          : [this.xScale(this.x[i]), this.yScale(+d[key])];
      });

      // remove undefined elements so no odd behavior
      const drawPoints = points.filter((d) => d[0] !== undefined);

      const lineGen = line()
        .x((d) => d[0])
        .y((d) => d[1]);

      // create lines
      this.svg
        .append("path")
        .datum(drawPoints)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 1.5)
        .attr("d", lineGen)
        .attr("visibility", "hidden");

      // create tracking class (for interaction)
      const iClass = key + "class";

      // create hover text
      this.svg
        .append("g")
        .attr("class", iClass + "text")
        .append("text")
        .style("font-size", this.tooltipFontSize)
        .style("opacity", 0)
        .style("font-family", this.fontFamily)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle");
    });

    const mousemove = function (d) {
      // recover coordinate we need
      const xPos = mouse(this)[0];
      const domain = that.xScale.domain();
      const xRange = that.xScale.range();
      const rangePoints = range(xRange[0], xRange[1] + 1, that.xScale.step());
      const xSpot = bisect(rangePoints, xPos);
      const yPos = domain[xSpot];

      that.dataSources.map((key, i) => {
        const hoverData =
          that.dataFormat === "file"
            ? that.x === undefined
              ? that.data[yPos]
              : that.data[xSpot]
            : that.data[key][xSpot];
        // resolve select classes for hover effects
        const thatClass = "." + key + "class";
        const textClass = thatClass + "text";

        if (that.dataFormat === "file") {
          select(textClass)
            .selectAll("text")
            .style("opacity", 1)
            .html(
              that.x === undefined
                ? `(${xSpot},${hoverData[key]})`
                : `(${that.x[xSpot]}, ${hoverData[key]})`
            )
            .attr(
              "x",
              that.x === undefined
                ? that.xScale(xSpot)
                : that.xScale(that.x[xSpot])
            )
            .attr("y", that.yScale(hoverData[key]) - 6);
        } else {
          select(textClass)
            .selectAll("text")
            .style("opacity", 1)
            .html(
              that.x === undefined
                ? `(${xSpot}, ${hoverData})`
                : `(${that.x[xSpot]}, ${hoverData})`
            )
            .attr(
              "x",
              that.x === undefined
                ? that.xScale(xSpot)
                : that.xScale(that.x[xSpot])
            )
            .attr("y", that.yScale(hoverData));
        }
      });
    };

    this.chartScreen
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "none")
      .on("mousemove", mousemove)
      .on("mouseout", () => {
        that.dataSources.map((key) => {
          const thatClass = "." + key + "class";
          const textClass = thatClass + "text";
          select(textClass).selectAll("text").style("opacity", 0);
        });
      });
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
        stroke: this.stroke === "none" ? undefined : this.stroke,
        strokeWidth: this.strokeWidth,
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
    // set default color
    if (this.colors === undefined) this.colors = colors;

    this.dataSources = Object.keys(this.data);
    this.initRoughObjects();
    this.addScales();
    this.dataSources.map((key, idx) => {
      const points = this.data[key].map((d, i) => {
        return this.x === undefined
          ? [this.xScale(i), this.yScale(+d)]
          : [this.xScale(this.x[i]), this.yScale(d)];
      });

      // remove undefined elements so no odd behavior
      const drawPoints = points.filter((d) => d[0] !== undefined);
      const node = this.rc.curve(drawPoints, {
        stroke: that.colors.length === 1 ? that.colors[0] : that.colors[idx],
        roughness: that.roughness,
        bowing: that.bowing,
      });

      const roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute("class", this.graphClass);
      if (this.circle === true) {
        points.forEach((d, i) => {
          const node = this.rc.circle(d[0], d[1], this.circleRadius, {
            stroke: this.colors[idx],
            fill: this.colors[idx],
            fillStyle: "solid",
            strokeWidth: 1,
            roughness: this.circleRoughness,
          });
          this.roughSvg.appendChild(node);
        });
      }
    });
    // ADD LEGEND
    const legendItems = this.dataSources.map((key, i) => ({
      color: this.colors[i],
      text: key,
    }));
    // find length of longest text item
    const legendWidth =
      legendItems.reduce(
        (pre, cur) => (pre > cur.text.length ? pre : cur.text.length),
        0
      ) *
        6 +
      35;
    const legendHeight = legendItems.length * 11 + 8;

    if (this.legend === true) {
      addLegend(this, legendItems, legendWidth, legendHeight, 2);
    }

    this.addAxes();
    this.addLabels();
    this.makeAxesRough(this.roughSvg, this.rcAxis);

    if (this.interactive === true) {
      this.addInteraction();
    }
  }

  /**
   * Draw chart from file.
   */
  drawFromFile() {
    // set default colors
    if (this.colors === undefined) this.colors = colors;

    this.initRoughObjects();
    this.addScales();

    // Add scatterplot
    this.dataSources.map((key, idx) => {
      const points = this.data.map((d, i) => {
        return this.x === undefined
          ? [this.xScale(i), this.yScale(d[key])]
          : [this.xScale(this.x[i]), this.yScale(+d[key])];
      });

      // remove undefined elements so no odd behavior
      const drawPoints = points.filter((d) => d[0] !== undefined);
      const node = this.rc.curve(drawPoints, {
        stroke: this.colors[idx],
        strokeWidth: this.strokeWidth,
        roughness: 1,
        bowing: 10,
      });

      this.roughSvg.appendChild(node);
      if (this.circle === true) {
        drawPoints.forEach((d, i) => {
          const node = this.rc.circle(d[0], d[1], this.circleRadius, {
            stroke: this.colors[idx],
            fill: this.colors[idx],
            fillStyle: "solid",
            strokeWidth: 1,
            roughness: this.circleRoughness,
          });
          this.roughSvg.appendChild(node);
        });
      }
    });

    // ADD LEGEND
    const legendItems = this.dataSources.map((key, i) => ({
      color: this.colors[i],
      text: key,
    }));
    // find length of longest text item
    const legendWidth =
      legendItems.reduce(
        (pre, cur) => (pre > cur.text.length ? pre : cur.text.length),
        0
      ) *
        6 +
      35;
    const legendHeight = legendItems.length * 11 + 8;
    if (this.legend === true) {
      addLegend(this, legendItems, legendWidth, legendHeight, 2);
    }

    this.addAxes();
    this.addLabels();
    this.makeAxesRough(this.roughSvg, this.rcAxis);

    if (this.interactive === true) {
      this.addInteraction();
    }
  }
}

export default Line;
