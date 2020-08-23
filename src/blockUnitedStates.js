import { blockUnitedStatesLineGraph } from "./blockUnitedStatesLineGraph";
import { getDataNational } from "./blockUnitedStatesDataPoints";


export default function blockUnitedStates() {   
    // cumulative cases
    blockUnitedStatesLineGraph("https://api.covidtracking.com/v1/us/daily.json", "positive", "cumulative-cases");

    // positive tests
    blockUnitedStatesLineGraph("https://api.covidtracking.com/v1/us/daily.json", "percent-positive", "positive-tests");
    
    // cumulative deaths
    blockUnitedStatesLineGraph("https://api.covidtracking.com/v1/us/daily.json", "death", "cumulative-deaths");
    
    // hospitalizations
    blockUnitedStatesLineGraph("https://api.covidtracking.com/v1/us/daily.json", "hospitalizedCurrently", "hospitalizations");

    getDataNational();

};