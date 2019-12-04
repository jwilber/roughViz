// /* eslint max-len: ['error', { 'code': 150 }]*/
// /* eslint-disable no-new */
import roughViz from '../src';

// new roughViz.Line(
//   {
//     element: '#vis0',
//     data: 'https://raw.githubusercontent.com/jwilber/random_data/master/tweets.csv',
//     title: 'Line Chart',
//     // x: 'gdpPercap',
//     y: 'favorites',
//     colorVar: 'continent',
//     highlightLabel: 'country',
//     highlight: 'red',
//     fillWeight: 2,
//     roughness: 3.5,
//     width: window.innerWidth / 1.2,
//     height: 500,
//   }
// );

// new roughViz.Line(
//   {
//     element: '#vis0',
//     data: 'https://raw.githubusercontent.com/plotly/datasets/master/gapminder2007.csv',
//     title: 'Line Chart',
//     x: 'gdpPercap',
//     y: 'lifeExp',
//     radius: 'pop',
//     colorVar: 'continent',
//     highlightLabel: 'country',
//     highlight: 'red',
//     fillWeight: 2,
//     roughness: 3.5,
//     width: window.innerWidth / 2,
//     height: 500,
//   }
// );

// ERROR WHEN x undefined
// new roughViz.Line(
//   {
//     element: '#vis1',
//     data: {
//       // y: [100, 200, 300, 200, 500, 300],
//       // z: [100, 300, 100, 300, 100, 30, 30, 400, 500, 500, 500, 500],
//       // q: [10, 20, 10, 20, 10, 20, 45, 45, 45],
//       // q2: [50, 50, 50, 600, 50, 50, 50]
//       dan: [200, 2, 200, 5000]
//       // r: [0, 0, 0, 350, 450, 550, 1000, 2000, 5000]
//     },
//     // x: ['day1', 'day2', 'day3', '444444'],
//     width: 800,
//     strokeWidth: 3 ,
//     roughness: 2,
//     axesFontSize: '25px',
//     colors: ['orange', 'red', 'coral', 'tan']
//   }
// );

// new roughViz.Line(
//   {
//     element: '#vis0',
//     data: {
//         dan: [10, 50, 500],
//         jared: [10, 50, 250]
//     },
//     // width: 500,
//     // height: 500,
//     // roughness: 2,
//     // colors: ['pink', 'orange'],
//     // font: 1,
//     // axesFontSize: '30px',
//     // title: 'Jared vs Dan',
//     // titleFontSize: '30px',
//     // strokeWidth: 40
//   }
// );

// new roughViz.Scatter(
//   {
//     element: '#vis1',
//     data: {
//       x: [1, 2, 3],
//       y: [240, 40, 40, 160, 10],
//     },
//     // title: 'In-line JSON',
//     // titleFontSize: '20',
//     // // x: 'gdpPercap',
//     // // y: 'lifeExp',
//     width: 400,
//     roughness: 0,
//     radius: [25, 10, 40, 30, 60],
//     fillWeight: 3,
//     // // axesFontSize: 20,
//     axisRoughness: 1,
//     // // stroke: 'black',
//     // // fillWeight: 1.2,
//     // // strokeWidth: 1,
//     // // // fillStyle: 'cross-hatch',
//     // // highlight: 'skyblue',
//     // // highlightLabel: 'country',
//     height: 500,
//     // // curbZero: false,
//     colors: ['green', 'red', 'blue', 'black']
//   }
// );

// new roughViz.Bar(
//   {
//     element: '#lucasPractice',
//     data: 'https://raw.githubusercontent.com/jwilber/random_data/master/owTanks.csv',
//     width: window.innerWidth * 0.5,
//     height: window.innerHeight * 0.7,
//     title: 'OW Tank Health',
//     labels: 'name',
//     values: 'health',
//     roughness: 4,
//     axesFontSize: '1.5rem',
//     // stroke: 'green',
//     axisRoughness: .95,
//     padding: .1,
//     // strokeWidth: 1.0,
//     bowing: 1,
//     color: 'pink',
//     margin: {top: 50, right: 20, bottom: 150, left: 100},
//     highlight: 'green',
//     fillStyle: 'sold',
//   }
// );

new roughViz.BarH({
  element: '#vis3',
  data: {
    labels: [
      'Reggae',
      'Rap',
      'R&B',
      'Dance House',
      'Hip Hop',
      'Trap',
      'tre',
      'eifj',
    ],
    values: [240, 40, 400, 90, 75, 315, 43, 1500],
  },
  width: window.innerWidth / 2,
  // height: 600,
  title: 'Genres',
  roughness: 1,
  highlight: 'chocolate',
  stroke: 'grey',
  // axesFontSize: '20px'
  padding: 0.15,
  bowing: 6,
  innerStrokeWidth: 0.5,
  color: 'white',
  // margin: {top: 50, right: 20, bottom: 150, left: 100},
  // highlight: 'white',
  fillStyle: 'dashed',
});

// new roughViz.Bar(
//   {
//     element: '#vis3',
//     data: 'https://raw.githubusercontent.com/jwilber/random_data/master/owTanks.csv',
//     width: 600,
//     height: 600,
//     title: 'OW Tank Health',
//     labels: 'name',
//     values: 'health',
//     roughness: 0,
//     stroke: 'coral',
//     strokeWidth: 3.5,
//     color: 'teal',
//     margin: {top: 50, right: 20, bottom: 150, left: 100},
//     highlight: 'green',
//     fillStyle: 'cross-hatch',
//   }
// );

// new roughViz.Bar(
//   {
//     element: '#vis4',
//     data: 'https://raw.githubusercontent.com/jwilber/random_data/master/owTanks.csv',
//     width: 600,
//     height: 600,
//     title: 'OW Tank Health',
//     labels: 'name',
//     values: 'health',
//     roughness: 0,
//     stroke: 'coral',
//     strokeWidth: 0.0,
//     color: 'teal',
//     margin: {top: 50, right: 20, bottom: 150, left: 100},
//     highlight: 'green',
//     fillStyle: 'cross-hatch',
//   }
// );

// new roughViz.Bar(
//   {
//     element: '#vis5',
//     data: 'https://raw.githubusercontent.com/jwilber/random_data/master/owTanks.csv',
//     width: 600,
//     height: 600,
//     title: 'OW Tank Health',
//     labels: 'name',
//     values: 'health',
//     roughness: 0,
//     stroke: 'coral',
//     strokeWidth: 0.0,
//     color: 'teal',
//     margin: {top: 50, right: 20, bottom: 150, left: 100},
//     highlight: 'green',
//     fillStyle: 'cross-hatch',
//   }
// );

// new roughViz.Scatter(
//   {
//     element: '#vis0',
//     data: 'https://raw.githubusercontent.com/uiuc-cse/data-fa14/gh-pages/data/iris.csv',
//     title: 'Iris',
//     x: 'sepal_width',
//     y: 'petal_length',
//     color: 'species',
//     highlightLabel: 'species',
//     fillWeight: 5.1,
//     radius: 12,
//     colors: ['pink', 'coral', 'skyblue'],
//     stroke: 'black',
//     strokeWidth: .4,
//     roughness: 1,
//     // strokeWidth: 0.5,
//     // titleFontSize: '2rem',
//     // axesFontSize: '1.5rem',
//     // axisStrokeWidth: 0.4,
//     // axisRoughness: 2,
//     width: 400,
//     height: 500,
//     font: 0,
//     curbZero: false,
//     fillStyle: 'crss-hatch',
//     // highlight: 'blue'
// })

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
  width: window.innerWidth / 2,
  height: 450,
});

// new roughViz.Donut(
//   {
//     element: '#vis0',
//     data: 'https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv',
//     title: 'roughViz.js',
//     labels: 'flavor',
//     values: 'price',
//     // titleFontSize: '55px',
//     width: 150,
//     roughness: 0,
//     // radius: 'petal_width',
//     // colors: ['pink', 'coral', 'teal', 'skyblue', 'red', 'green', 'black', 'grey'],
//     // bowing: 0.1,
//     stroke: 'black',
//     highlight: 'gold',
//     strokeWidth: 4,
//     innerStrokeWidth: .5,
//     fillStyle: 'zigzag',
//     height: 150,
//     // font: 0,
//     fillWeight: 0.5,
//   }
// );

new roughViz.Pie({
  element: '#vis2',
  data: {
    labels: ['Mike', 'Jah', 'Lax', 'd', 'e', 'g', 'h', 'zero'],
    values: [13, 10, 4, 5, 6, 4, 5, 0],
  },
  title: '"Yarn" Plot (Pie)',
  // titleFontSize: '55px',
  width: window.innerWidth / 4,
  roughness: 20,
  // radius: 'petal_width',
  colors: ['red', 'orange', 'blue', 'skyblue', 'red', 'green', 'black', 'grey'],
  // bowing: 0.1,
  stroke: 'black',
  strokeWidth: 3,
  fillStyle: 'cross-hatch',
  // height: 300,
  // font: 0,
  fillWeight: 3.5,
});

// new roughViz.Donut(
//   {
//     element: '#vis2',
//     data: 'https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv',
//     title: 'roughViz.js',
//     labels: 'flavor',
//     values: 'price',
//     // titleFontSize: '55px',
//     width: 350,
//     roughness: 0,
//     // radius: 'petal_width',
//     // colors: ['pink', 'coral', 'teal', 'skyblue', 'red', 'green', 'black', 'grey'],
//     // bowing: 0.1,
//     stroke: 'black',
//     // innerStrokeWidth: 3,
//     highlight: 'green',
//     strokeWidth: 10,
//     fillStyle: 'cross-hatch',
//     height: 350,
//     // font: 0,
//     fillWeight: 2.5,
//   }
// );

// new roughViz.Donut(
//   {
//     element: '#vis3',
//     data: {
//       labels: ['Reggae', 'Jah', 'Lax', 'd'],
//       values: [40, 40, 40]
//     },
//     title: 'test',
//     // titleFontSize: '55px',
//     width: 150,
//     roughness: 4,
//     // radius: 'petal_width',
//     colors: ['pink', 'coral', 'teal', 'skyblue', 'red', 'green', 'black', 'grey'],
//     // bowing: 0.1,
//     stroke: 'black',
//     highlight: 'red',
//     strokeWidth: 1,
//     fillStyle: 'zigzag-line',
//     height: 150,
//     // font: 0,
//     fillWeight: 0.5,
//   }
// );

// new roughViz.Pie(
//   {
//     element: '#vis11',
//     data: 'https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv',
//     title: 'Pie Chart',
//     labels: 'flavor',
//     values: 'price',
//     width: 450,
//     roughness: 20,
//     radius: 'petal_width',
//     colors: ['pink', 'coral', 'teal', 'skyblue', 'red', 'green', 'black', 'grey'],
//     bowing: 0.1,
//     // stroke: 'black',
//     highlight: 'gold',
//     // fillWeight: 2,
//     strokeWidth: 0.5,
//     fillStyle: 'cross-atch',
//     height: 450,
//     curbZero: false,
//   }
// );

// new roughViz.Pie(
//     {
//       element: '#vis2',
//         data: 'https://raw.githubusercontent.com/jwilber/jenkem_data/master/regions.json',
//         title: `Pie Chart`,
//         labels: 'region',
//         values: 'count',
//         fillWeight: 1.5,
//         font: 1,
//         highlight: 'red',
//         width: 200,
//         // roughness: 5,
//         // radius: 'petal_width',
//         // colors: ['red', 'green', 'yellow', 'blue'],
//         // bowing: .1,
//         // // stroke: 'black',
//         // font: 1,
//         // strokeWidth: 2,
//         // fillStyle: 'zigzag-line',
//         height: 250,
//         // curbZero: false,
//     }
//   );

// new roughViz.BarH(
//   {
//     element: '#vis5',
//     // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
//     data: 'https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv',
//     title: 'Pradeep',
//     labels: 'letter',
//     values: 'frequency',
//     color: 'orange',
//     highlight: 'red',
//     strokeWidth: 1,
//     width: 600,
//     height: 900,
//     fillStyle: 'solid',
//     margin: {left: 150, top: 50, right: 10, bottom: 90},
//     titleFontSize: '50px',
//     roughness: 1.5,
//   }
// );

// new roughViz.Bar(
//   {
//     element: '#vis3',
//     data: 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv',
//     title: 'Olympic Medals',
//     labels: 'Country',
//     values: 'Value',
//     titleFontSize: '25px',
//     axesFontSize: '.5rem'
//     // width: 500,
//     // // roughness: 4.5,
//     // // color: 'red',
//     // // strokeWidth: 2.5,
//     // // // bowing: 1,
//     // // fillStyle: '',
//     // height: 500,
//     // margin: {bottom: 90, top: 50, right: 40, left: 90},
//     // highlight: 'yellow',
//     // interactive
//   }
// );

// new roughViz.BarH(
//   {
//     element: '#vis4',
//     // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
//     data: 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv',
//     title: 'Country Count',
//     labels: 'Country',
//     values: 'Value',
//     width: 400,
//     height: 500,
//     margin: {left: 150, top: 50, right: 10, bottom: 90},
//     roughness: 1.75,
//   }
// );

// new roughViz.Scatter(
//   {
//     element: '#vis5',
//     data: 'https://raw.githubusercontent.com/uiuc-cse/data-fa14/gh-pages/data/iris.csv',
//     title: 'Iris Scatter Plot',
//     x: 'sepal_length',
//     y: 'sepal_width',
//     width: 800,
//     roughness: 2,
//     radius: 'petal_width',
//     // radius: 20,
//     color: 'petal_width',
//     // bowing: 0.1,
//     stroke: 'black',
//     strokeWidth: .5,
//     fillStyle: 'zigzag',
//     highlight: 'red',
//     // height: 450,
//     curbZero: false,
//   }
// );

new roughViz.Bar({
  element: '#example',
  data:
    'https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv',
  labels: 'letter',
  values: 'frequency',
  height: window.innerHeight * 0.7,
  width: window.innerWidth * 0.8,
  roughness: 3,
  color: 'pink',
  fillWeight: 1,
  strokeWidth: 0.5,
  fillStyle: 'cross-hatch',
  // roughness: 0,
  stroke: 'black',
});

// new roughViz.BarH(
//   {
//     element: '#vis7',
//     // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
//     data: 'https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv',
//     title: 'Letters',
//     labels: 'letter',
//     values: 'frequency',
//     // width: 600,
//     // axisRoughness: 2,
//     // height: 800,
//     // stroke: 'black',
//     // strokeWidth: 3,
//     // innerStrokeWidth: .5,
//     // color: 'blue',
//     // margin: {left: 150, top: 50, right: 10, bottom: 90},
//     // roughness: 2.0,
//     // fillWeight: 1.5,
//     // fillStyle: 'zigzag-line'
//   }
// );

// new roughViz.StackedBar({
//   element: '#vis8',
//   data:
//     'https://gist.githubusercontent.com/mjfoster83/7c9bdfd714ab2f2e39dd5c09057a55a0/raw/2bcb1c06ece164086e556b6e7b5140cab0512bc0/age-groups.csv',
//   labels: 'State',
//   // values: 'frequency',
//   height: window.innerHeight * 0.7,
//   width: window.innerWidth * 0.8,
//   roughness: 3,
//   colors: [
//     'red',
//     'orange',
//     '#f996ae',
//     'skyblue',
//     '#9ff4df',
//     'green',
//     '#f6f0a3',
//     '#6bceee',
//     '#d9b6fd',
//   ],
//   fillWeight: 1,
//   strokeWidth: 0.5,
//   fillStyle: 'cross-hatch',
//   // roughness: 0,
//   stroke: 'black',
// });

new roughViz.StackedBar({
  element: '#vis8',
  data: [
      {month:'Jan', A:20, B: 5,  C: 10},
      {month:'Feb', A:25, B: 10, C: 20}
    
  ],
  labels: 'month',
  // values: 'frequency',
  height: window.innerHeight * 0.7,
  width: window.innerWidth * 0.8,
  roughness: 3,
  colors: [
    'red',
    'orange',
    '#f996ae',
    'skyblue',
    '#9ff4df',
    'green',
    '#f6f0a3',
    '#6bceee',
    '#d9b6fd',
  ],
  fillWeight: 1,
  strokeWidth: 0.5,
  fillStyle: 'cross-hatch',
  roughness: 0,
  stroke: 'black',
});
