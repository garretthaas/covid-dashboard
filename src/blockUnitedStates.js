import { visLineChart } from "./visLineChart";



export default function blockUnitedStates() {
    // cumulative cases
    console.log("HEY GARRY" + getDataNational.totalCases);
    visLineChart("https://coviddata.github.io/coviddata/v1/countries/stats.json", "united-states", "cumulative", "cases");
    
    // cumulative deaths
    visLineChart("https://coviddata.github.io/coviddata/v1/countries/stats.json", "united-states", "cumulative", "deaths");
};