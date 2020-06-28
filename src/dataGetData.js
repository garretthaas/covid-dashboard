//COVID Dashboard API GETS
//API soruces in use:
//National and State Data
//COVID Tracking Project: https://covidtracking.com/api
//Country, Region, & County Data
//CovidData: https://coviddata.github.io/coviddata/#api
//World Data
//COVID19 API: https://api.covid19api.com/


//TO-DO
//[] 1. Refator Regions using GH logic
//
//US//

//GET COVID Tracking US Current Stats
//All current datapoint for USA
const getDataNational = () => {
  fetch('https://covidtracking.com/api/v1/us/daily.json')
  .then(response => response.json())
  .then(result => {
      // const totalCases = result[0].positive
      // const totalChange = Math.round(((result[0].positive - result[1].positive) / result[1].positive)  * 100);
      // const totalPositive = Math.round(((result[0].positive / result[0].negative) * 100));
      // const positiveChange = Math.round(((result[0].positiveIncrease - result[1].positiveIncrease) / result[1].positiveIncrease) * 100);
      // const totalDeath = result[0].death;
      // const deathChange = Math.round(((result[0].deathIncrease - result[1].deathIncrease) / result[1].deathIncrease) * 100);
      // const totalHospitalizedCurrent = result[0].hospitalizedCurrently;
      // const hospitalizedChange = ((result[0].hospitalizedCurrently - result[1].hospitalizedCurrently) / result[1].hospitalizedCurrently) * 100;
      
      // console.log(`United States Total Cases: ${totalCases}`);
      // console.log(`United States Total Percentage Change: ${totalChange}%`);
      // console.log(`United States Daily Positive Percentage: ${totalPositive}%`);
      // console.log(`United States Positive vs Prev Day: ${positiveChange}%`);
      // console.log(`United States Total Deaths: ${totalDeath}`);
      // console.log(`United States Deaths vs Prev Day: ${deathChange}%`)
      // console.log(`United States Total Hospitalizations: ${totalHospitalizedCurrent}`)
      // console.log(`United States Hospitalized vs. Prev Day: ${hospitalizedChange.toFixed(2)}%`)
  })
  .catch(error => console.log('error', error));
}

//STATES//

//GET COVID Tracking State Data
//All current datapoints for the States
//Argument takes a 'string' of the 2 letter code of a state
//Relavent Datapoints:
//date, state, positive, negative, hospitalizedCurrently, hospitalizedCumulative, lastUpdatedEt, death, positiveIncrease, total, hospitalizedIncrease, deathIncrease
const getDataByState = (state, dataPoint) => {
const url = `https://covidtracking.com/api/v1/states/${state}/current.json`
fetch(url)
.then(response => response.json())
.then(data => {
  const attr = data[dataPoint]
  return console.log(JSON.stringify(attr));
});
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

//PLACES (Counties)
//GET Places from CovidData
//Argument takes a string with a county name. e.g. "Los Angeles", "Lorain"
const getDataByPlaces = (string) => {
  // set up the data array
  let dataArray = [];
  let allDates = [];

  // fetch the data
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
  .then(response => response.json())
  .then(data => {
    
    //@GH - I edited this to abstract the the argument
    let scope = data.find(place => place.place.name === string) // set the scope
    console.log(scope)
    //@GH - I edited this for Place 
    let scopeName = scope.place.name; // get the name of the scope (in this case country name) to print as a title
    let dataOne = scope.dates; // drill down to the arrays of dates
    
    // this iterates over and separates the arrays of dates console.log(key) to see it
    Object.keys(dataOne).forEach(function (key){
     
      //let one = key; // make this the first data point
      let one = key;
      //console.log(one);
      let dataOneEach = dataOne[key]; // separates all the data in the dates so we can drill down further
      let two = dataOneEach.cumulative.cases; // get cumulative cases and make it the second data point (this can be changed to any nested key in the dates array)

      // now we take those data points and make them an array
      let result = ({one, two});
      dataArray.push(result);

      //push all dates into an array to find current data day and previous day
      allDates.push(one)
    
    });

    //datapoints for places(LA, Lorain, etc.)
    const todayDate = allDates[allDates.length-1];
    const yesterdayDate = allDates[allDates.length-2];
    const casesTotal = dataOne[todayDate].cumulative.cases;
    const casesNew = dataOne[todayDate].new.cases;
    const casesChange = Math.round(((dataOne[todayDate].new.cases - dataOne[yesterdayDate].new.cases) / dataOne[yesterdayDate].new.cases) * 100);
    const deathsTotal = dataOne[todayDate].cumulative.deaths
    const deathsNew = dataOne[todayDate].new.deaths
    const deathsChange = Math.round(((dataOne[todayDate].new.deaths - dataOne[yesterdayDate].new.deaths) / dataOne[yesterdayDate].new.deaths) * 100);

    console.log(`Total Cases: ${casesTotal}`)
    console.log(`New Cases: ${casesNew}`)
    console.log(`Total Case % change vs. previous day: ${casesChange}%`)
    console.log(`Total Deaths: ${deathsTotal}`)
    console.log(`New Deaths: ${deathsNew}`)
    console.log(`Total Death % change vs. previous day: ${deathsChange}%`)

  })

  return dataArray; // needed to use this in  visLineChart.js (check in there for changes). I couldn't figure out how to export the data. to mess with it

};


//COUNTRIES
//GET Countries from CovidData
//"China", "Cambodia", Japan, Italy, South Korea 

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
      //let one = key; // make this the first data point
      let one = key;
      //console.log(one);
      let dataOneEach = dataOne[key]; // separates all the data in the dates so we can drill down further
      let two = dataOneEach.cumulative.cases; // get cumulative cases and make it the second data point (this can be changed to any nested key in the dates array)

      // now we take those data points and make them an array
      let result = ({one, two});
      dataArray.push(result);
      
    });
  })

  return dataArray; // needed to use this in  visLineChart.js (check in there for changes). I couldn't figure out how to export the data. to mess with it
 
};

export { getDataNational, getDataByState, getDataWorld, getCasesNewByRegion, getCasesTotalByRegion, getDeathsNewByRegion, getDeathsTotalByRegion, getDataByCountry, getDataByPlaces };