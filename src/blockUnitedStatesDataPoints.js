export const getDataNational = (dataURL, dataPoint) => {

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
  
        return { totalCases, totalChange, totalChange, totalDeath, totalHospitalizedCurrent, totalPositive, positiveChange, deathChange, hospitalizedChange };
  
        console.log(`United States Total Cases: ${totalCases}`);
        console.log(`United States Total Percentage Change: ${totalChangeX()}%`);
        console.log(`United States Daily Positive Percentage: ${totalPositive}%`);
        console.log(`United States Positive vs Prev Day: ${positiveChangeX()}%`);
        console.log(`United States Total Deaths: ${totalDeath}`);
        console.log(`United States Deaths vs Prev Day: ${deathChangeX()}%`)
        console.log(`United States Total Hospitalizations: ${totalHospitalizedCurrent}`)
        console.log(`United States Hospitalized vs. Prev Day: ${hospitalizedChangeX().toFixed(2)}%`)
        
  
        // const printData = (dataPoint, target) => {
        //   const parent = document.getElementById("united-states");
        //     parent.querySelector(target).querySelector('.current')
        // }
  
        // printData(total-cases, total-cases);
        
        // // print individual data points to the DOM
        // let 
        //   parent = document.getElementById("united-states"),
        //   totalCases = parent.getElementsByClassName("hero--title")
  
        //   ;
  
    })
    .catch(error => console.log('error', error));
  }
  