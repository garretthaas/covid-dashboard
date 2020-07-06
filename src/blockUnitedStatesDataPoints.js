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
            return positiveChange
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
        const hospitalizedChange = Math.round(((result[0].hospitalizedCurrently - result[1].hospitalizedCurrently) / result[1].hospitalizedCurrently) * 100);
        const hospitalizedChangeX = () => { 
          if (isNaN(hospitalizedChange)) {
            return totalHospitalizedCurrent
          } else {
            return hospitalizedChange
          }
        }
        
        let parent = document.querySelector('[data-parent="united-states"]')
        

        let printTotalCases = parent.querySelector('[data-point="cumulative-cases"]')
        .querySelector('[data-item="content"]')
        printTotalCases.innerHTML = totalCases.toLocaleString()
              
       if (Math.sign(totalChangeX()) === 1) {
        let printTotalChange = parent.querySelector('[data-point="cumulative-percent-change"]')
        .querySelector('[data-item="data"]')
        let prevDayNeg = parent.querySelector('[data-point="cumulative-percent-change"] .positive')
        //@GH — can we use .toggle here?
          if (prevDayNeg.classList.contains('negative')) {
            prevDayNeg.classList.remove('negative')
            prevDayNeg.classList.add('positive')
            printTotalChange.innerHTML = totalChangeX()  + '%'
          } else {
            let printTotalChange = parent.querySelector('[data-point="cumulative-percent-change"]')
            .querySelector('[data-item="data"]')
            printTotalChange.innerHTML = totalChangeX()  + '%'
          }
      } else {
        let printTotalChange = parent.querySelector('[data-point="cumulative-percent-change"]')
        .querySelector('[data-item="data"]')
        let prevDayPos = parent.querySelector('[data-point="cumulative-percent-change"] .negative')
        //@GH — can we use .toggle here?
        if (prevDayPos.classList.contains('positive')) {
          prevDayPos.classList.remove('positive')
          prevDayPos.classList.add('negative')
          printTotalChange.innerHTML = totalChangeX()  + '%'
          } 
      }

        let printPositiveChange = parent.querySelector('[data-point="positive-tests"]')
        .querySelector('[data-item="content')
        printPositiveChange.innerHTML = totalPositive + '%'

        // let printPrevDayPos = parent.querySelector('[data-point="positive-percent-change"]')
        // .querySelector('[data-item="data"]')
        // printPrevDayPos.innerHTML = positiveChangeX()


        if (Math.sign(positiveChangeX()) === 1) {
          console.log('Conditional 1 running')
          //scope into printing location 
          let printPrevDayPos = parent.querySelector('[data-point="positive-percent-change"]')
          .querySelector('[data-item="data"]')
          
          //scope into negative class
          let changeNegPositive = parent.querySelector('[data-point="positive-percent-change"] .negative')
           
          //if negative, statement runs changing .negative to .positive
          if (changeNegPositive.classList.contains('negative')) {
            console.log('Conditional Nested If running')
            changeNegPositive.classList.remove('negative')
            changeNegPositive.classList.add('positive')
            printPrevDayPos.innerHTML = positiveChangeX() + '%'
            } else {
              console.log('Conditional Nested If ELSE running')

              //if class is positive, print function to browser
              let printPrevDayPos = parent.querySelector('[data-point="positive-percent-change"]')
              .querySelector('[data-item="data"]')
              printPrevDayPos.innerHTML = positiveChangeX() + '%'
            }
        } else {
          console.log('Conditional ELSE running')

          //if function is negative
          //scope into printing location
          let printPrevDayPos = parent.querySelector('[data-point="positive-percent-change"]')
          .querySelector('[data-item="data"]')
          
          //scope into positive class
          let changePosPositive = parent.querySelector('[data-point="positive-percent-change"] .positive')
          
          //if .positive, change .positive to .negative
          if (changePosPositive.classList.contains('positive')) {
              changePosPositive.classList.remove('positive')
              changePosPositive.classList.add('negative')
              printPrevDayPos.innerHTML = positiveChangeX()  + '%'
            } 
        }


        let printTotalDeaths  = parent.querySelector('[data-point="cumulative-deaths"]')
        .querySelector('[data-item="content"]')
        printTotalDeaths.innerHTML = totalDeath.toLocaleString()


        if (Math.sign(deathChangeX()) === 1) {
          let printChangeDeaths = parent.querySelector('[data-point="deaths-percent-change"]')
          .querySelector('[data-item="data"]')
          let changePosDeaths = parent.querySelector('[data-point="deaths-percent-change"] .negative')
          //@GH — can we use .toggle here?
            if (changePosDeaths.classList.contains('negative')) {
              changePosDeaths.classList.remove('negative')
              changePosDeaths.classList.add('positive')
              printChangeDeaths.innerHTML = deathChangeX() + '%'
            } else {
              let printChangeDeaths = parent.querySelector('[data-point="deaths-percent-change"]')
              .querySelector('[data-item="data"]')
              printChangeDeaths.innerHTML = deathChangeX() + '%'
            }
        } else {
          let printChangeDeaths = parent.querySelector('[data-point="deaths-percent-change"]')
          .querySelector('[data-item="data"]')
          let changeNegDeaths = parent.querySelector('[data-point="deaths-percent-change"] .positive')
          //@GH — can we use .toggle here?
          if (changeNegDeaths.classList.contains('positive')) {
            changeNegDeaths.classList.remove('positive')
            changeNegDeaths.classList.add('negative')
            printChangeDeaths.innerHTML = deathChangeX()  + '%'
            } 
        }
      

        let printHospitalizations = parent.querySelector('[data-point="hospitalizations"]')
        .querySelector('[data-item="content"]')
        printHospitalizations.innerHTML = totalHospitalizedCurrent.toLocaleString();

        // let printHospitalizationChange = parent.querySelector('[data-point="hospitalized-percent-change"]')
        // .querySelector('[data-item="data"]')
        // printHospitalizationChange.innerHTML = hospitalizedChangeX()
        
        //if statement determines if +/-
        if (Math.sign(hospitalizedChangeX()) === 1) {
          
          //scope into printing location 
          let printChangeHospitalized = parent.querySelector('[data-point="hospitalized-percent-change"]')
          .querySelector('[data-item="data"]')
          
          //scope into negative class
          let changeNegHospitalized = parent.querySelector('[data-point="hospitalized-percent-change"] .positive')
           
          //if negative, statement runs changing .negative to .positive
          if (changeNegHospitalized.classList.contains('negative')) {
            changeNegHospitalized.classList.remove('negative')
            changeNegHospitalized.classList.add('positive')
            printChangeHospitalized.innerHTML = hospitalizedChangeX() + '%'
            } else {
              
              //if class is positive, print function to browser
              let printChangeHospitalized = parent.querySelector('[data-point="hospitalized-percent-change"]')
              .querySelector('[data-item="data"]')
              printChangeHospitalized.innerHTML = hospitalizedChangeX() + '%'
            }
        } else {
          
          //if function is negative
          //scope into printing location
          let printChangeHospitalized = parent.querySelector('[data-point="hospitalized-percent-change"]')
          .querySelector('[data-item="data"]')
          
          //scope into positive class
          let changePosHospitalized = parent.querySelector('[data-point="hospitalized-percent-change"] .negative')
          
          //if .positive, change .positive to .negative
          if (changePosHospitalized.classList.contains('positive')) {
            changePosHospitalized.classList.remove('positive')
            changePosHospitalized.classList.add('negative')
            printChangeHospitalized.innerHTML = hospitalizedChangeX()  + '%'
            } 
        }
        
    })
    .catch(error => console.log('error', error));

  };
  
  
  export { getDataNational }