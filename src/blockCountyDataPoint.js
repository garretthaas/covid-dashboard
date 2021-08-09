//PLACES (Counties)
//GET Places from CovidData
//Argument takes a string with a county name. e.g. "Los Angeles", "Lorain"
const getDataByPlaces = (string) => {
  // set up the data array
  let dataArray = [];

  // fetch the data
  fetch('https://coviddata.github.io/coviddata/v1/places/stats.json')
    .then((response) => response.json())
    .then((data) => {
      //@GH - I edited this to abstract the the argument
      let scope = data.find((place) => place.place.name === string); // set the scope
      //@GH - I edited this for Place
      let scopeName = scope.place.name; // get the name of the scope (in this case country name) to print as a title
      let dataOne = scope.dates; // drill down to the arrays of dates

      // this iterates over and separates the arrays of dates console.log(key) to see it
      Object.keys(dataOne).forEach(function (key) {
        //let one = key; // make this the first data point
        let one = key;
        //console.log(one);
        let dataOneEach = dataOne[key]; // separates all the data in the dates so we can drill down further
        let two = dataOneEach.cumulative.cases; // get cumulative cases and make it the second data point (this can be changed to any nested key in the dates array)

        // now we take those data points and make them an array
        let result = { one, two };
        dataArray.push(result);
      });

      //An array full of all current API dates available is stored in `dataArray`
      //datapoints for places(LA, Lorain, etc.)
      const todayDate = dataArray[dataArray.length - 1].one;
      const yesterdayDate = dataArray[dataArray.length - 2].one;
      const casesTotal = dataOne[todayDate].cumulative.cases;
      const casesNew = dataOne[todayDate].new.cases;

      //7 Day Rolling Average Percentage Change in Cases. Inherently handles previous edge cases by evening out days with 0 cases.
      const casesChangeRollingAverage = () => {
        //Initialize array to hold calulated averages
        let dailyTotalCases = [];

        //Loop through calculations to populate array
        for (let j = 0; j < 7; j++) {
          //Scope into iterable dates
          let y2 = dataArray[dataArray.length - (j + 1)].one;
          let y1 = dataArray[dataArray.length - (j + 2)].one;

          //Get daily day-over-day averages
          let dailyNewCases =
            ((dataOne[y2].new.cases - dataOne[y1].new.cases) /
              dataOne[y1].new.cases) *
            100;

          //Check if the number is finite to avoid edge cases errors due to 0 cases/bad data from API
          if (isFinite(dailyNewCases)) {
            //Push data to array
            dailyTotalCases.push(dailyNewCases);
          } else {
            //Push 0 to array if Inifinity is present
            dailyTotalCases.push(0);
          }

          //Find 7-day average
          let currentCasesChange = dailyTotalCases.reduce((a, b) => a + b) / 7;
          return currentCasesChange.toFixed(1);
        }
      };

      //Deaths
      const totalDeaths = dataOne[todayDate].cumulative.deaths;
      const deathsNew = dataOne[todayDate].new.deaths;

      const deathChangeRollingAverage = () => {
        let dailyTotalDeath = [];

        for (let j = 0; j < 7; j++) {
          let y2 = dataArray[dataArray.length - (j + 1)].one;
          let y1 = dataArray[dataArray.length - (j + 2)].one;

          let dailyNewDeath =
            ((dataOne[y2].new.deaths - dataOne[y1].new.deaths) /
              dataOne[y1].new.deaths) *
            100;
          if (isFinite(dailyNewDeath)) {
            dailyTotalDeath.push(dailyNewDeath);
          } else {
            dailyTotalDeath.push(0);
          }
        }
        let currentAvgDeath = dailyTotalDeath.reduce((a, b) => a + b) / 7;
        return currentAvgDeath.toFixed(1);
      };

      //DOM Manipulation
      //The [data-parent="XXX"] query in HTML must match the scope.place.key from the CovidData API.
      if (string) {
        let parent = document.querySelector(
          `[data-parent="${scope.place.key}"]`
        );
        let dataOne = parent.querySelector(
          '[data-point="cumulative-cases"] [data-item="content"]'
        );
        dataOne.innerHTML = casesTotal.toLocaleString();

        let dataTwo = parent.querySelector(
          '[data-point="new-cases"] [data-item="content"]'
        );
        dataTwo.innerHTML = casesNew.toLocaleString();

        if (Math.sign(casesChangeRollingAverage()) === 1) {
          let prevDayNeg = parent.querySelector(
            '[data-point="cases-percent-change"] .callout'
          );
          //@GH — can we use .toggle here?
          if (prevDayNeg.classList.contains('negative')) {
            prevDayNeg.classList.remove('negative');
            prevDayNeg.classList.add('positive');
            prevDayNeg.innerHTML = casesChangeRollingAverage() + '%';
          } else {
            let printCasesChange = parent.querySelector(
              '[data-point="cases-percent-change"] [data-item="content"]'
            );
            printCasesChange.innerHTML = casesChangeRollingAverage() + '%';
          }
        } else {
          let prevDayPos = parent.querySelector(
            '[data-point="cases-percent-change"] .callout'
          );

          //@GH — can we use .toggle here?
          if (prevDayPos.classList.contains('positive')) {
            prevDayPos.classList.remove('positive');
            prevDayPos.classList.add('negative');
            prevDayPos.innerHTML = casesChangeRollingAverage() + '%';
          } else {
            let dataThree = parent.querySelector(
              '[data-point="cases-percent-change"] [data-item="content"]'
            );
            dataThree.innerHTML = casesChangeRollingAverage() + '%';
          }
        }

        let dataFour = parent.querySelector(
          '[data-point="total-deaths"] [data-item="content"]'
        );
        dataFour.innerHTML = totalDeaths.toLocaleString();

        let dataFive = parent.querySelector(
          '[data-point="new-deaths"] [data-item="content"]'
        );
        dataFive.innerHTML = deathsNew.toLocaleString();

        if (Math.sign(deathChangeRollingAverage()) === 1) {
          let prevDayNeg = parent.querySelector(
            '[data-point="deaths-percent-change"] .callout'
          );
          //@GH — can we use .toggle here?
          if (prevDayNeg.classList.contains('negative')) {
            prevDayNeg.classList.remove('negative');
            prevDayNeg.classList.add('positive');
            prevDayNeg.innerHTML = deathChangeRollingAverage() + '%';
          } else {
            let dataSix = parent.querySelector(
              '[data-point="deaths-percent-change"] [data-item="content"]'
            );
            dataSix.innerHTML = deathChangeRollingAverage() + '%';
          }
        } else {
          let prevDayPos = parent.querySelector(
            '[data-point="deaths-percent-change"] .callout'
          );

          //@GH — can we use .toggle here?
          if (prevDayPos.classList.contains('positive')) {
            prevDayPos.classList.remove('positive');
            prevDayPos.classList.add('negative');
            prevDayPos.innerHTML = deathChangeRollingAverage() + '%';
          } else {
            let dataSix = parent.querySelector(
              '[data-point="deaths-percent-change"] [data-item="content"]'
            );
            dataSix.innerHTML = deathChangeRollingAverage() + '%';
          }
        }
      }
    });

  return dataArray; // needed to use this in  visLineChart.js (check in there for changes). I couldn't figure out how to export the data to mess with it.
};

export { getDataByPlaces };
