import { select } from "d3-selection";

export const addLegend = (
  parent,
  legendItems,
  legendWidth,
  legendHeight,
  left
) => {
  parent.svg
    .append("svg")
    .attr(
      "x",
      parent.legendPosition === "left" ? 5 : parent.width - (legendWidth + 2)
    )
    .attr("y", 0);

  // allow custom left-padding where chart overlaps with y-axis
  const leftPadding = left === undefined ? -parent.margin.left + 5 : left;

  const nodeLegend = parent.rc.rectangle(
    parent.legendPosition === "left"
      ? leftPadding // left
      : parent.width + parent.margin.right - 2 - legendWidth, // right
    -(parent.margin.top / 3), // y
    legendWidth, // width
    legendHeight, // height
    {
      fill: "white",
      fillWeight: 0.1,
      strokeWidth: 0.75,
      roughness: 2,
    }
  );

  const roughLegend = parent.roughSvg.appendChild(nodeLegend);
  const legendClass = "rough" + parent.el.substring(1, parent.el.length);
  roughLegend.setAttribute("class", legendClass);

  legendItems.forEach((item, i) => {
    const g = select("." + legendClass)
      .append("g")
      .attr(
        "transform",
        `translate(
        ${
          parent.legendPosition === "left"
            ? 5
            : parent.width - (legendWidth + 2)
        },
        ${0})`
      );

    g.append("rect")
      .style("fill", parent.colors[i])
      .attr("width", 20)
      .attr("height", 8)
      .attr(
        "x",
        parent.legendPosition === "left" ? leftPadding : parent.margin.right + 5
      )
      .attr("y", 6 + 11 * i - parent.margin.top / 3);

    g.append("text")
      .style("font-size", ".8rem")
      .style("font-family", parent.fontFamily)
      .attr(
        "x",
        parent.legendPosition === "left"
          ? leftPadding + 25
          : parent.margin.right + 30
      )
      .attr("y", 6 + 11 * i + 8 - parent.margin.top / 3)
      .text(item.text);
  });
};
