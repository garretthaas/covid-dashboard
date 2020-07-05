import { getDataByPlaces } from './blockCountyDataPoint'
import { visTrendLine } from './visTrendLine'

export default function blockCounty() {
  getDataByPlaces("Los Angeles");
  getDataByPlaces("Lorain");

  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "los-angeles-california-united-states", "cumulative", "cases");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "los-angeles-california-united-states", "cumulative", "deaths");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "lorain-ohio-united-states", "cumulative", "cases");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "lorain-ohio-united-states", "cumulative", "deaths");
}