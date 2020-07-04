import { blockUnitedStatesLineGraph } from "./blockUnitedStatesLineGraph";
import { getDataNational } from "./blockUnitedStatesDataPoints";


export default function blockUnitedStates() {   
    // cumulative cases
    blockUnitedStatesLineGraph("https://covidtracking.com/api/v1/us/daily.json", "positive", "cumulative-cases");

    // positive tests
    blockUnitedStatesLineGraph("https://covidtracking.com/api/v1/us/daily.json", "positive", "positive-tests");
    
    // cumulative deaths
    blockUnitedStatesLineGraph("https://covidtracking.com/api/v1/us/daily.json", "death", "cumulative-deaths");
    
    // hospitalizations
    blockUnitedStatesLineGraph("https://covidtracking.com/api/v1/us/daily.json", "hospitalizedCumulative", "hospitalizations");

    getDataNational;

};