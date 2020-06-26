import { getDataNational, getDataByState, getDataWorld, getDeathsTotalByCity, getDeathsNewByCity, getCasesTotalByCity, getCasesNewByCity, getCasesNewByRegion, getCasesTotalByRegion, getDeathsNewByRegion, getDeathsTotalByRegion, getDataByCountry } from './dataGetData';

export default function dataCallFunctions() {
    getDataNational();
    //This is wrong, needs refactored
    const ohio = getDataByState('oh');
    const florida = getDataByState('fl');
    const cali = getDataByState('ca');
    const newyork = getDataByState('ny');
    const texas = getDataByState('tx');
    getCasesTotalByCity("New York City");
    getCasesTotalByCity("Los Angeles");
    getCasesTotalByCity("Lorain");
    getDeathsTotalByCity("New York City");
    getDeathsTotalByCity("Los Angeles");
    getDeathsTotalByCity("Lorain");
    getCasesNewByCity("New York City");
    getCasesNewByCity("Los Angeles");
    getCasesNewByCity("Lorain");
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
    getDataByCountry();

    getDataWorld();
}

