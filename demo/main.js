import "./style.css";
import roughViz from "../dist/roughviz.es.js"; // Replace '...' with other exports if needed.
import { range } from "d3-array";

// logo
new roughViz.Bar({
  element: "#vizLogo", // container selection
  data: { labels: ["a", "b", "c", "d"], values: [20, 16, 5, 15] },
  axisFontSize: 0,
  roughness: 3,
  color: "pink",
  fillStyle: "cross-hatch",
  margin: { top: 10, right: 20, bottom: 15, left: 20 },
  interactive: false,
});

// // network
// // Step 2: Generate example data for nodes and links.
// const numNodes = 50;
// // create nodes with random radius
// const nodes = range(numNodes).map(() => ({ radius: Math.random() * 0 + 5 }));
// console.log(nodes);

// // // intro chart
// // new roughViz.Network({
// //   element: "#introViz",
// //   data: nodes,
// // });

// new roughViz.StackedBar({
//   element: "#viz0",
//   data: [
//     { month: "Jan", A: 5, B: 5 },
//     { month: "Feb", A: 10, B: 10 },
//   ],
//   labels: "month",
// });

// new roughViz.Donut({
//   element: "#viz1", // container selection
//   data: { labels: ["a", "b", "c"], values: [10, 20, 30] },
//   roughness: 10,
// });

// new roughViz.Pie({
//   element: "#viz2", // container selection
//   data: { labels: ["a", "b", "c"], values: [10, 20, 30] },
//   innerStrokeWidth: 8,
//   strokeWidth: 8,
//   roughness: 20,
// });

// new roughViz.BarH({
//   element: "#viz3", // container selection
//   data: { labels: ["a", "b"], values: [10, 20] },
// });

// new roughViz.Line({
//   element: "#viz4",
//   data: "https://raw.githubusercontent.com/jwilber/random_data/master/profits.csv",
//   y1: "revenue",
//   y2: "cost",
//   y3: "profit",
// });

// new roughViz.Scatter({
//   element: "#viz5",
//   data: "https://raw.githubusercontent.com/jwilber/random_data/master/profits.csv",
//   x: "revenue",
//   y: "cost",
// });
