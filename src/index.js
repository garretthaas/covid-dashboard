import _ from 'lodash';
import { module } from './module';
import blockUnitedStates from './blockUnitedStates';
import blockCounty from './blockCounty';

blockUnitedStates();
blockCounty();


module;
function component() {
    const element = document.createElement('p');
    element.classList.add('callout')
  
    // Lodash, now imported by this script
    element.innerHTML = _.join([' '], ' ');
  
    return element;
  } 
  
  document.body.appendChild(component());
 
 
