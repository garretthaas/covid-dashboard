import _ from 'lodash';
import { module } from './module';
import blockUnitedStates from './blockUnitedStates';
import blockCounty from './blockCounty';

blockUnitedStates();
blockCounty();


module;
function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'Garrett'], ' ');
  
    return element;
  } 
  
  document.body.appendChild(component());
  