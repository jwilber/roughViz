<img src="https://raw.githubusercontent.com/jwilber/random_data/master/roughViz_Title.png"  width="350" alt="roughViz.js"><br>

**roughViz.js** is a reusable JavaScript library for creating sketchy/hand-drawn styled charts in the browser, based on D3v5, roughjs, and handy.


<img src="https://raw.githubusercontent.com/jwilber/random_data/master/roughViz.gif" alt="roughViz.js">


### Why?
Use these charts where the communication goal is to show intent or generality, and not absolute precision. Or just because they're fun and look weird. 


### Features

**Chart Types** (more to come!)
<ul>
 <li>Bar (<code>roughViz.Bar</code>) <a href="#Bar">API</a>. <a href="https://blockbuilder.org/jwilber/4dc5235f7ea5e51ac1219b3605f5af6a">Example</a>.</li>
<li> Horizontal Bar (<code>roughViz.BarH</code>) <a href="#BarH">API</a>. <a href="https://blockbuilder.org/jwilber/419fa6d878fe6c0f79a28f9fc72d7ec6">Example</a>.</li>
<li> Donut (<code>roughViz.Donut</code>) <a href="#Donut">API</a>. <a href="https://blockbuilder.org/jwilber/e713c03097950d53a8cfde4c23aa292f">Example</a>.</li>
<li> Line (<code>roughViz.Line</code>) <a href="#Line">API</a>. <a href="https://blockbuilder.org/jwilber/ec7cbc374c2dc61b255494511e7d7ac6">Example</a>.</li>
<li> Pie (<code>roughViz.Pie</code>) <a href="#Pie">API</a>. <a href="https://blockbuilder.org/jwilber/d117e0b0864a161bec2d914013ed69da">Example</a>.</li>
<li> Scatter (<code>roughViz.Scatter</code>) <a href="#Scatter">API</a>. <a href="https://blockbuilder.org/jwilber/d02e4381d776fb9a7bcb126d3b32c85b">Example</a>.</li>
 <li> Stacked Bar (<code>roughViz.StackedBar</code>) <a href="#StackedBar">API</a>. <a href="https://blockbuilder.org/jwilber/ee35865631cb805057142568fa5fd090">Example</a>.</li>
 </ul>

Apply the features of `roughjs` to each chart:

**roughness**:

<img src="https://raw.githubusercontent.com/jwilber/random_data/master/roughViz_roughnessbars.png"  alt="roughness examples">

<b id="fillStyle">fillStyle</b>
<img src="https://raw.githubusercontent.com/jwilber/random_data/master/rough_fillStyles.png"  alt="fillStyle examples">


**fillWeight**
<img src="https://raw.githubusercontent.com/jwilber/random_data/master/roughViz_fillweight.png"  alt="fillStyle examples">


As well as additional chart-specific options ([see API below](#API))


### Installation

Via CDN (expose the `roughViz` global in `html`):

```html
<script src="https://unpkg.com/rough-viz@1.0.6"></script>
```

Via `npm`:

```sh
npm install rough-viz
```
Want to use with `React`? [There's a wrapper!](https://github.com/Chris927/react-roughviz):

```sh
npm install react-roughviz
```

Want to use with `Vue`? [There's a wrapper!](https://github.com/jolo-dev/vue-roughviz):

```sh
npm install vue-roughviz
```

Want to use it with `Python`? [Go crazy](https://github.com/charlesdong1991/py-roughviz):

```sh
pip install py-roughviz
```


### How to use

If you're using ESM, make sure to import the library:

```
import roughViz from "rough-viz";
```

Create some container elements, one for each chart:

```html
<!--you can name each id whatever you want -->
<div id="viz0"></div>
<div id="viz1"></div>
```
In the javascript, just create charts, referencing the desired container:
```js
// create Bar chart from csv file, using default options
 new roughViz.Bar({
    element: '#viz0', // container selection
    data: 'https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv',
    labels: 'flavor',
    values: 'price'
});

// create Donut chart using defined data & customize plot options
new roughViz.Donut(
  {
    element: '#viz1',
    data: {
      labels: ['North', 'South', 'East', 'West'],
      values: [10, 5, 8, 3]
    },
    title: "Regions",
    width: window.innerWidth / 4,
    roughness: 8,
    colors: ['red', 'orange', 'blue', 'skyblue'],
    stroke: 'black',
    strokeWidth: 3,
    fillStyle: 'cross-hatch',
    fillWeight: 3.5,
  }
);
```

<h2 id="API">API</h2>

### <code id="Bar">roughViz.Bar</code>
Required
- `element` [string]: Id or class of container element.
- `data`: Data with which to construct chart.
Can be either an object or string.

   - If object: must contain `labels` and `values` keys:

    ```js
    new roughViz.Bar({
       element: '.viz',
       data: {labels: ['a', 'b'], values: [10, 20]}
     })
     ```
    
   - If string: must be a path/url to a `csv` or `tsv`, and you must also specify the `labels` and `values` as separate attributes that represent columns in said file:
   ```js
   new roughViz.Bar({
     element: '#viz0',
     data: 'stringToDataUrl.csv',
     labels: 'nameOfLabelsColumn',
     values: 'nameOfValuesColumn',
   })
   ```

Optional
- `axisFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `axisRoughness` [number]: Roughness for x & y axes. Default: `0.5`.
- `axisStrokeWidth` [number]: Stroke-width for x & y axes. Default: `0.5`.
- `bowing` [number]: Chart bowing. Default: `0`.
- `color` [string]: Color for each bar. Default: `'skyblue'`.
- `fillStyle` [string]: Bar fill-style. Should be one of [fillStyles](#fillStyle) shown above.
- `fillWeight` [number]: Weight of inner paths' color. Default: `0.5`.
- `font`: Font-family to use. You can use `0` or `gaegu` to use `Gaegu`, or `1` or `indie flower` to use `Indie Flower`. Or feed it something else. Default: `Gaegu`.
- `highlight` [string]: Color for each bar on hover. Default: `'coral'`.
- `innerStrokeWidth` [number]: Stroke-width for paths inside bars. Default: `1`.
- `interactive` [boolean]: Whether or not chart is interactive. Default: `true`. 
- `labelFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `margin` [object]: Margin object. Default: `{top: 50, right: 20, bottom: 70, left: 100}`
- `padding` [number]: Padding between bars. Default: `0.1`.
- `roughness` [number]: Roughness level of chart. Default: `1`.
- `simplification` [number]: Chart simplification. Default `0.2`.
- `stroke` [string]: Color of bars' stroke. Default: `black`.
- `strokeWidth` [number]: Size of bars' stroke. Default: `1`.
- `title` [string]: Chart title. Optional.
- `titleFontSize` [string]: Font-size for chart title. Default: `'1rem'`. 
- `tooltipFontSize` [string]: Font-size for tooltip. Default: `'0.95rem'`.
- `xLabel` [string]: Label for x-axis.
- `yLabel` [string]: Label for y-axis.


### <code id="BarH">roughViz.BarH</code>
Required
- `element` [string]: Id or class of container element.
- `data`: Data with which to construct chart.
Can be either an object or string.

   - If object: must contain `labels` and `values` keys:

    ```js
    new roughViz.BarH({
       element: '.viz',
       data: {labels: ['a', 'b'], values: [10, 20]}
     })
     ```
    
   - If string: must be a path/url to a `csv` or `tsv`, and you must also specify the `labels` and `values` as separate attributes that represent columns in said file:
   ```js
   new roughViz.BarH({
     element: '#viz0',
     data: 'stringToDataUrl.csv',
     labels: 'nameOfLabelsColumn',
     values: 'nameOfValuesColumn',
   })
   ```

Optional
- `axisFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `axisRoughness` [number]: Roughness for x & y axes. Default: `0.5`.
- `axisStrokeWidth` [number]: Stroke-width for x & y axes. Default: `0.5`.
- `bowing` [number]: Chart bowing. Default: `0`.
- `color` [string]: Color for each bar. Default: `'skyblue'`.
- `fillStyle` [string]: Bar fill-style. Should be one of [fillStyles](#fillStyle) shown above.
- `fillWeight` [number]: Weight of inner paths' color. Default: `0.5`.
- `font`: Font-family to use. You can use `0` or `gaegu` to use `Gaegu`, or `1` or `indie flower` to use `Indie Flower`. Or feed it something else. Default: `Gaegu`.
- `highlight` [string]: Color for each bar on hover. Default: `'coral'`.
- `innerStrokeWidth` [number]: Stroke-width for paths inside bars. Default: `1`.
- `interactive` [boolean]: Whether or not chart is interactive. Default: `true`. 
- `labelFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `margin` [object]: Margin object. Default: `{top: 50, right: 20, bottom: 70, left: 100}`
- `padding` [number]: Padding between bars. Default: `0.1`.
- `roughness` [number]: Roughness level of chart. Default: `1`.
- `simplification` [number]: Chart simplification. Default `0.2`.
- `stroke` [string]: Color of bars' stroke. Default: `black`.
- `strokeWidth` [number]: Size of bars' stroke. Default: `1`.
- `title` [string]: Chart title. Optional.
- `titleFontSize` [string]: Font-size for chart title. Default: `'1rem'`. 
- `tooltipFontSize` [string]: Font-size for tooltip. Default: `'0.95rem'`.
- `xLabel` [string]: Label for x-axis.
- `yLabel` [string]: Label for y-axis.


### <code id="Donut">roughViz.Donut</code>
Required
- `element` [string]: Id or class of container element.
- `data`: Data with which to construct chart.
Can be either an object or string.

   - If object: must contain `labels` and `values` keys:

    ```js
    new roughViz.Donut({
       element: '.viz',
       data: {labels: ['a', 'b'], values: [10, 20]}
     })
     ```
    
   - If string: must be a path/url to a `csv`, `json`, or `tsv`, and you must also specify the `labels` and `values` as separate attributes that represent columns in said file:
   ```js
   new roughViz.Donut({
     element: '#viz0',
     data: 'stringToDataUrl.csv',
     labels: 'nameOfLabelsColumn',
     values: 'nameOfValuesColumn',
   })
   ```

Optional
- `bowing` [number]: Chart bowing. Default: `0`.
- `colors` [array]: Array of colors for each arc. Default: `['coral', 'skyblue', '#66c2a5', 'tan', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', 'tan', 'orange']`.
- `fillStyle` [string]: Bar fill-style. Should be one of [fillStyles](#fillStyle) shown above.
- `fillWeight` [number]: Weight of inner paths' color. Default: `0.85`.
- `font`: Font-family to use. You can use `0` or `gaegu` to use `Gaegu`, or `1` or `indie flower` to use `Indie Flower`. Or feed it something else. Default: `Gaegu`.
- `highlight` [string]: Color for each arc on hover. Default: `'coral'`.
- `innerStrokeWidth` [number]: Stroke-width for paths inside arcs. Default: `0.75`.
- `interactive` [boolean]: Whether or not chart is interactive. Default: `true`. 
- `legend` [boolean]: Whether or not to add legend. Default: `'true'`.
- `legendPosition` [string]: Position of legend. Should be either `'left'` or `'right'`. Default: `'right'`.
- `margin` [object]: Margin object. Default: `{top: 50, right: 20, bottom: 70, left: 100}`
- `padding` [number]: Padding between bars. Default: `0.1`.
- `roughness` [number]: Roughness level of chart. Default: `1`.
- `simplification` [number]: Chart simplification. Default `0.2`.
- `strokeWidth` [number]: Size of bars' stroke. Default: `1`.
- `title` [string]: Chart title. Optional.
- `titleFontSize` [string]: Font-size for chart title. Default: `'1rem'`. 
- `tooltipFontSize` [string]: Font-size for tooltip. Default: `'0.95rem'`.


### <code id="Line">roughViz.Line</code>
Required
- `element` [string]: Id or class of container element.
- `data`: Must be a path/url to a `csv` or `tsv`, and you must also specify the each `y` as separate attributes that represent columns in said file. Each attribute prefaced with `y` (except `yLabel`) will receive its own line:
   ```js
   new roughViz.Line({
     element: '#viz0',
     data: 'https://raw.githubusercontent.com/jwilber/random_data/master/profits.csv',
     y1: 'revenue',
     y2: 'cost',
     y3: 'profit'
   })
   ```

Optional
- `axisFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `axisRoughness` [number]: Roughness for x & y axes. Default: `0.5`.
- `axisStrokeWidth` [number]: Stroke-width for x & y axes. Default: `0.5`.
- `bowing` [number]: Chart bowing. Default: `0`.
- `circle` [boolean]: Whether or not to add circles to chart. Default: `true`.
- `circleRadius` [number]: Radius of circles. Default: `10`.
- `circleRoughness` [number]: Roughness of circles. Default: `2`.
- `colors` [array or string]: Array of colors for each arc. Default: `['coral', 'skyblue', '#66c2a5', 'tan', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', 'tan', 'orange']`. If string (e.g. `'blue'`), all circles will take that color.
- `fillStyle` [string]: Bar fill-style. Should be one of [fillStyles](#fillStyle) shown above.
- `fillWeight` [number]: Weight of inner paths' color. Default: `0.5`.
- `font`: Font-family to use. You can use `0` or `gaegu` to use `Gaegu`, or `1` or `indie flower` to use `Indie Flower`. Or feed it something else. Default: `Gaegu`.
- `interactive` [boolean]: Whether or not chart is interactive. Default: `true`. 
- `labelFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `legend` [boolean]: Whether or not to add legend. Default: `true`.
- `legendPosition` [string]: Position of legend. Should be either `'left'` or `'right'`. Default: `'right'`.
- `margin` [object]: Margin object. Default: `{top: 50, right: 20, bottom: 70, left: 100}`
- `roughness` [number]: Roughness level of chart. Default: `1`.
- `simplification` [number]: Chart simplification. Default `0.2`.
- `stroke` [string]: Color of lines' stroke. Default: `this.colors`.
- `strokeWidth` [number]: Size of lines' stroke. Default: `1`.
- `title` [string]: Chart title. Optional.
- `titleFontSize` [string]: Font-size for chart title. Default: `'0.95rem'`. 
- `tooltipFontSize` [string]: Font-size for tooltip. Default: `'0.95rem'`.
- `xLabel` [string]: Label for x-axis.
- `yLabel` [string]: Label for y-axis.


### <code id="Pie">roughViz.Pie</code>
Required
- `element` [string]: Id or class of container element.
- `data`: Data with which to construct chart.
Can be either an object or string.

   - If object: must contain `labels` and `values` keys:

    ```js
    new roughViz.Pie({
       element: '.viz',
       data: {labels: ['a', 'b'], values: [10, 20]}
     })
     ```
    
   - If string: must be a path/url to a `csv`, `json`, or `tsv`, and you must also specify the `labels` and `values` as separate attributes that represent columns in said file:
   ```js
   new roughViz.Pie({
     element: '#viz0',
     data: 'stringToDataUrl.csv',
     labels: 'nameOfLabelsColumn',
     values: 'nameOfValuesColumn',
   })
   ```

Optional
- `bowing` [number]: Chart bowing. Default: `0`.
- `colors` [array]: Array of colors for each arc. Default: `['coral', 'skyblue', '#66c2a5', 'tan', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', 'tan', 'orange']`.
- `fillStyle` [string]: Bar fill-style. Should be one of [fillStyles](#fillStyle) shown above.
- `fillWeight` [number]: Weight of inner paths' color. Default: `0.85`.
- `font`: Font-family to use. You can use `0` or `gaegu` to use `Gaegu`, or `1` or `indie flower` to use `Indie Flower`. Or feed it something else. Default: `Gaegu`.
- `highlight` [string]: Color for each arc on hover. Default: `'coral'`.
- `innerStrokeWidth` [number]: Stroke-width for paths inside arcs. Default: `0.75`.
- `interactive` [boolean]: Whether or not chart is interactive. Default: `true`. 
- `legend` [boolean]: Whether or not to add legend. Default: `true`.
- `legendPosition` [string]: Position of legend. Should be either `'left'` or `'right'`. Default: `'right'`.
- `margin` [object]: Margin object. Default: `{top: 50, right: 20, bottom: 70, left: 100}`
- `padding` [number]: Padding between bars. Default: `0.1`.
- `roughness` [number]: Roughness level of chart. Default: `1`.
- `simplification` [number]: Chart simplification. Default `0.2`.
- `strokeWidth` [number]: Size of bars' stroke. Default: `1`.
- `title` [string]: Chart title. Optional.
- `titleFontSize` [string]: Font-size for chart title. Default: `'1rem'`. 
- `tooltipFontSize` [string]: Font-size for tooltip. Default: `'0.95rem'`.


### <code id="Scatter">roughViz.Scatter</code>
Required
- `element` [string]: Id or class of container element.
- `data`: Data with which to construct chart.
Can be either an object or string.

   - If object: must contain `x` and `y` keys:

    ```js
    new roughViz.Scatter({
       element: '.viz',
       data: {x: [1, 2, 35], y: [10, 20, 8]}
     })
     ```
    
   - If string: must be a path/url to a `csv` or `tsv`, and you must also specify the `x` and `y` as separate attributes that represent columns in said file:
   ```js
   new roughViz.Scatter({
     element: '#viz0',
     data: 'stringToDataUrl.csv',
     x: 'nameOfLabelsColumn',
     y: 'nameOfValuesColumn',
   })
   ```

Optional
- `axisFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `axisRoughness` [number]: Roughness for x & y axes. Default: `0.5`.
- `axisStrokeWidth` [number]: Stroke-width for x & y axes. Default: `0.5`.
- `bowing` [number]: Chart bowing. Default: `0`.
- `colors` [array or string]: Array of colors for each arc. Default: `['coral', 'skyblue', '#66c2a5', 'tan', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', 'tan', 'orange']`. If string (e.g. `'blue'`), all circles will take that color.
- `colorVar` [string]: If input data is `csv` or `tsv`, this should be an ordinal column with which to color points by.
`curbZero` [boolean]: Whether or not to force (x, y) axes to (0, 0). Default: `false`.
- `fillStyle` [string]: Bar fill-style. Should be one of [fillStyles](#fillStyle) shown above.
- `fillWeight` [number]: Weight of inner paths' color. Default: `0.5`.
- `font`: Font-family to use. You can use `0` or `gaegu` to use `Gaegu`, or `1` or `indie flower` to use `Indie Flower`. Or feed it something else. Default: `Gaegu`.
- `highlight` [string]: Color for each bar on hover. Default: `'coral'`.
- `highlightLabel` [string]: If input data is `csv` or `tsv`, this should be a column representing what value to display on hover. Otherwise, `(x, y)` values will be shown on hover.
- `innerStrokeWidth` [number]: Stroke-width for paths inside circles. Default: `1`.
- `interactive` [boolean]: Whether or not chart is interactive. Default: `true`. 
- `labelFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `margin` [object]: Margin object. Default: `{top: 50, right: 20, bottom: 70, left: 100}`
- `radius` [number]: Circle radius. Default: `8`.
- `roughness` [number]: Roughness level of chart. Default: `1`.
- `simplification` [number]: Chart simplification. Default `0.2`.
- `stroke` [string]: Color of circles' stroke. Default: `black`.
- `strokeWidth` [number]: Size of circles' stroke. Default: `1`.
- `title` [string]: Chart title. Optional.
- `titleFontSize` [string]: Font-size for chart title. Default: `'0.95rem'`. 
- `tooltipFontSize` [string]: Font-size for tooltip. Default: `'0.95rem'`.
- `xLabel` [string]: Label for x-axis.
- `yLabel` [string]: Label for y-axis.


### <code id="StackedBar">roughViz.StackedBar</code>
Required
- `element` [string]: Id or class of container element.
- `data`: Data with which to construct chart. Should be an object.
- `labels`: String name of label key in `data` object.

    ```js
    new roughViz.StackedBar({
       element: '#vis0',
       data: [
           {month:'Jan', A:20, B: 5},
           {month:'Feb', A:25, B: 10},    
       ],
       labels: 'month',
     })
     ```

Optional
- `axisFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `axisRoughness` [number]: Roughness for x & y axes. Default: `0.5`.
- `axisStrokeWidth` [number]: Stroke-width for x & y axes. Default: `0.5`.
- `bowing` [number]: Chart bowing. Default: `0`.
- `colors` [string]: Array of colors for each bar grouping.
- `fillStyle` [string]: Bar fill-style. Should be one of [fillStyles](#fillStyle) shown above.
- `fillWeight` [number]: Weight of inner paths' color. Default: `0.5`.
- `font`: Font-family to use. You can use `0` or `gaegu` to use `Gaegu`, or `1` or `indie flower` to use `Indie Flower`. Or feed it something else. Default: `Gaegu`.
- `highlight` [string]: Color for each bar on hover. Default: `'coral'`.
- `innerStrokeWidth` [number]: Stroke-width for paths inside bars. Default: `1`.
- `interactive` [boolean]: Whether or not chart is interactive. Default: `true`. 
- `labelFontSize` [string]: Font-size for axes' labels. Default: `'1rem'`.
- `margin` [object]: Margin object. Default: `{top: 50, right: 20, bottom: 70, left: 100}`
- `padding` [number]: Padding between bars. Default: `0.1`.
- `roughness` [number]: Roughness level of chart. Default: `1`.
- `simplification` [number]: Chart simplification. Default `0.2`.
- `stroke` [string]: Color of bars' stroke. Default: `black`.
- `strokeWidth` [number]: Size of bars' stroke. Default: `1`.
- `title` [string]: Chart title. Optional.
- `titleFontSize` [string]: Font-size for chart title. Default: `'1rem'`. 
- `tooltipFontSize` [string]: Font-size for tooltip. Default: `'0.95rem'`.
- `xLabel` [string]: Label for x-axis.
- `yLabel` [string]: Label for y-axis.



### Contributors
- [Jared Wilber](https://twitter.com/jdwlbr)
- [Laimonas Andriejauskas](https://github.com/laimonasA)
- [Dave Slutzkin](https://github.com/daveslutzkin)
- [JoLo](https://github.com/jolo-dev)
- [Lucas Wilber](https://github.com/lucasjwilber)

### Acknowledgements
This library wouldn't be possible without the following people:

- [Mike Bostock](https://twitter.com/mbostock) for [D3.js](https://d3js.org/).
- [Preet Shihn](https://twitter.com/preetster) for [rough.js](https://roughjs.com/).
- [Jo Wood](https://www.city.ac.uk/people/academics/jo-wood) for [handy](https://www.gicentre.net/software/#/handy/) processing lib.


### License
MIT License

Copyright (c) 2019 Jared Wilber

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
