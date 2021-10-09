//COVID Dashboard API GETS
//API soruces in use:
//National and State Data
//COVID Tracking Project: https://covidtracking.com/api
//Country, Region, & County Data
//CovidData: https://coviddata.github.io/coviddata/#api
//World Data
//COVID19 API: https://api.covid19api.com/

//TO-DO
//[x] 1. Refator Regions using GH logic
//[x] 2. Refactor Countries using GH logic
//[] 3. Get datapoints by State - @GH - where should we handle this? 
//[x] 4. How do we handle 'no new deaths' on day over day percentage? Returns NaN currently.
//[] 5. Optimize API load times?
        // I was thinking about this. Probably a good thing to do would be to write a script
        // that parses the data with python and saves a CSV daily. that way we have only the 
        // data we need, and it's not happening at site load time. I realize now we may have 
        // done it a very expensive way.

//US//
//GET COVID Tracking US Current Stats
//All current datapoints for USA
const getDataNational = () => {

  fetch('https://covidtracking.com/api/v1/us/daily.json')
  .then(response => response.json())
  .then(result => {
      const totalCases = result[0].positive
      const totalChange = Math.round(((result[0].positive - result[1].positive) / result[1].positive)  * 100);
      const totalChangeX = () => {
        if (isNaN(totalChange)) {
          return totalCases
        } else {
          return totalChange
        }
      }
      const totalPositive = Math.round(((result[0].positive / result[0].negative) * 100));
      const positiveChange = Math.round(((result[0].positiveIncrease - result[1].positiveIncrease) / result[1].positiveIncrease) * 100);
      const positiveChangeX = () => {
        if (isNaN(positiveChange)) {
          return totalPositive
        } else {
          return totalChange
        }
      }
      const totalDeath = result[0].death;
      const deathChange = Math.round(((result[0].deathIncrease - result[1].deathIncrease) / result[1].deathIncrease) * 100);
      const deathChangeX = () => {
        if (isNaN(deathChange)) {
          return totalDeath
        } else {
          return deathChange
        }
      }
      const totalHospitalizedCurrent = result[0].hospitalizedCurrently;
      const hospitalizedChange = ((result[0].hospitalizedCurrently - result[1].hospitalizedCurrently) / result[1].hospitalizedCurrently) * 100;
      const hospitalizedChangeX = () => {
        if (isNaN(hospitalizedChange)) {
          return totalHospitalizedCurrent
        } else {
          return hospitalizedChange
        }
      }

      let element = document.getAttribute('data-parent', 'united-states')
      .getAttribute('data-point', 'cumulative-cases')
      .getAttribute('data-item', 'content');
      element.innerHTML = JSON.stringify(totalCases)

      return { totalCases, totalChange, totalChange, totalDeath, totalHospitalizedCurrent, totalPositive, positiveChange, deathChange, hospitalizedChange };
  })
  .catch(error => console.log('error', error));
}

//STATES//

//GET COVID Tracking State Data
//All current datapoints for the States
//Argument takes a lowercase 'string' of the 2 letter code of a state
//Relavent Datapoints:
//date, state, positive, negative, hospitalizedCurrently, hospitalizedCumulative, lastUpdatedEt, death, positiveIncrease, total, hospitalizedIncrease, deathIncrease
const getDataByState = (state, dataPoint, target) => {
const url = `https://covidtracking.com/api/v1/states/${state}/current.json`
fetch(url)
.then(response => response.json())
.then(data => {
  const attr = data[dataPoint]
  // return console.log(JSON.stringify(attr));
})
.catch(error => console.log('error', error));

}


//REGIONS
//GET Regions from CovidData
//Argument takes a string with a county name. e.g. "Tokyo", "Hong Kong", "Sichuan"
//String must be in Title Case
const getDataByRegion = (string, dataPoint) => {
  // set up the data array
  let dataArray = [];
  let allDates = [];

  // fetch the data
  fetch('https://coviddata.github.io/coviddata/v1/regions/stats.json')
  .then(response => response.json())
  .then(data => {
    
    //@GH - I edited this to abstract the the argument
    let scope = data.find(region => region.region.name === string) // set the scope
    //@GH - I edited this for Region
    let scopeName = scope.region.name; // get the name of the scope (in this case country name) to print as a title
    let dataOne = scope.dates; // drill down to the arrays of dates
    
    // this iterates over and separates the arrays of dates console.log(key) to see it
    Object.keys(dataOne).forEach(function (key){
     
      //let one = key; // make this the first data point
      let one = key;
      let dataOneEach = dataOne[key]; // separates all the data in the dates so we can drill down further
      let two = dataOneEach.cumulative.cases; // get cumulative cases and make it the second data point (this can be changed to any nested key in the dates array)

      // now we take those data points and make them an array
      let result = ({one, two});
      dataArray.push(result);

      //push all dates into an array to find current data day and previous day
      allDates.push(one)
    });
    
    //datapoints for regions(Tokyo, Sichuan, Hong Kong, etc.)
    const todayDate = allDates[allDates.length-1];
    const yesterdayDate = allDates[allDates.length-2];
    const casesTotal = dataOne[todayDate].cumulative.cases;
    const casesNew = dataOne[todayDate].new.cases;
    const casesChange = Math.round(((dataOne[todayDate].new.cases - dataOne[yesterdayDate].new.cases) / dataOne[yesterdayDate].new.cases) * 100);
    const casesChangeX = () => {
      if (isNaN(casesChange)) {
        return `N/A`
      } else {
        return casesChange
      }
    }
    const deathsTotal = dataOne[todayDate].cumulative.deaths
    const deathsNew = dataOne[todayDate].new.deaths
    const deathsChange = Math.round(((dataOne[todayDate].new.deaths - dataOne[yesterdayDate].new.deaths) / dataOne[yesterdayDate].new.deaths) * 100);
    const deathsChangeX = () => {
      if (isNaN(deathsChange)) {
        return `N/A`
      } else {
        return deathsChange
      }
    }

    //Log datapoints in the console
    // console.log(`${scopeName} New Cases: ${casesNew}`)
    // console.log(scopeName);
    // console.log(`${scopeName} Total Case % change vs. previous day: ${casesChangeX()}%`)
    // console.log(`${scopeName} Total Deaths: ${deathsTotal}`)
    // console.log(`${scopeName} New Deaths: ${deathsNew}`)
    // console.log(`${scopeName} Total Death % change vs. previous day: ${deathsChangeX()}%`)
    
    //Print variables onto index.html - @GH, this is currently printing all Regions for onto the page when called
    if (scopeName === 'Tokyo') {
    var mainContainer = document.getElementById('tokyoCases');
    var div = document.createElement("div");
    div.innerHTML = `${scopeName} Region Cases Total: ${casesTotal}`
    mainContainer.appendChild(div);}
  })

   return dataArray; // needed to use this in  visLineChart.js (check in there for changes). I couldn't figure out how to export the data. to mess with it

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
      // let result = ({one, two});
      // dataArray.push(result);

      //push all dates into an array to find current data day and previous day
      allDates.push(one)
    
    });

    //datapoints for places(LA, Lorain, etc.)
    const todayDate = allDates[allDates.length-1];
    const yesterdayDate = allDates[allDates.length-2];
    const casesTotal = dataOne[todayDate].cumulative.cases;
    const casesNew = dataOne[todayDate].new.cases;
    const casesChange = Math.round(((dataOne[todayDate].new.cases - dataOne[yesterdayDate].new.cases) / dataOne[yesterdayDate].new.cases) * 100);
    const casesChangeX = () => {
      if (isNaN(casesChange)) {
        return `N/A`
      } else {
        return casesChange
      }
    }
    const dataPoint = dataOne[todayDate].cumulative.deaths
    const deathsNew = dataOne[todayDate].new.deaths
    const deathsChange = Math.round(((dataOne[todayDate].new.deaths - dataOne[yesterdayDate].new.deaths) / dataOne[yesterdayDate].new.deaths) * 100);
    const deathsChangeX = () => {
      if (isNaN(deathsChange)) {
        return `N/A`
      } else {
        return deathsChange
      }
    }

    // console.log(`${scopeName} Total Cases: ${casesTotal}`)
    // console.log(`${scopeName} New Cases: ${casesNew}`)
    // console.log(`${scopeName} Total Case % change vs. previous day: ${casesChangeX()}%`)
    // console.log(`${scopeName} Total Deaths: ${dataPoint}`)
    // console.log(`${scopeName} New Deaths: ${deathsNew}`)
    // console.log(`${scopeName} Total Death % change vs. previous day: ${deathsChangeX()}%`)

  })

  return dataArray; // needed to use this in  visLineChart.js (check in there for changes). I couldn't figure out how to export the data. to mess with it

};


//COUNTRIES
//GET Countries from CovidData
//String must be Title Case
//"China", "Cambodia", "Japan", "Italy", "South Korea" 

const getDataByCountry = (string) => {
  // set up the data array
  let dataArray = [];
  let allDates = [];

  // fetch the data
  fetch('https://coviddata.github.io/coviddata/v1/countries/stats.json')
  .then(response => response.json())
  .then(data => {

    //@GH - I edited this to abstract the the argument
    let scope = data.find(country => country.country.name === string) // set the scope
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
      // dataArray.push(result);

      //push all dates into an array to find current data day and previous day
      allDates.push(one)
    
    });

    //datapoints for countries(Italy, South Korea, etc.)
    const todayDate = allDates[allDates.length-1];
    const yesterdayDate = allDates[allDates.length-2];
    const casesTotal = dataOne[todayDate].cumulative.cases;
    const casesNew = dataOne[todayDate].new.cases;
    const casesChange = Math.round(((dataOne[todayDate].new.cases - dataOne[yesterdayDate].new.cases) / dataOne[yesterdayDate].new.cases) * 100);
    const casesChangeX = () => {
      if (isNaN(casesChange)) {
        return `N/A`
      } else {
        return casesChange
      }
    }

    const dataPoint = dataOne[todayDate].cumulative.deaths
    const deathsNew = dataOne[todayDate].new.deaths
    const deathsChange = Math.round(((dataOne[todayDate].new.deaths - dataOne[yesterdayDate].new.deaths) / dataOne[yesterdayDate].new.deaths) * 100);
    const deathsChangeX = () => {
      if (isNaN(deathsChange)) {
        return `N/A`
      } else {
        return deathsChange
      }
    }

    console.log(`${scopeName} Total Cases: ${casesTotal}`)
    console.log(`${scopeName} New Cases: ${casesNew}`)
    console.log(`${scopeName} Total Case % change vs. previous day: ${casesChangeX()}%`)
    console.log(`${scopeName} Total Deaths: ${dataPoint}`)
    console.log(`${scopeName} New Deaths: ${deathsNew}`)
    console.log(`${scopeName} Total Death % change vs. previous day: ${deathsChangeX()}%`)

  })

  return dataArray; // needed to use this in  visLineChart.js (check in there for changes). I couldn't figure out how to export the data. to mess with it
 
};

//WORLD//

//GET World Total from COVID19API
//TotalConfirmed, TotalDeaths, TotalRecovered
const getDataWorld = () => {
  fetch('https://api.covid19api.com/world/total')
  .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.log('error', error));
}

export { getDataNational, getDataByState, getDataWorld, getDataByRegion, getDataByCountry, getDataByPlaces };