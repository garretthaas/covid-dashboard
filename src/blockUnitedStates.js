import { blockUnitedStatesLineGraph } from "./blockUnitedStatesLineGraph";
import { getDataNational } from "./blockUnitedStatesDataPoints";


export default function blockUnitedStates() {   
    // cumulative cases
    blockUnitedStatesLineGraph("https://cors-anywhere.herokuapp.com/https://api.covidtracking.com/v1/us/daily.json", "positive", "cumulative-cases");

    // positive tests
    blockUnitedStatesLineGraph("https://cors-anywhere.herokuapp.com/https://api.covidtracking.com/v1/us/daily.json", "percent-positive", "positive-tests");
    
    // cumulative deaths
    blockUnitedStatesLineGraph("https://cors-anywhere.herokuapp.com/https://api.covidtracking.com/v1/us/daily.json", "death", "cumulative-deaths");
    
    // hospitalizations
    blockUnitedStatesLineGraph("https://cors-anywhere.herokuapp.com/https://api.covidtracking.com/v1/us/daily.json", "hospitalizedCurrently", "hospitalizations");

    getDataNational();

};