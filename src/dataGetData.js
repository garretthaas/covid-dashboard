//US//

//GET COVID Tracking US Current Stats
//All current datapoint for USA
const getDataNational = () => {
    fetch('https://covidtracking.com/api/v1/us/current.json')
    .then(response => response.json())
    .then(result => {
        // console.log(result)
        //Access Results from promise object
        // console.log('USA Hospitalizations: ' + result[0].hospitalized)
    })
    // .catch(error => console.log('error', error));
}

//STATES//

//GET COVID Tracking State Data x CA
//All current datapoints for the States
//state argument takes a 'string' of the 2 letter code of a state
const getDataByState = (state) => {
  const url = `https://covidtracking.com/api/v1/states/${state}/current.json`
  fetch(url)
  .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.log('error', error));
}

//WORLD//

//GET World Total from COVID19API
//TotalConfirmed, TotalDeaths, TotalRecovered
const getDataWorld = () => {
  fetch('https://api.covid19api.com/world/total')
  .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.log('error', error));
}

// CITIES //
//GET places from CovidData
//Cases, Deaths
//TO-DO
//[] 1. Write function to insert current date as YYYY-MM-DD

//Cumulative Deaths
//string === "City Name"
const getDeathsTotalByCity = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
  .then(response => response.json())
  .then(data => {
    const city = data.find(city => city.place.name === string);
    // console.log(`Total deaths in ${city.place.name}: ${city.dates["2020-06-24"].cumulative.deaths}`)
  })
};

//New Deaths
const getDeathsNewByCity = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
  .then(response => response.json())
  .then(data => {
    const city = data.find(city => city.place.name === string);
    // console.log(`New deaths in ${city.place.name}: ${city.dates["2020-06-24"].new.deaths}`)
  })
};

//TEST FOR DATAPPOINTS - DELETE
const test = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
  .then(response => response.json())
  .then(data => {
    let newArray = [];
    const city = data.find(city => city.place.name === string);
    // console.log(`New deaths in ${city.place.name}: ${city.dates["2020-06-24"].new.deaths}`)
    newArray.push(Object.values(city))
  })
};

test("Sullivan");


//Cumulative Cases
//string === "City Name"
const getCasesTotalByCity = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
  .then(response => response.json())
  .then(data => {
    const city = data.find(city => city.place.name === string);
    // console.log(`Total cases in ${city.place.name}: ${city.dates["2020-06-24"].cumulative.cases}`)
  })
};

//New Cases
//String === "City Name"
const getCasesNewByCity = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
  .then(response => response.json())
  .then(data => {
    const city = data.find(city => city.place.name === string);
    // console.log(`New cases in ${city.place.name}: ${city.dates["2020-06-24"].new.cases}`)
  })
};

//REGIONS     
//Tokyo, Hong Kong, Sichuan

//New Cases by Region
const getCasesNewByRegion = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/regions/stats.json')
  .then (response => response.json())
  .then (data => {
    //Does using city make sense here? region gets messy
    const city = data.find(city => city.region.name === string);
    // console.log(`New cases in ${city.region.name}: ${city.dates["2020-06-24"].new.cases}`)
  })
};

//Cumulative Cases by Region
const getCasesTotalByRegion = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/regions/stats.json')
  .then (response => response.json())
  .then (data => {
    //Does using city make sense here? region gets messy
    const city = data.find(city => city.region.name === string);
    // console.log(`Total cases in ${city.region.name}: ${city.dates["2020-06-24"].cumulative.cases}`)
  })
};

//New Deaths By Region
const getDeathsNewByRegion = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/regions/stats.json')
  .then (response => response.json())
  .then (data => {
    //Does using city make sense here? region gets messy
    const city = data.find(city => city.region.name === string);
    // console.log(`New deaths in ${city.region.name}: ${city.dates["2020-06-24"].new.deaths}`)
  })
};

//Total Deaths By Region
const getDeathsTotalByRegion = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/regions/stats.json')
  .then (response => response.json())
  .then (data => {
    //Does using city make sense here? region gets messy
    const city = data.find(city => city.region.name === string);
    // console.log(`Total Deaths in ${city.region.name}: ${city.dates["2020-06-24"].cumulative.deaths}`)
  })
};

//COUNTRIES
//GET Countries from CovidData
//China, Cambodia, Japan, Italy, South Korea 

//RED
//Proof of Concept: Extracting all datapoints from one fetch then pushing them into an array
const getDataByCountry = () => {
  // set up the data array
  let dataArray = [];

  // fetch the data
  fetch('https://coviddata.github.io/coviddata/v1/countries/stats.json')
  .then(response => response.json())
  .then(data => {

    // this is unique to the data at https://coviddata.github.io/coviddata/v1/countries/stats.json
    let scope = data[0]; // set the scope
    let scopeName = scope.country.name; // get the name of the scope (in this case country name) to print as a title
    let dataOne = scope.dates; // drill down to the arrays of dates
    
    // this iterates over and separates the arrays of dates console.log(key) to see it
    Object.keys(dataOne).forEach(function (key){
      let one = key; // make this the first data point
      let dataOneEach = dataOne[key]; // separates all the data in the dates so we can drill down further
      let two = dataOneEach.cumulative.cases; // get cumulative cases and make it the second data point (this can be changed to any nested key in the dates array)

      // now we take those data points and make them an array
      let result = ({one, two});
      dataArray.push(result);
    });
    
  })

  // console.log(dataArray); // needed to use this in  visLineChart.js (check in there for changes). I couldn't figure out how to export the data. to mess with it
 
};

export { getDataNational, getDataByState, getDataWorld, getDeathsTotalByCity, getDeathsNewByCity, getCasesTotalByCity, getCasesNewByCity, getCasesNewByRegion, getCasesTotalByRegion, getDeathsNewByRegion, getDeathsTotalByRegion, getDataByCountry };