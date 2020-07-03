import { visLineChart } from "./visLineChart";

export default function blockUnitedStates() {
    // cumulative cases
visLineChart("https://coviddata.github.io/coviddata/v1/countries/stats.json", "united-states", "cumulative", "cases");

// cumulative deaths
visLineChart("https://coviddata.github.io/coviddata/v1/countries/stats.json", "united-states", "cumulative", "deaths");

};