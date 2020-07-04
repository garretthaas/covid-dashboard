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
      const casesChangeX = () => {
        if (isNaN(casesChange)) {
          return `0`
        } else { 
          return casesChange
        }
      }
      const totalDeaths = dataOne[todayDate].cumulative.deaths
      const deathsNew = dataOne[todayDate].new.deaths
      const deathsChange = Math.round(((dataOne[todayDate].new.death - dataOne[yesterdayDate].new.deaths) / dataOne[yesterdayDate].new.deaths) * 100);
      const deathsChangeX = () => {
        if (isNaN(deathsChange)) {
          return `0`
        } else {
          return deathsChange
        }
      }
      
      console.log(`${scopeName} Total Cases: ${casesTotal}`)
      console.log(`${scopeName} New Cases: ${casesNew}`)
      console.log(`${scopeName} Total Case % change vs. previous day: ${casesChangeX()}%`)
      console.log(`${scopeName} Total Deaths: ${totalDeaths}`)
      console.log(`${scopeName} New Deaths: ${deathsNew}`)
      console.log(`${scopeName} Total Death % change vs. previous day: ${deathsChangeX()}%`)
      console.log(`${scopeName} Total Death % change vs. previous day: ${deathsChangeX()}%`)
     
    //The [data-parent="XXX"] query in HTML must match the scope.place.key from the CovidData API.
    if (string){
    let parent = document.querySelector(`[data-parent="${scope.place.key}"]`)
    let dataOne = parent.querySelector('[data-point="cumulative-cases"]')
    .querySelector('[data-item="content"]')
    dataOne.innerHTML = casesTotal.toLocaleString()

    let dataTwo = parent.querySelector('[data-point="new-cases"]')
    .querySelector('[data-item="content"]')
    dataTwo.innerHTML = casesNew.toLocaleString()

    let dataThree = parent.querySelector('[data-point="cases-percent-change"]')
    .querySelector('[data-item="content"]') 
    dataThree.innerHTML = casesChangeX() + '%'
    //HELP!!!
    let dataFour = parent.querySelector('[data-point="total-deaths"]')
    .querySelector('[data-item="content"]')
    dataFour.innerHTNL = totalDeaths

    let dataFive = parent.querySelector('[data-point="new-deaths"]')
    .querySelector('[data-item="content"]')
    dataFive.innerHTML = deathsNew

    let dataSix = parent.querySelector('[data-point="deaths-percent-change"]')
    .querySelector('[data-item="content"]')
    dataSix.innerHTML = deathsChangeX() + '%'

    }

 })

    return dataArray; // needed to use this in  visLineChart.js (check in there for changes). I couldn't figure out how to export the data. to mess with it
  
  };

  export { getDataByPlaces }