import _ from 'lodash';
import { module } from './module';
import { getDataNational, getDataByState, getDataWorld } from './dataGetData.js'
import dataCallFunctions from './dataCallFunctions.js';
import { visLineChart } from './visLineChart';



// testing d3 visualization - delete when done
visLineChart("https://coviddata.github.io/coviddata/v1/countries/stats.json", "india");
visLineChart("https://coviddata.github.io/coviddata/v1/countries/stats.json", "russia");


//Call all API gets

dataCallFunctions();

module;
function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'Garrett'], ' ');
  
    return element;
  } 
  
  document.body.appendChild(component());
  