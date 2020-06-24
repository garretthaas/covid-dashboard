import _ from 'lodash';
import { module } from './module';

module;
function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'Ricky'], ' ');
  
    return element;
  } 
  
  document.body.appendChild(component());
  
  index.html