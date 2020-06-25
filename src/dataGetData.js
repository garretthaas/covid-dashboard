//US//

//GET COVID Tracking US Current Stats
//All current datapoint for USA
const getDataNational = () => {
    fetch('https://covidtracking.com/api/v1/us/current.json')
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const dataNational = document.getElementById('dataNational')
        const resultRendered = JSON.stringify(result, null, 2)
        dataNational.innerHTML = resultRendered
        //Access Results from promise object
        console.log('USA Hospitalizations: ' + result[0].hospitalized)
    })
    .catch(error => console.log('error', error));
}
const USA = getDataNational();
 
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

// const ohio = getDataByState('oh');
// const florida = getDataByState('fl');
// const cali = getDataByState('ca');
// const newyork = getDataByState('ny');
// const texas = getDataByState('tx');

//WORLD//

//GET World Total from COVID19API
//TotalConfirmed, TotalDeaths, TotalRecovered
const getDataWorld = () => {
  fetch('https://api.covid19api.com/world/total')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('error', error));
}


// CITY/TERRITORY //
//GET locatities from CovidData


//COUNTRIES
//GET Countries from CovidData

export { getDataNational, getDataByState, getDataWorld };