const getDataNational = () => {

    fetch('https://covidtracking.com/api/v1/us/daily.json')
    .then(response => response.json())
    .then(result => {

        //Storing calculations in variables and handling rolling averages
        //Total Cases
        const totalCases = result[0].positive;

        const totalChangeRollingAverage = () => {
          //Initialize an array of positive case day-over-day percentage change
          let totalDailyChange = [];

          //Loop through API to fill totalDailyChange
          for (let i = 0; i < 7; i++) {
            //Day over Day case change formula
            let dailyChange = (result[i].positive - result[i+1].positive) / result[i+1].positive  * 100;
           
            //Pushing daily results to array
            totalDailyChange.push(dailyChange);
          };
          //Reduce to 7 day average
          let currentDailyChange = totalDailyChange.reduce((a, b) => a + b) / 7;
          return currentDailyChange.toFixed(1);
        };


        //Positive Percentage of Total Tests
        const totalPositive = Math.round(((result[0].positive / result[0].negative) * 100));

        const positiveChangeRollingAverage = () => {
          let positiveDailyChange = [];
          
          for (let i = 0; i < 7; i++) {
            let positiveChange = Math.round(((result[i].positiveIncrease - result[i+1].positiveIncrease) / result[i+1].positiveIncrease) * 100);
            positiveDailyChange.push(positiveChange);
          };

          let currentPositiveChange = positiveDailyChange.reduce((a, b) => a+b) / 7;
          return currentPositiveChange.toFixed(1);
        
        };
        

        //Total Deaths
        const totalDeath = result[0].death;

        const deathChangeRollingAverage = () => {
          let deathsDailyChange = [];

          for (let i = 0; i < 7; i++) {
            let deathChange = (result[i].deathIncrease - result[i+1].deathIncrease) / result[i+1].deathIncrease * 100;
            deathsDailyChange.push(deathChange);
          }
          let currentDeathChange =  deathsDailyChange.reduce((a, b) => a + b) / 7;
          return currentDeathChange.toFixed(1);
        }


        //Current Hospitalizations
        const totalHospitalizedCurrent = result[0].hospitalizedCurrently;
        
        const hopitalizedChangeRollingAverage = () => {
          let hospitalizedDailyChange = [];

          for (let i = 0; i < 7; i++) {
            let hospitalizedChange = (result[i].hospitalizedCurrently - result[i+1].hospitalizedCurrently) / result[i+1].hospitalizedCurrently * 100;
            hospitalizedDailyChange.push(hospitalizedChange);
          }
          let currentHospitalizedChange = hospitalizedDailyChange.reduce((a, b) => a + b) / 7;
          return currentHospitalizedChange.toFixed(1);
        }

        

        //DOM Manipulation
        let parent = document.querySelector('[data-parent="united-states"]');
        
        //Total Cases United States
        let printTotalCases = parent.querySelector('[data-point="cumulative-cases"] [data-item="content"]');
        printTotalCases.innerHTML = totalCases.toLocaleString();
        
        //REFACTOR NAMING CONVENTION
        //Total Cases 7-day average
       if (Math.sign(totalChangeRollingAverage()) === 1) {
        let prevDayNeg = parent.querySelector('[data-point="cumulative-percent-change"] .detail');

        //@GH — can we use .toggle here?
          if (prevDayNeg.classList.contains('negative')) {
            prevDayNeg.classList.remove('negative');
            prevDayNeg.classList.add('positive');
            prevDayNeg.innerHTML = totalChangeRollingAverage()  + '%';
          } else {
            let printTotalChange = parent.querySelector('[data-point="cumulative-percent-change"] [data-item="data"]');
            printTotalChange.innerHTML = totalChangeRollingAverage()  + '%';
          }
      };

        //Positive Percentage of Total Cases
        let printPositiveChange = parent.querySelector('[data-point="positive-tests"] [data-item="content"]');
        printPositiveChange.innerHTML = totalPositive + '%';
        console.log(totalPositive);

        //Positive Percentage 7-day average
        if (Math.sign(positiveChangeRollingAverage()) === 1) {
          //Scope into printing location 
          let printPrevDayPos = parent.querySelector('[data-point="positive-percent-change"] [data-item="data"]');
          
          //Scope into negative class
          let changeNegPositive = parent.querySelector('[data-point="positive-percent-change"] .detail');
           
          //If negative, statement runs changing .negative to .positive
          if (changeNegPositive.classList.contains('negative')) {
            changeNegPositive.classList.remove('negative');
            changeNegPositive.classList.add('positive');
            changeNegPositive.innerHTML = positiveChangeRollingAverage() + '%';
            } else {
              //if class is positive, print function to browser
              printPrevDayPos.innerHTML = positiveChangeRollingAverage() + '%';
            }
        };


        //Total Deaths
        let printTotalDeaths  = parent.querySelector('[data-point="cumulative-deaths"] [data-item="content"]')
        printTotalDeaths.innerHTML = totalDeath.toLocaleString()

        //Total Deaths 7-day average
        if (Math.sign(deathChangeRollingAverage()) === 1) {
          let changePosDeaths = parent.querySelector('[data-point="deaths-percent-change"] .detail')
          //@GH — can we use .toggle here?
            if (changePosDeaths.classList.contains('negative')) {
              changePosDeaths.classList.remove('negative')
              changePosDeaths.classList.add('positive')
              changePosDeaths.innerHTML = deathChangeRollingAverage() + '%'
            } else {
              changePosDeaths.innerHTML = deathChangeRollingAverage() + '%'
            }
        };
        

        //Current Hospitalizations
        let printCurrentHospitalizations = parent.querySelector('[data-point="hospitalizations"] [data-item="content"]');
        printCurrentHospitalizations.innerHTML = totalHospitalizedCurrent.toLocaleString();
        
        //Conditional statement determines if +/-
        if (Math.sign(hopitalizedChangeRollingAverage()) === 1) {
          //scope into negative class
          let changeNegHospitalized = parent.querySelector('[data-point="hospitalized-percent-change"] .detail');
          //if negative, statement runs changing .negative to .positive
          if (changeNegHospitalized.classList.contains('negative')) {
                changeNegHospitalized.classList.remove('negative');
                changeNegHospitalized.classList.add('positive');
                changeNegHospitalized.innerHTML = hopitalizedChangeRollingAverage() + '%';
            } else {
              //if class is positive, print function to browser
              //scope into printing location 
              let printHospitalizationChange = parent.querySelector('[data-point="hospitalized-percent-change"] [data-item="data"]');
              printHospitalizationChange.innerHTML = hopitalizedChangeRollingAverage() + '%';
            }
        };
        
    })
    .catch(error => console.log('error', error));

  };
  
  
  export { getDataNational };