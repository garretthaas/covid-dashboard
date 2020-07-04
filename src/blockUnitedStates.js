import { visLineChart } from "./visLineChart";



export default function blockUnitedStates() {
    // cumulative cases
    visLineChart("https://covidtracking.com/api/v1/us/daily.json", "cumulative", "cases");
    
    // cumulative deaths
    visLineChart("https://covidtracking.com/api/v1/us/daily.json", "cumulative", "deaths");
};