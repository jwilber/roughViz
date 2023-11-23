import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { csv, tsv } from "d3-fetch";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { mouse, select, selectAll } from "d3-selection";
import rough from "roughjs/bundled/rough.esm.js";
import Chart from "./Chart";
import { colors } from "./utils/colors";
import { roughCeiling } from "./utils/roughCeiling";

/**
 * StackedBar chart class, which extends the Chart class.
 */
class StackedBar extends Chart {
  /**
   * Constructs a new StackedBar instance.
   * @param {Object} opts - Configuration object for the stacked bar chart.
   */
  constructor(opts) {
    super(opts);

    // load in arguments from config object
    this.data = opts.data;
    this.margin = opts.margin || { top: 50, right: 20, bottom: 70, left: 100 };
    this.color = opts.color || "red";
    this.highlight = opts.highlight || "coral";
    this.roughness = roughCeiling({ roughness: opts.roughness });
    this.stroke = opts.stroke || "black";
    this.strokeWidth = opts.strokeWidth || 1;
    this.axisStrokeWidth = opts.axisStrokeWidth || 0.5;
    this.axisRoughness = opts.axisRoughness || 0.5;
    this.innerStrokeWidth = opts.innerStrokeWidth || 1;
    this.fillWeight = opts.fillWeight || 0.5;
    this.axisFontSize = opts.axisFontSize;
    this.labels = opts.labels;
    this.values = opts.values;
    this.stackColorMapping = {};
    this.padding = opts.padding || 0.1;
    this.xLabel = opts.xLabel || "";
    this.yLabel = opts.yLabel || "";
    this.labelFontSize = opts.labelFontSize || "1rem";
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

  // Helper Method to get the Total Value of the Stack
  getTotal(d) {
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

  updateColorMapping(label) {
    if (!this.stackColorMapping[label]) {
      // If there isn't a color already mapped to the label then use the next color available
      this.stackColorMapping[label] =
        colors[Object.keys(this.stackColorMapping).length];
    }
  }

  // add this to abstract base
  resolveData(data) {
    if (typeof data === "string") {
      if (data.includes(".csv")) {
        return () => {
          csv(data).then((d) => {
            this.getTotal(d);
            this.data = d;
            this.drawFromFile();
          });
        };
      } else if (data.includes(".tsv")) {
        return () => {
          tsv(data).then((d) => {
            this.getTotal(d);
            this.data = d;
            this.drawFromFile();
          });
        };
      }
    } else {
      return () => {
        this.data = data;

        // reset total key (need in case resize)
        data = data.map((d) => {
          if (Object.keys(d).includes("total")) {
            d["total"] = 0;
          }
          return d;
        });

        for (let i = 0; i < data.length; ++i) {
          let t = 0;
          const keys = Object.keys(data[i]);
          keys.forEach((d) => {
            if (d !== this.labels && d !== "total") {
              // exclude "total" key from accumulating
              this.updateColorMapping(d);
              t += data[i][d];
            }
          });
          data[i].total = t;
        }

        this.drawFromObject();
      };
    }
  }

  addScales() {
    this.xScale = scaleBand()
      .rangeRound([0, this.width])
      .padding(this.padding)
      .domain(this.data.map((d) => d[this.labels]));

    this.yScale = scaleLinear()
      .rangeRound([this.height, 0])
      .domain([
        0,
        max(this.data, (d) => {
          return d.total;
        }),
      ])
      .nice();

    // set the colors
    const keys =
      this.dataFormat === "object"
        ? this.data.map((d) => d[this.labels])
        : this.data.columns;
    this.zScale = scaleOrdinal()
      .range([
        "#98abc5",
        "#8a89a6",
        "#7b6888",
        "#6b486b",
        "#a05d56",
        "#d0743c",
        "#ff8c00",
      ])
      .domain(keys);
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
        .attr("y", this.height + this.margin.bottom / 2)
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
        .attr("y", 0 - this.margin.left / 1.4)
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
    const xAxis = axisBottom(this.xScale).tickSize(0);

    // x-axis
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(xAxis)
      .attr("class", `xAxis${this.graphClass}`)
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-family", this.fontFamily)
      .style(
        "font-size",
        this.axisFontSize === undefined
          ? `${Math.min(0.8, Math.min(this.width, this.height) / 140)}rem`
          : this.axisFontSize
      )
      .style("opacity", 0.9);

    // y-axis
    const yAxis = axisLeft(this.yScale).tickSize(0);
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
      )
      .style("opacity", 0.9);

    // hide original axes
    selectAll("path.domain").attr("stroke", "transparent");
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
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .style(
        "font-size",
        this.titleFontSize === undefined
          ? `${Math.min(40, Math.min(this.width, this.height) / 5)}px`
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
    selectAll(this.interactionG)
      // .data(this.data)
      // .append('rect')
      .each(function (d, i) {
        const attr = this["attributes"];
        select(this)
          .append("rect")
          .attr("x", attr["x"].value)
          .attr("y", attr["y"].value)
          .attr("width", attr["width"].value)
          .attr("height", attr["height"].value)
          .attr("fill", "transparent");
      });

    // create tooltip
    const Tooltip = select(this.el)
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
    const mouseover = function (d) {
      Tooltip.style("opacity", 1);
    };
    const that = this;
    let thisColor;

    let mousemove = function (d) {
      const attrX = select(this).attr("attrX");
      const attrY = select(this).attr("attrY");
      const mousePos = mouse(this);
      // get size of enclosing div
      Tooltip.html(`<b>${attrX}</b>: ${attrY}`)
        .style("opacity", 0.95)
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
    const mouseleave = function (d) {
      Tooltip.style("opacity", 0);
    };

    // d3 event handlers
    selectAll(this.interactionG).on("mouseover", function () {
      mouseover();
      thisColor = select(this).selectAll("path").style("stroke");
      select(this).select("path").style("stroke", that.highlight);
      select(this)
        .selectAll("path:nth-child(2)")
        .style("stroke-width", that.strokeWidth + 1.2);
    });

    selectAll(this.interactionG).on("mouseout", function () {
      mouseleave();
      select(this).select("path").style("stroke", thisColor);
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

  // Helper Method to create the Stack
  stacking() {
    // Add Stackedbarplot
    this.data.forEach((d) => {
      const keys = Object.keys(d);
      let yStack = 0;
      keys.forEach((yValue, i) => {
        if (i > 0 && yValue !== "total") {
          yStack += parseInt(d[yValue], 10);
          const x = this.xScale(d[this.labels]);
          const y = this.yScale(yStack);
          const width = this.xScale.bandwidth();
          const height = this.height - this.yScale(+d[yValue]);
          const node = this.rc.rectangle(x, y, width, height, {
            fill: this.stackColorMapping[yValue] || this.colors[i],
            stroke: this.stackColorMapping[yValue] || this.colors[i],
            simplification: this.simplification,
            fillWeight: this.fillWeight,
          });
          const roughNode = this.roughSvg.appendChild(node);
          roughNode.setAttribute("class", this.graphClass);
          roughNode.setAttribute("attrX", d[this.labels]);
          roughNode.setAttribute("keyY", yValue);
          roughNode.setAttribute("attrY", +d[yValue]);
          // Set Attributes to access them later
          roughNode.setAttribute("x", x);
          roughNode.setAttribute("y", y);
          roughNode.setAttribute("width", width);
          roughNode.setAttribute("height", height);
        }
      });
    });
  }

  /**
   * Draw chart from object input.
   */
  drawFromObject() {
    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);
    this.addLabels();
    // Add Stackedbarplot
    this.stacking();

    selectAll(this.interactionG)
      .selectAll("path:nth-child(2)")
      .style("stroke-width", this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }
  } // draw

  /**
   * Draw chart from file.
   */
  drawFromFile() {
    this.initRoughObjects();
    this.addScales();
    this.addAxes();
    this.makeAxesRough(this.roughSvg, this.rcAxis);
    this.addLabels();
    // Add Stackedbar
    this.stacking();

    selectAll(this.interactionG)
      .selectAll("path:nth-child(2)")
      .style("stroke-width", this.strokeWidth);
    // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction();
    }
  } // draw
}

export default StackedBar;
