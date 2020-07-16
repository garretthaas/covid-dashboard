export const blockUnitedStatesLineGraph = (dataUrl, dataPoint, selector) => { 

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    // parse the one / time
    var parseTime = d3.timeParse("%Y%m%d");
    var formatPercent = d3.format("+.0%");
    
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
    
    var svg = d3.select(`[data-parent="united-states"] [data-point="${selector}"] [data-item="line-graph"]`).append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    // get the data
    const getUSData = () => {
        // set up the object
        let dataArray = [];
        const dataArrayObjects = {};
      
        // fetch the data
        fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data);

            if (dataPoint == "percent-positive") {
        
                for (var i = 0, len = data.length; i < len; i++) { 
                    let one = data[i].date;
                    let twoCalc = ((data[i].positive / data[i].total) * 100);
                    let twoCheck = () => {
                        if (isNaN(twoCalc) || twoCalc == Number.POSITIVE_INFINITY || twoCalc == Number.NEGATIVE_INFINITY) {
                          return 0
                        } else {
                          return twoCalc
                        }
                      }
                    let two = twoCheck();

                    // get percent positive
                    // console.log("percentage calc: " + two);

                    // now we take those pieces of info and make them an array
                    let result = ({one, two});
                    dataArray.push(result);
                    

                }
                // console.log(dataArray);
            } else {
                for (var i = 0, len = data.length; i < len; i++) { 
                    let one = data[i].date;
                    let two = data[i][dataPoint]; // get cumulative cases

                    // now we take those pieces of info and make them an array
                    let result = ({one, two});
                    dataArray.push(result);

                }
            }
            // console.log(dataArray);
          
                // format the data
                dataArray.forEach(function(d) {
                    d.one = parseTime(d.one);
                    d.two = +d.two;
                });      
        
                
                // scale the range of the data
                x.domain(d3.extent(dataArray, function(d) { return d.one; }));
                y.domain([0, d3.max(dataArray, function(d) { return d.two; })]);
                
                let patternId = `pattern-circles-${selector}`,
                    patternURL = `url(#${patternId})`,
                    clipId = `image-clip-${selector}`,
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

    getUSData();
};
    