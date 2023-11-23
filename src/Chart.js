import { select } from "d3-selection";
import { addFontGaegu, addFontIndieFlower } from "./utils/addFonts";

/**
 * Chart class ABC.
 */
class Chart {
  /**
   * Constructs a new Chart instance.
   * @param {Object} opts - Configuration object for the chart.
   */
  constructor(opts) {
    this.el = opts.element;
    this.element = opts.element;
    this.title = opts.title;
    this.titleFontSize = opts.titleFontSize || "17px";
    this.font = opts.font || 0;
    this.fillStyle = opts.fillStyle;
    this.tooltipFontSize = opts.tooltipFontSize || "0.95rem";
    this.bowing = opts.bowing || 0;
    this.simplification = opts.simplification || 0.2;
    this.interactive = opts.interactive !== false;
    this.dataFormat = typeof opts.data === "object" ? "object" : "file";
  }

  setSvg() {
    this.svg = select(this.el)
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${this.width + this.margin.left + this.margin.right}
       ${this.height + this.margin.top + this.margin.bottom}`
      )
      .append("g")
      .attr("id", this.roughId)
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );
  }

  resolveFont() {
    if (
      this.font === 0 ||
      this.font === undefined ||
      this.font.toString().toLowerCase() === "gaegu"
    ) {
      addFontGaegu(this.svg);
      this.fontFamily = "gaeguregular";
    } else if (
      this.font === 1 ||
      this.font.toString().toLowerCase() === "indie flower"
    ) {
      addFontIndieFlower(this.svg);
      this.fontFamily = "indie_flowerregular";
    } else {
      this.fontFamily = this.font;
    }
  }
}

export default Chart;
