import "./style.css";
import { Bar } from "rough-viz";

// logo
new Bar({
  element: "#vizLogo", // container selection
  data: { labels: ["a", "b", "c", "d"], values: [20, 16, 5, 15] },
  axisFontSize: 0,
  roughness: 3,
  color: "pink",
  fillStyle: "cross-hatch",
  margin: { top: 10, right: 20, bottom: 15, left: 20 },
  interactive: false,
});
