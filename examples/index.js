// /* eslint max-len: ['error', { 'code': 150 }]*/
// /* eslint-disable no-new */
import roughViz from '../src';

new roughViz.Bar({
  element: '#example',
  data:
    'https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv',
  labels: 'letter',
  values: 'frequency',
  height: window.innerHeight * 0.55,
  width: window.innerWidth * 0.8,
  roughness: 5,
  color: 'pink',
  fillWeight: 1,
  strokeWidth: 0.5,
  fillStyle: 'cross-hatch',
  // roughness: 0,
  stroke: 'black',
});


new roughViz.Scatter(
  {
    element: '#vis0',
    data: 'https://raw.githubusercontent.com/uiuc-cse/data-fa14/gh-pages/data/iris.csv',
    title: 'Iris',
    x: 'sepal_width',
    y: 'petal_length',
    colorVar: 'species',
    highlightLabel: 'species',
    fillWeight: 5.1,
    radius: 12,
    colors: ['pink', 'coral', 'skyblue'],
    stroke: 'black',
    strokeWidth: .4,
    roughness: 1,
    strokeWidth: 0.5,
    // titleFontSize: '2rem',
    // axesFontSize: '1.5rem',
    // axisStrokeWidth: 0.4,
    // axisRoughness: 2,
    width: window.innerWidth / 2.5,
    height: window.innerHeight / 2,
    font: 0,
    curbZero: false,
    fillStyle: 'crss-hatch',
    // highlight: 'blue'
})

new roughViz.Donut({
  element: '#vis1',
  data:
    'https://raw.githubusercontent.com/jwilber/jenkem_data/master/regions.json',
  title: 'Regions',
  labels: 'region',
  values: 'count',
  roughness: 0,
  colors: ['pink', 'coral', 'teal', 'skyblue'],
  highlight: 'gold',
  strokeWidth: 2,
  titleFontSize: '25px',
  fillWeight: 1.5,
  fillStyle: 'zigzag-line',
  width: window.innerWidth / 2.5,
  height: window.innerHeight / 2,
});

new roughViz.Pie({
  element: '#vis2',
  data: {
    labels: ['Mike', 'Jah', 'Ralf', 'Geez'],
    values: [13, 10, 10, 20],
  },
  title: 'Yarn',
  width: window.innerWidth / 2.5,
  height: window.innerHeight / 2,
  roughness: 20,
  colors: ['red', 'orange', 'blue', 'skyblue', 'red', 'green', 'black', 'grey'],
  stroke: 'black',
  strokeWidth: 6,
  innerStrokeWidth: 8,
  fillStyle: 'cross-hatch',
  fillWeight: 3.5,
});


new roughViz.BarH({
  element: '#vis3',
  data: {
    labels: [
      'Reggae',
      'Rap',
      'R & B',
      'Techno',
      'Hip Hop',
      'Trap',
      'Alternative',
      'Mariachi',
    ],
    values: [240, 40, 400, 90, 75, 315, 43, 1500],
  },
  width: window.innerWidth / 2.5,
  height: window.innerHeight / 2,
  title: 'Genres',
  roughness: 8,
  highlight: 'chocolate',
  stroke: 'grey',
  padding: 0.15,
  innerStrokeWidth: 0.5,
  color: 'white',
  fillStyle: 'dashed',
});


new roughViz.Line(
  {
    element: '#vis4',
    data: 'https://raw.githubusercontent.com/jwilber/random_data/master/tweets.csv',
    title: 'Line Chart',
    y: 'favorites',
    y2: 'retweets',
    y3: 'tweets',
    roughness: 3.5,
    width: window.innerWidth / 2.5,
    height: window.innerHeight / 2,
  }
);



