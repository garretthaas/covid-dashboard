const getDataNational = () => {

    fetch('https://covidtracking.com/api/v1/us/daily.json')
    .then(response => response.json())
    .then(result => {

        //Storing calculations in variables and handling edge cases
        const totalCases = result[0].positive
        const totalRollingAverage = () => {
          //Array of all cases by day
          let weeklyCases = []
          
          //Loop through API to fill weeklyCases array
          for (let i = 0; i < 7; i++) {
           let dailyPositive = result[i].positive
           weeklyCases.push(dailyPositive)
          }
          console.log(weeklyCases)
          let totalRollingAverage = (weeklyCases.reduce((a, b) => a + b, 0) / 7)
          console.log(`Cases rolling Average: ${totalRollingAverage}`)

        }
        totalRollingAverage();

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
        

        //DOM Manipulation
        let parent = document.querySelector('[data-parent="united-states"]')
        
        let printTotalCases = parent.querySelector('[data-point="cumulative-cases"] [data-item="content"]')
        printTotalCases.innerHTML = totalCases.toLocaleString()
        
        //REFACTOR NAMING CONVENTION
       if (Math.sign(totalChangeX()) === 1) {
        let prevDayNeg = parent.querySelector('[data-point="cumulative-percent-change"] .detail')
        console.log(prevDayNeg.classList)

        //@GH — can we use .toggle here?
          if (prevDayNeg.classList.contains('negative')) {
            prevDayNeg.classList.remove('negative')
            prevDayNeg.classList.add('positive')

            prevDayNeg.innerHTML = totalChangeX()  + '%'
          } else {
            let printTotalChange = parent.querySelector('[data-point="cumulative-percent-change"] [data-item="data"]')
            printTotalChange.innerHTML = totalChangeX()  + '%'
          }
      } else {
        let prevDayPos = parent.querySelector('[data-point="cumulative-percent-change"] .detail')

        //@GH — can we use .toggle here?
        if (prevDayPos.classList.contains('positive')) {
          prevDayPos.classList.remove('positive')
          prevDayPos.classList.add('negative')

          prevDayPos.innerHTML = totalChangeX()  + '%' 
          } else {
            let printTotalChange = parent.querySelector('[data-point="cumulative-percent-change"] [data-item="data"]')
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
          //scope into printing location 
          let printPrevDayPos = parent.querySelector('[data-point="positive-percent-change"] [data-item="data"]')
          
          //scope into negative class
          let changeNegPositive = parent.querySelector('[data-point="positive-percent-change"] .detail')
           
          //if negative, statement runs changing .negative to .positive
          if (changeNegPositive.classList.contains('negative')) {
            changeNegPositive.classList.remove('negative')
            changeNegPositive.classList.add('positive')
            changeNegPositive.innerHTML = positiveChangeX() + '%'
            } else {
              //if class is positive, print function to browser
              printPrevDayPos.innerHTML = positiveChangeX() + '%'
            }
        } else {
          //if function is negative
          //scope into printing location
          let printPrevDayPos = parent.querySelector('[data-point="positive-percent-change"] [data-item="data"]')
          
          //scope into positive class
          let changePosPositive = parent.querySelector('[data-point="positive-percent-change"] .detail')

          
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
          let changePosDeaths = parent.querySelector('[data-point="deaths-percent-change"] .detail')
          //@GH — can we use .toggle here?
            if (changePosDeaths.classList.contains('negative')) {
              changePosDeaths.classList.remove('negative')
              changePosDeaths.classList.add('positive')
              changePosDeaths.innerHTML = deathChangeX() + '%'
            } else {
              printChangeDeaths.innerHTML = deathChangeX() + '%'
            }
        } else {
          let changeNegDeaths = parent.querySelector('[data-point="deaths-percent-change"] .detail')
          //@GH — can we use .toggle here?
          if (changeNegDeaths.classList.contains('positive')) {
            changeNegDeaths.classList.remove('positive')
            changeNegDeaths.classList.add('negative')
            changeNegDeaths.innerHTML = deathChangeX()  + '%'
            } else {
              printChangeDeaths.innerHTML = deathChangeX() + '%'
            }
        }
      
        let printHospitalizations = parent.querySelector('[data-point="hospitalizations"] [data-item="content"]')
        printHospitalizations.innerHTML = totalHospitalizedCurrent.toLocaleString();

        // let printHospitalizationChange = parent.querySelector('[data-point="hospitalized-percent-change"]')
        // .querySelector('[data-item="data"]')
        // printHospitalizationChange.innerHTML = hospitalizedChangeX()
        
        //if statement determines if +/-
        if (Math.sign(hospitalizedChangeX()) === 1) {
          //scope into negative class
          let changeNegHospitalized = parent.querySelector('[data-point="hospitalized-percent-change"] .detail')
          //if negative, statement runs changing .negative to .positive
          if (changeNegHospitalized.classList.contains('negative')) {
                changeNegHospitalized.classList.remove('negative')
                changeNegHospitalized.classList.add('positive')
                changeNegHospitalized.innerHTML = hospitalizedChangeX() + '%'
            } else {
              //if class is positive, print function to browser
              //scope into printing location 
              let printHospitalizationChange = parent.querySelector('[data-point="hospitalized-percent-change"] [data-item="data"]')
              printHospitalizationChange.innerHTML = hospitalizedChangeX() + '%'
            }
        } else {
          
          //if function is negative

          //scope into positive class
          let changePosHospitalized = parent.querySelector('[data-point="hospitalized-percent-change"] .detail')
          console.log('else')
          console.log(changePosHospitalized)

          //if .positive, change .positive to .negative
          if (changePosHospitalized.classList.contains('positive')) {
              changePosHospitalized.classList.remove('positive')
              changePosHospitalized.classList.add('negative')
              changePosHospitalized.innerHTML = hospitalizedChangeX()  + '%'
            } else {
              //if class is positive, print function to browser
              
              //scope into printing location
              let printHospitalizationChange = parent.querySelector('[data-point="hospitalized-percent-change"] [data-item="data"]')
              printHospitalizationChange.innerHTML = hospitalizedChangeX()
            }
        }
        
    })
    .catch(error => console.log('error', error));

  };
  
  
  export { getDataNational }