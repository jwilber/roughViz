import {
  Bar,
  BarH,
  Donut,
  Line,
  Network,
  Force,
  Pie,
  Scatter,
  StackedBar,
} from "rough-viz";
import { range } from "d3-array";
import { select } from "d3-selection";

const anchor = "#introViz";

// event listeners for elements
const roughSlider = document.getElementById("roughness-slider");
const roughLabel = document.getElementById("label-roughness-slider");

const strokeWidthSlider = document.getElementById("strokeWidth-slider");
const strokeWidthLabel = document.getElementById("label-strokeWidth-slider");

const innerStrokeWidthSlider = document.getElementById(
  "innerStrokeWidth-slider"
);
const innerStrokeWidthLabel = document.getElementById(
  "label-innerStrokeWidth-slider"
);

const fillWeightSlider = document.getElementById("fillWeight-slider");
const fillWeightLabel = document.getElementById("label-fillWeight-slider");

const axisRoughnessSlider = document.getElementById("axisRoughness-slider");
const axisRoughnessLabel = document.getElementById(
  "label-axisRoughness-slider"
);

const colorSlider = document.getElementById("color-picker");
const colorLabel = document.getElementById("label-color-picker");
const strokeSlider = document.getElementById("stroke-picker");
const strokeLabel = document.getElementById("label-stroke-picker");

// const numNodes = 200;
const numNodes = 104;
const radius = 5;

const dataLength = 20;

const scatterData = {
  x: Array.from({ length: dataLength }, () => Math.random() * dataLength),
  y: Array.from({ length: dataLength }, () => Math.random() * dataLength),
  radius: Array.from(
    { length: dataLength },
    () => Math.floor(Math.random() * 20) + 1
  ),
};

function createNodes(numNodes) {
  return range(numNodes).map(() => {
    const randomValue = Math.random();

    let multiplier =
      randomValue < 0.05
        ? 5
        : randomValue < 0.6
        ? 1
        : randomValue < 0.8
        ? 2
        : 3;

    return {
      radius: multiplier * radius,
    };
  });
}

function createLinks(numNodes) {
  return range(numNodes - 1).map((d, i) => ({
    source: i,
    target: i + 1,
  }));
}

// resolve slider values

let roughnessValue = parseFloat(roughSlider.value);
let strokeWidthValue = parseFloat(strokeWidthSlider.value);
let innerStrokeWidthValue = parseFloat(innerStrokeWidthSlider.value);
let fillWeightValue = parseFloat(fillWeightSlider.value);
let axisRoughnessValue = parseFloat(axisRoughnessSlider.value);
let fillStyleValue = "hachure";
let colorVal = colorSlider.value;
let strokeVal = strokeSlider.value;

function getUpdatedValues() {
  colorVal = colorSlider.value;
  strokeVal = strokeSlider.value;

  roughnessValue = parseFloat(roughSlider.value);

  strokeWidthValue = parseFloat(strokeWidthSlider.value);

  innerStrokeWidthValue = parseFloat(innerStrokeWidthSlider.value);

  fillWeightValue = parseFloat(fillWeightSlider.value);

  axisRoughnessValue = parseFloat(axisRoughnessSlider.value);

  fillStyleValue = getCurrentFillStyle();
}

// starting chart

let mainViz = new Force({
  element: anchor,
  data: createNodes(numNodes),
  collision: 1.2,
  textCallback: (d) => "Size: " + d.radius,
  radiusExtent: [10, 60],
  roughness: roughnessValue,
  fillStyle: fillStyleValue,
  stroke: strokeVal,
  color: colorVal,
  strokeWidth: strokeWidthValue,
  innerStrokeWidth: innerStrokeWidthValue,
  fillWeight: fillWeightValue,
  axisRoughness: axisRoughnessValue,
});

function resolveControls() {
  console.log("resolveControls", selectedViz);

  if (["Donut", "Pie", "Force", "Network"].includes(selectedViz)) {
    select("#axisRoughness-slider").style("display", "none");
    select("#label-axisRoughness-slider").style("display", "none");
  } else {
    select("#axisRoughness-slider").style("display", "inline-block");
    select("#label-axisRoughness-slider").style("display", "inline-block");
  }
  if (["Donut", "Pie", "StackedBar", "Line"].includes(selectedViz)) {
    select("#color-picker").style("display", "none");
    select("#label-color-picker").style("display", "none");
    select("#stroke-picker").style("display", "none");
    select("#label-stroke-picker").style("display", "none");
  } else {
    select("#color-picker").style("display", "inline-block");
    select("#label-color-picker").style("display", "inline-block");
    select("#stroke-picker").style("display", "inline-block");
    select("#label-stroke-picker").style("display", "inline-block");
  }
  if (selectedViz === "Line") {
    select("#fillWeight-slider").style("display", "none");
    select("#label-fillWeight-slider").style("display", "none");
    select("#innerStrokeWidth-slider").style("display", "none");
    select("#label-innerStrokeWidth-slider").style("display", "none");
    select("#fillStyle-dropdown").style("display", "none");
    select("#label-fillStyle-dropdown").style("display", "none");
  } else {
    select("#fillWeight-slider").style("display", "inline-block");
    select("#label-fillWeight-slider").style("display", "inline-block");
    select("#innerStrokeWidth-slider").style("display", "inline-block");
    select("#label-innerStrokeWidth-slider").style("display", "inline-block");
    select("#fillStyle-dropdown").style("display", "inline-block");
    select("#label-fillStyle-dropdown").style("display", "inline-block");
  }
}
resolveControls();
function newChart() {
  getUpdatedValues();
  resolveControls();

  mainViz.remove();
  if (selectedViz === "Force") {
    mainViz = new Force({
      element: anchor,
      data: createNodes(numNodes),
      collision: 1.2,
      textCallback: (d) => "Size: " + d.radius,
      radiusExtent: [10, 60],
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      stroke: strokeVal,
      color: colorVal,
      strokeWidth: strokeWidthValue,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "Bar") {
    mainViz = new Bar({
      element: anchor,
      data: {
        labels: ["North", "South", "East", "West"],
        values: [10, 5, 8, 3],
      },
      roughness: roughnessValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      highlight: "steelblue",
      stroke: strokeVal,
      color: colorVal,
      fillStyle: fillStyleValue,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "BarH") {
    mainViz = new BarH({
      element: anchor,
      data: {
        labels: ["North", "South", "East", "West"],
        values: [10, 5, 8, 3],
      },
      roughness: roughnessValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      highlight: "steelblue",
      stroke: strokeVal,
      color: colorVal,
      fillStyle: fillStyleValue,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
      padding: 0.15,
    });
  }
  if (selectedViz === "Donut") {
    mainViz = new Donut({
      element: anchor,
      data: {
        labels: ["North", "South", "East", "West"],
        values: [10, 5, 8, 3],
      },
      roughness: roughnessValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      color: colorVal,
      highlight: "steelblue",
      fillStyle: fillStyleValue,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "Pie") {
    mainViz = new Pie({
      element: anchor,
      data: {
        labels: ["North", "South", "East", "West"],
        values: [10, 5, 8, 3],
      },
      roughness: roughnessValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      color: colorVal,
      fillStyle: fillStyleValue,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "Network") {
    mainViz = new Network({
      element: anchor,
      data: createNodes(35),
      links: createLinks(35),
      collision: 3.05,
      radiusExtent: [10, 60],
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      stroke: strokeVal,
      color: colorVal,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      textCallback: (d) => "Size: " + d.radius,
      strokeWidth: strokeWidthValue,
      fillStyle: fillStyleValue,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "Line") {
    mainViz = new Line({
      element: anchor,
      data: { y: scatterData["y"], y2: scatterData["x"] },
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      roughness: roughnessValue,
      stroke: strokeVal,
      color: colorVal,
      fillStyle: fillStyleValue,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
      circle: false,
    });
  }
  if (selectedViz === "Scatter") {
    mainViz = new Scatter({
      element: anchor,
      data: scatterData,
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      colors: colorVal,
      fillStyle: fillStyleValue,
      radius: 20,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "StackedBar") {
    mainViz = new StackedBar({
      element: anchor,
      data: [
        { month: "Jan", A: 20, B: 5, C: 8, D: 12 },
        { month: "Feb", A: 25, B: 10, C: 9, D: 5 },
        { month: "March", A: 15, B: 5, C: 19, D: 9 },
      ],
      labels: "month",
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      color: colorVal,
      fillStyle: fillStyleValue,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
}

function updateChart() {
  mainViz.remove();
  getUpdatedValues();

  updateSliderLabels();
  if (selectedViz === "Force") {
    mainViz.redraw({
      element: anchor,
      data: createNodes(numNodes),
      collision: 1.2,
      textCallback: (d) => "Size: " + d.radius,
      radiusExtent: [10, 60],
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      color: colorVal,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "Bar") {
    mainViz.redraw({
      element: anchor,
      data: {
        labels: ["North", "South", "East", "West"],
        values: [10, 5, 8, 3],
      },
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      color: colorVal,
      highlight: "steelblue",
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "BarH") {
    mainViz.redraw({
      element: anchor,
      data: {
        labels: ["North", "South", "East", "West"],
        values: [10, 5, 8, 3],
      },
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      color: colorVal,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "Pie") {
    mainViz.redraw({
      element: anchor,
      data: {
        labels: ["North", "South", "East", "West"],
        values: [10, 5, 8, 3],
      },
      roughness: roughnessValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      color: colorVal,
      fillStyle: fillStyleValue,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "Donut") {
    mainViz.redraw({
      element: anchor,
      data: {
        labels: ["North", "South", "East", "West"],
        values: [10, 5, 8, 3],
      },
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      color: colorVal,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "Network") {
    mainViz.redraw({
      element: anchor,
      data: createNodes(35),
      links: createLinks(35),
      collision: 3.05,
      radiusExtent: [10, 60],
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      textCallback: (d) => "Size: " + d.radius,
      stroke: strokeVal,
      color: colorVal,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
  if (selectedViz === "Line") {
    mainViz.redraw({
      element: anchor,
      data: { y: scatterData["y"], y2: scatterData["x"] },
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      roughness: roughnessValue,
      stroke: strokeVal,
      color: colorVal,
      fillStyle: fillStyleValue,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
      circle: false,
    });
  }
  if (selectedViz === "Scatter") {
    mainViz.redraw({
      element: anchor,
      data: scatterData,
      x: "x",
      y: "y",
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      colors: colorVal,
      radius: 20,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }

  if (selectedViz === "StackedBar") {
    mainViz.redraw({
      element: anchor,
      data: [
        { month: "Jan", A: 20, B: 5, C: 8, D: 12 },
        { month: "Feb", A: 25, B: 10, C: 9, D: 5 },
        { month: "March", A: 15, B: 5, C: 19, D: 9 },
      ],
      labels: "month",
      roughness: roughnessValue,
      fillStyle: fillStyleValue,
      margin: { top: 100, left: 100, right: 100, bottom: 100 },
      stroke: strokeVal,
      color: colorVal,
      strokeWidth: strokeWidthValue,
      axisStrokeWidth: 1,
      innerStrokeWidth: innerStrokeWidthValue,
      fillWeight: fillWeightValue,
      axisRoughness: axisRoughnessValue,
    });
  }
}

function handleDropdownChange(event) {
  const selectedValue = event.target.value;

  if (fillStyleValue !== selectedValue) {
    fillStyleValue = selectedValue;
  }

  updateChart();
}

function getCurrentFillStyle() {
  const dropdown = document.querySelector('[name="fillStyle"]');
  if (dropdown) {
    return dropdown.value;
  }

  return "null";
}

function updateSliderLabels() {
  roughLabel.textContent = "Roughness: " + roughSlider.value;
  strokeWidthLabel.textContent = "strokeWidth: " + strokeWidthSlider.value;
  innerStrokeWidthLabel.textContent =
    "innerStrokeWidth: " + innerStrokeWidthSlider.value;
  fillWeightLabel.textContent = "fillWeight: " + fillWeightSlider.value;
  axisRoughnessLabel.textContent =
    "axisRoughness: " + axisRoughnessSlider.value;
  colorLabel.textContent = "Color: " + colorSlider.value;
  strokeLabel.textContent = "Stroke: " + strokeSlider.value;
}

// Assuming the ID of the dropdown is "fillStyle-dropdown", add an event listener to handle changes:
document
  .getElementById("fillStyle-dropdown")
  .addEventListener("change", handleDropdownChange);

roughSlider.addEventListener("change", updateChart);

strokeWidthSlider.addEventListener("change", updateChart);

innerStrokeWidthSlider.addEventListener("change", updateChart);

fillWeightSlider.addEventListener("change", updateChart);
axisRoughnessSlider.addEventListener("change", updateChart);

colorSlider.addEventListener("change", updateChart);
strokeSlider.addEventListener("change", updateChart);

document.querySelectorAll(".menuItem").forEach((item) => {
  item.addEventListener("click", (event) => {
    newChart();
  });
});
