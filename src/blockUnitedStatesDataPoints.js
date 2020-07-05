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
       
        let printTotalChange = parent.querySelector('[data-point="cumulative-percent-change"]')
        .querySelector('[data-item="data"]')
        printTotalChange.innerHTML = JSON.stringify(totalChangeX()) + '%'

        let printPositiveChange = parent.querySelector('[data-point="positive-tests"]')
        .querySelector('[data-item="content')
        printPositiveChange.innerHTML = JSON.stringify(totalPositive) + '%'

        let printPrevDayPos = parent.querySelector('[data-point="positive-percent-change"]')
        .querySelector('[data-item="data"]')
        printPrevDayPos.innerHTML = JSON.stringify(positiveChangeX()) + '%'

        let printTotalDeaths  = parent.querySelector('[data-point="cumulative-deaths"]')
        .querySelector('[data-item="content"]')
        printTotalDeaths.innerHTML = totalDeath.toLocaleString()

        let printPrevDayDeaths = parent.querySelector('[data-point="deaths-percent-change"]')
        .querySelector('[data-item="data"]')
        printPrevDayDeaths.innerHTML = JSON.stringify(deathChangeX()) + '%'

        let printHospitalizations = parent.querySelector('[data-point="hospitalizations"]')
        .querySelector('[data-item="content"]')
        printHospitalizations.innerHTML = totalHospitalizedCurrent.toLocaleString();

        let printHospitalizationChange = parent.querySelector('[data-point="hospitalized-percent-change"]')
        .querySelector('[data-item="data"]')
        printHospitalizationChange.innerHTML = JSON.stringify(hospitalizedChangeX()) + '%'
        
    })
    .catch(error => console.log('error', error));

  };
  
  
  export { getDataNational }