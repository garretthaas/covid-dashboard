export const visLineChart = (dataUrl, dataCountry, dataCat, dataPoint) => { 

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    // parse the one / time
    var parseTime = d3.timeParse("%Y-%m-%d");
    
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
    
    var svg = d3.select(`[data-parent="${dataCountry}"] [data-point="${dataCat}-${dataPoint}"] [data-item="line-graph"]`).append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    // get the data
    const getDataByCountry = () => {
        // set up the object
        let dataArray = [];
        const dataArrayObjects = {};
      
        // fetch the data
        fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
      
          // this is unique to the data at https://coviddata.github.io/coviddata/v1/countries/stats.json
            function findIndexWithAttr(array, name, parent, attr) {
                for(var i = 0; i < array.length; i += 1) {
                    if(array[i][parent][attr] === name) {
                        return i;
                    }
                }
                return -1;
            }
            const index = findIndexWithAttr(data, dataCountry, 'country', 'key');
            console.log(index);
          
          let scope = data[index]; // set the scope
          let scopeName = scope.country.name; // get the name of the scope (in this case country name)
          let dataOne = scope.dates; // drill down to the arrays of dates
          
          
          
          // this iterates over and separates the arrays of dates
          Object.keys(dataOne).forEach(function (key){
            let one = key;
            let dataOneEach = dataOne[key]; // separates all the data in the dates so we can drill down further
            let two = dataOneEach[dataCat][dataPoint]; // get cumulative cases
      
            // now we take those pieces of info and make them an array
            let result = ({one, two});
            dataArray.push(result);
          });
      
          // console.log(dataArray);
          
                // format the data
                dataArray.forEach(function(d) {
                    d.one = parseTime(d.one);
                    d.two = +d.two;
                });      
        
                
                // scale the range of the data
                x.domain(d3.extent(dataArray, function(d) { return d.one; }));
                y.domain([0, d3.max(dataArray, function(d) { return d.two; })]);
                
                let patternId = `pattern-circles-${dataCat}-${dataPoint}`,
                    patternURL = `url(#${patternId})`,
                    clipId = `image-clip-${dataCat}-${dataPoint}`,
                    clipURL = `url(#${clipId})`,
                    backgroundSize = 300;
                // add the background image pattern
                svg.append("pattern")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", backgroundSize)
                .attr("height", backgroundSize)
                .attr("patternUnits", "userSpaceOnUse")
                .attr("patternContentUnits", "userSpaceOnUse")
                .attr("id", patternId)
                .append("image")
                  .attr("width", backgroundSize)
                  .attr("height", backgroundSize)
                  .attr("xlink:href", "./dist/images/scatter-dots.jpg")
                  .attr("preserveAspectRatio", "xMidYMin slice");

                // add the clipping path
                // as the area
                svg.append("clipPath")
                  .attr("id", clipId)
                  .append("path")
                    .data([dataArray])
                    .attr("class", "area")
                    .attr("d", area);

                // add the shape to be clipped
                svg.append("rect")
                    .attr("clip-path", clipURL)
                    .attr("id", "rect")
                    .attr("x", "0")
                    .attr("y", "0")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .attr("fill", patternURL);
                    
                // add the area
                // svg.append("path")
                    // .data([dataArray])
                    // .attr("class", "area")
                    // .attr("d", area);

                
                
                // add the valueline path.
                svg.append("path")
                    .data([dataArray])
                    .attr("class", "line")
                    .attr("d", valueline);
                
                // // add the X Axis
                // svg.append("g")
                //     .attr("transform", "translate(0," + height + ")")
                //     .call(d3.axisBottom(x));
                
                // // add the Y Axis
                // svg.append("g")
                //     .call(d3.axisLeft(y));
                
                
                });
                
          
    };


    getDataByCountry();
};
    