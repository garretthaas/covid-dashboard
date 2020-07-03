import _ from 'lodash';
import { module } from './module';
import dataCallFunctions from './dataCallFunctions.js';
import blockUnitedStates from './blockUnitedStates';

blockUnitedStates();

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
  