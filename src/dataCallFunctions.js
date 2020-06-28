import { getDataNational, getDataByState, getDataWorld, getDeathsNewByCity, getCasesTotalByCity, getCasesNewByCity, getCasesNewByRegion, getCasesTotalByRegion, getDeathsNewByRegion, getDeathsTotalByRegion, getDataByCountry, getDataByPlaces } from './dataGetData';

export default function dataCallFunctions() {
    getDataNational();
    //This is wrong, needs refactored
    // const ohio = getDataByState('oh', 'positive');
    // const florida = getDataByState('fl', 'positive');
    // const cali = getDataByState('ca', 'positive');
    // const newyork = getDataByState('ny', 'positive');
    // const texas = getDataByState('tx', 'positive');
    
    getCasesNewByRegion("Tokyo");
    getCasesNewByRegion("Hong Kong");
    getCasesNewByRegion("Sichuan");
    getCasesTotalByRegion("Tokyo");
    getCasesTotalByRegion("Hong Kong");
    getCasesTotalByRegion("Sichuan");
    getDeathsNewByRegion("Tokyo");
    getDeathsNewByRegion("Hong Kong");
    getDeathsNewByRegion("Sichuan");
    getDeathsTotalByRegion("Tokyo");
    getDeathsTotalByRegion("Hong Kong");
    getDeathsTotalByRegion("Sichuan");
    getDataByPlaces("Lorain");
    getDataByPlaces("Los Angeles");
    getDataByCountry();
    getDataWorld();
}

