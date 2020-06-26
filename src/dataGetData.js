//US//

//GET COVID Tracking US Current Stats
//All current datapoint for USA
const getDataNational = () => {
    fetch('https://covidtracking.com/api/v1/us/current.json')
    .then(response => response.json())
    .then(result => {
        console.log(result)
        //Access Results from promise object
        console.log('USA Hospitalizations: ' + result[0].hospitalized)
    })
    .catch(error => console.log('error', error));
}

//STATES//

//GET COVID Tracking State Data x CA
//All current datapoints for the States
//state argument takes a 'string' of the 2 letter code of a state
const getDataByState = (state) => {
  const url = `https://covidtracking.com/api/v1/states/${state}/current.json`
  fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('error', error));
}

//WORLD//

//GET World Total from COVID19API
//TotalConfirmed, TotalDeaths, TotalRecovered
const getDataWorld = () => {
  fetch('https://api.covid19api.com/world/total')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('error', error));
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
    console.log(`Total deaths in ${city.place.name}: ${city.dates["2020-06-24"].cumulative.deaths}`)
  })
};

//New Deaths
const getDeathsNewByCity = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
  .then(response => response.json())
  .then(data => {
    const city = data.find(city => city.place.name === string);
    console.log(`New deaths in ${city.place.name}: ${city.dates["2020-06-24"].new.deaths}`)
  })
};

//TEST FOR DATAPPOINTS - DELETE
const test = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
  .then(response => response.json())
  .then(data => {
    let newArray = [];
    const city = data.find(city => city.place.name === string);
    console.log(`New deaths in ${city.place.name}: ${city.dates["2020-06-24"].new.deaths}`)
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
    console.log(`Total cases in ${city.place.name}: ${city.dates["2020-06-24"].cumulative.cases}`)
  })
};

//New Cases
//String === "City Name"
const getCasesNewByCity = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
  .then(response => response.json())
  .then(data => {
    const city = data.find(city => city.place.name === string);
    console.log(`New cases in ${city.place.name}: ${city.dates["2020-06-24"].new.cases}`)
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
    console.log(`New cases in ${city.region.name}: ${city.dates["2020-06-24"].new.cases}`)
  })
};

//Cumulative Cases by Region
const getCasesTotalByRegion = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/regions/stats.json')
  .then (response => response.json())
  .then (data => {
    //Does using city make sense here? region gets messy
    const city = data.find(city => city.region.name === string);
    console.log(`Total cases in ${city.region.name}: ${city.dates["2020-06-24"].cumulative.cases}`)
  })
};

//New Deaths By Region
const getDeathsNewByRegion = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/regions/stats.json')
  .then (response => response.json())
  .then (data => {
    //Does using city make sense here? region gets messy
    const city = data.find(city => city.region.name === string);
    console.log(`New deaths in ${city.region.name}: ${city.dates["2020-06-24"].new.deaths}`)
  })
};

//Total Deaths By Region
const getDeathsTotalByRegion = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/regions/stats.json')
  .then (response => response.json())
  .then (data => {
    //Does using city make sense here? region gets messy
    const city = data.find(city => city.region.name === string);
    console.log(`Total Deaths in ${city.region.name}: ${city.dates["2020-06-24"].cumulative.deaths}`)
  })
};

//COUNTRIES
//GET Countries from CovidData
//China, Cambodia, Japan, Italy, South Korea 

//RED
//Proof of Concept: Extracting all datapoints from one fetch then pushing them into an array
const getDataByCountry = (string) => {
  fetch('https://coviddata.github.io/coviddata/v1/countries/stats.json')
  .then(response => response.json())
  .then(data => {
    const country = data.find(country => country.country.name === string)
    console.log(`${country.country.name} new cases - ${country.dates["2020-06-25"].new.cases}`)
    console.log(`${country.country.name} total cases- ${country.dates["2020-06-25"].cumulative.cases}`)
    const newArray = [];
    const innerArray = [];
    const date = Object.keys(country.dates)
    console.log(date)
    const newCases = country.dates["2020-06-25"].new.cases
    // const totalCases = country.dates["2020-06-25"].cumulative.cases
    for (let i = 0; i < date.length; i++) {
      let totalCases = country.dates[date[i]].cumulative.cases
      innerArray.push(Object.keys(country.dates[i]))
      innerArray.push(Object.keys())
      // innerArray.push(totalCases)
      newArray.push(innerArray);
      console.log(newArray)
      return newArray;
      
      
    }
   
    // newArray.push(date[0])
    // newArray.push(totalCases)
    // console.log(newArray)
    // return newArray;
  })
 
};
getDataByCountry("China");
export { getDataNational, getDataByState, getDataWorld, getDeathsTotalByCity, getDeathsNewByCity, getCasesTotalByCity, getCasesNewByCity, getCasesNewByRegion, getCasesTotalByRegion, getDeathsNewByRegion, getDeathsTotalByRegion, getDataByCountry };