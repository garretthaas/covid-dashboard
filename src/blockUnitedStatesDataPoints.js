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
        
        let parent = document.querySelector('[data-parent="united-states"]')
        let printHospitalizations = parent.querySelector('[data-point="hospitalizations"]')
        .querySelector('[data-item="content"]');
        
        printHospitalizations.innerHTML = JSON.stringify(totalHospitalizedCurrent);
  
    })
    .catch(error => console.log('error', error));

  };
  
  
  export { getDataNational }