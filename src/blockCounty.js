import { getDataByPlaces } from './blockCountyDataPoint'
import { visTrendLine } from './visTrendLine'

export default function blockCounty() {
  getDataByPlaces("Los Angeles");
  getDataByPlaces("Lorain");
  getDataByPlaces("New York City");
  getDataByPlaces("Collier");
  getDataByPlaces("Hunterdon");
  getDataByPlaces("Cook");


  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "los-angeles-california-united-states", "cumulative", "cases");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "los-angeles-california-united-states", "cumulative", "deaths");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "lorain-ohio-united-states", "cumulative", "cases");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "lorain-ohio-united-states", "cumulative", "deaths");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "new-york-city-new-york-united-states", "cumulative", "cases");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "new-york-city-new-york-united-states", "cumulative", "deaths");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "collier-florida-united-states", "cumulative", "cases");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "collier-florida-united-states", "cumulative", "deaths");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "hunterdon-new-jersey-united-states", "cumulative", "cases");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "hunterdon-new-jersey-united-states", "cumulative", "deaths");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "cook-illinois-united-states", "cumulative", "cases");
  visTrendLine("https://coviddata.github.io/coviddata/v1/places/stats.json", "cook-illinois-united-states", "cumulative", "deaths");
  
}