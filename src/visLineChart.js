import { getDataByCountry } from './dataGetData';
export const visLineChart = () => { 

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    // parse the one / time
    var parseTime = d3.timeParse("%Y-%b-%d");
    
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    // define the area
    var area = d3.area()
        .x(function(d) { return x(d.one); })
        .y0(height)
        .y1(function(d) { return y(d.two); });
    
    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.one); })
        .y(function(d) { return y(d.two); });
    
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // get the data
    const getDataByCountry = () => {
        // set up the object
        let dataArray = [];
        const dataArrayObjects = {};
      
        // fetch the data
        fetch('https://coviddata.github.io/coviddata/v1/countries/stats.json')
        .then(response => response.json())
        .then(data => {
      
          // this is unique to the data at https://coviddata.github.io/coviddata/v1/countries/stats.json
          let scope = data[0]; // set the scope
          let scopeName = scope.country.name; // get the name of the scope (in this case country name)
          let dataOne = scope.dates; // drill down to the arrays of dates
          
          
          
          // this iterates over and separates the arrays of dates
          Object.keys(dataOne).forEach(function (key){
              console.log(key);
            let one = key;
            let dataOneEach = dataOne[key]; // separates all the data in the dates so we can drill down further
            let two = dataOneEach.cumulative.cases; // get cumulative cases
      
            // now we take those pieces of info and make them an array
            let result = ({one, two});
            dataArray.push(result);
          });
      
          console.log(dataArray);
          
                // format the data
                dataArray.forEach(function(d) {
                    d.one = parseTime(d.one);
                    d.two = +d.two;
                });      
        
                
                // scale the range of the data
                x.domain(d3.extent(dataArray, function(d) { return d.one; }));
                y.domain([0, d3.max(dataArray, function(d) { return d.two; })]);
                
                // add the area
                    svg.append("path")
                    .data([dataArray])
                    .attr("class", "area")
                    .attr("d", area);
                
                // add the valueline path.
                svg.append("path")
                    .data([dataArray])
                    .attr("class", "line")
                    .attr("d", valueline);
                
                // add the X Axis
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));
                
                // add the Y Axis
                svg.append("g")
                    .call(d3.axisLeft(y));
                
                });
          
    };

    getDataByCountry();

};
    