<img src="https://raw.githubusercontent.com/jwilber/random_data/master/roughViz_Title.png"  width="250" alt="roughViz.js"><br>
**roughViz.js** is a reusable JavaScript library for creating sketchy/hand-drawn styled charts in the browser, based on D3v5 and roughjs.

<img src="https://raw.githubusercontent.com/jwilber/random_data/master/roughViz.gif" alt="roughViz.js">


### Why?
Use these charts where the communication goal is to show intent or generality, and not absolute precision. Or just because they're fun and look weird. 


### Features

Apply the features of `roughjs` to each chart:

**roughness**:

<img src="https://raw.githubusercontent.com/jwilber/random_data/master/roughViz_roughnessbars.png"  alt="roughness examples">

**fillStyle**
<img src="https://raw.githubusercontent.com/jwilber/random_data/master/rough_fillStyles.png"  alt="fillStyle examples">


**fillWeight**
<img src="https://raw.githubusercontent.com/jwilber/random_data/master/roughViz_fillweight.png"  alt="fillStyle examples">


As well as additional chart-specific options ([see API below]())

##### Customize (same data, different charts)


### Installation

Traditional (expose the `roughViz` global in `html`):

```html
<script src="https://unpkg.com/rough-viz@1.0.1"></script>
```

With `npm`:

```sh
npm install rough-viz
```

And then import/require it:

```js
import roughViz from 'rough-viz'; // or...
const roughViz = require('rough-viz');
```

### How to use

Create some container elements, one for each chart:

```html
<!--you can name each id whatever you want -->
<div id="viz0"></div>
<div id="viz1"></div>
```
In the javascript, just create charts, referencing the desired container:
```js
// create donut chart from csv file, using default options
 new roughViz.Bar({
    element: '#vis0', // container selection
    data: 'https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv',
    labels: 'flavor',
    values: 'price'
});

// create Donut chart using defined data & customize plot options
new roughViz.Donut(
  {
    element: '#vis1',
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

### API



### Contributors
- [Jared Wilber](https://twitter.com/jdwlbr)

### License
MIT License

Copyright (c) 2019 Jared Wilber

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
