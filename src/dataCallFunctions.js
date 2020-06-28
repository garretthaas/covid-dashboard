import { getDataNational, getDataByState, getDataWorld, getDeathsNewByCity, getCasesTotalByCity, getCasesNewByCity, getDataByRegion, getCasesNewByRegion, getCasesTotalByRegion, getDeathsNewByRegion, getDeathsTotalByRegion, getDataByCountry, getDataByPlaces } from './dataGetData';

export default function dataCallFunctions() {
    getDataNational();
    //This is wrong, needs refactored
    const ohio = getDataByState('oh', 'positive');
    const florida = getDataByState('fl', 'positive');
    const cali = getDataByState('ca', 'positive');
    const newyork = getDataByState('ny', 'positive');
    const texas = getDataByState('tx', 'positive');
    getDataByRegion("Tokyo");
    getDataByRegion("Hong Kong");
    getDataByRegion("Sichuan");
    getDataByPlaces("Lorain");
    getDataByPlaces("Los Angeles");
    getDataByCountry("Belize");
    getDataWorld();
}

