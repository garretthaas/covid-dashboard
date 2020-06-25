import { getDataNational, getDataByState, getDataWorld } from './dataGetData';

export default function dataCallFunctions() {
    getDataNational();
    //This is wrong, needs refactored
    const ohio = getDataByState('oh');
    const florida = getDataByState('fl');
    const cali = getDataByState('ca');
    const newyork = getDataByState('ny');
    const texas = getDataByState('tx');
    getDataWorld();
}

