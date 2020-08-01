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
          //Reduce to 7-day average
          let currentDailyChange = totalDailyChange.reduce((a, b) => a + b) / 7;
          return currentDailyChange.toFixed(1);
        };

        //Positive Percentage of Total Tests
        const totalPositive = ((result[0].positive / result[0].negative) * 100).toFixed(1);

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
          
          };
          
          let currentDeathChange =  deathsDailyChange.reduce((a, b) => a + b) / 7;
          return currentDeathChange.toFixed(1);
        
        };

        
        //Current Hospitalizations
        const totalHospitalizedCurrent = result[0].hospitalizedCurrently;
        
        const hopitalizedChangeRollingAverage = () => {
          let hospitalizedDailyChange = [];

          for (let i = 0; i < 7; i++) {
            let hospitalizedChange = (result[i].hospitalizedCurrently - result[i+1].hospitalizedCurrently) / result[i+1].hospitalizedCurrently * 100;
            hospitalizedDailyChange.push(hospitalizedChange);
          };

          let currentHospitalizedChange = hospitalizedDailyChange.reduce((a, b) => a + b) / 7;
          return currentHospitalizedChange.toFixed(1);
        
        };



        //DOM Manipulation
        let parent = document.querySelector('[data-parent="united-states"]');
        
        //Total Cases United States
        let printTotalCases = parent.querySelector('[data-point="cumulative-cases"] [data-item="content"]');
        printTotalCases.innerHTML = totalCases.toLocaleString();
        
        //Total Cases 7-day average
        let handleCasesClassChange = parent.querySelector('[data-point="cumulative-percent-change"] .detail');
        let printTotalChange = parent.querySelector('[data-point="cumulative-percent-change"] [data-item="data"]');

        //IF 7-day average is positive && class is negative, change the class to positive. ELSE, Print 7-day average.
        //This changes the direction of the arrow on the page.
        if (Math.sign(Number(totalChangeRollingAverage())) === 1) {
            if (handleCasesClassChange.classList.contains('negative')) {
              handleCasesClassChange.classList.remove('negative');
              handleCasesClassChange.classList.add('positive');
              printTotalChange.innerHTML = totalChangeRollingAverage()  + '%';
            } else {
              printTotalChange.innerHTML = totalChangeRollingAverage()  + '%';
            }
        };
        
        //IF 7-day average is negative && class is positive, change the class to negative. ELSE, Print 7-day average.
        //This changes the direction of the arrow on the page.
        if (Math.sign(Number(totalChangeRollingAverage())) === -1) {
          if (handleCasesClassChange.classList.contains('positive')) {
            handleCasesClassChange.classList.remove('negative');
            handleCasesClassChange.classList.add('add');
            printTotalChange.innerHTML = totalChangeRollingAverage()  + '%';
          } else {
            printTotalChange.innerHTML = totalChangeRollingAverage()  + '%';
          }
        };



        //Positive Percentage of Total Cases
        let printPositiveChange = parent.querySelector('[data-point="positive-tests"] [data-item="content"]');
        printPositiveChange.innerHTML = totalPositive + '%';

        //Positive Percentage 7-day average
        //Scope into printing location
        
        //Scope into class
        let handlePositiveClassChange = parent.querySelector('[data-point="positive-percent-change"] .detail');
        let printPositiveRollingAverage = parent.querySelector('[data-point="positive-percent-change"] [data-item="data"]');

       if (Math.sign(Number(positiveChangeRollingAverage())) === 1) {
        if (handlePositiveClassChange.classList.contains('negative')) {
          handlePositiveClassChange.classList.remove('negative');
          handlePositiveClassChange.classList.add('positive');
          printPositiveRollingAverage.innerHTML = positiveChangeRollingAverage() + '%';
          } else {
            printPositiveRollingAverage.innerHTML = positiveChangeRollingAverage() + '%';
          }
       };

       if (Math.sign(Number(positiveChangeRollingAverage())) === -1) {
         if (handlePositiveClassChange.classList.contains('positive')) {
           handlePositiveClassChange.classList.remove('positive');
           handlePositiveClassChange.classList.add('negative');
           printPositiveRollingAverage.innerHTML = positiveChangeRollingAverage() + '%';
         } else {
         printPositiveRollingAverage.innerHTML = positiveChangeRollingAverage() + '%';
        }
       };

       

        //Total Deaths
        let printTotalDeaths  = parent.querySelector('[data-point="cumulative-deaths"] [data-item="content"]')
        printTotalDeaths.innerHTML = totalDeath.toLocaleString()

        //Total Deaths 7-day average

          //Scope into death change
          let handleDeathChange = parent.querySelector('[data-point="deaths-percent-change"] .detail')
          let printDeathChange = parent.querySelector('[data-point="deaths-percent-change"] [data-item="data"]')
        
          //Handle Class Change
          if (Math.sign(Number(deathChangeRollingAverage())) === 1) {
            if (handleDeathChange.classList.contains('negative')) {
              handleDeathChange.classList.remove('negative');
              handleDeathChange.classList.add('positive');
              printDeathChange.innerHTML = deathChangeRollingAverage() + '%';
            } else {
              printDeathChange.innerHTML = deathChangeRollingAverage() + '%';
            }
          };

          if (Math.sign(Number(deathChangeRollingAverage())) === -1) {
            if (handleDeathChange.classList.contains('positive')) {
              handleDeathChange.classList.add('negative');
              handleDeathChange.classList.remove('positive');
              handleDeathChange.innerHTML = deathChangeRollingAverage() + '%';
            } else {
              handleDeathChange.innerHTML = deathChangeRollingAverage() + '%';
            }
          };

        

        //Current Hospitalizations
        let printCurrentHospitalizations = parent.querySelector('[data-point="hospitalizations"] [data-item="content"]');
        printCurrentHospitalizations.innerHTML = totalHospitalizedCurrent.toLocaleString();

        //Hospitalizations Change
        let handleHospitalizedClass = parent.querySelector('[data-point="hospitalized-percent-change"] .detail')
        let printHospitalizationChange = parent.querySelector('[data-point="hospitalized-percent-change"] [data-item="data"]');
        
          //Handle Postive Change Hospitalized
          if (Math.sign(Number(hopitalizedChangeRollingAverage())) === 1) {
            if (handleHospitalizedClass.classList.contains('negative')) {
              handleHospitalizedClass.classList.remove('negative');
              handleHospitalizedClass.classList.add('positive');
            } else {
              printHospitalizationChange.innerHTML = hopitalizedChangeRollingAverage() + '%'
            }
          };
        
          // Handle Negative Change Hospitalized
          if (Math.sign(Number(hopitalizedChangeRollingAverage())) === -1) {
            if (handleHospitalizedClass.classList.contains('positive')) {
                handleHospitalizedClass.classList.remove('positive')
                handleHospitalizedClass.classList.add('negative')
                printHospitalizationChange.innerHTML = hopitalizedChangeRollingAverage() + '%'
              } else {
                printHospitalizationChange.innerHTML = hopitalizedChangeRollingAverage() + '%'
              }
          };

       
    })
    .catch(error => console.log('error', error));

  };
  
  
  export { getDataNational };