import _ from 'lodash';
import { module } from './module';
import { getDataNational, getDataByState, getDataWorld } from './dataGetData.js'
import dataCallFunctions from './dataCallFunctions.js';

//Call all API gets//
dataCallFunctions();

module;
function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'Garrett'], ' ');
  
    return element;
  } 
  
  document.body.appendChild(component());
  