import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortedData, sortData, prettyPrintStat} from './Util';
import LineGraph from './LineGraph';
import './App.css';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, [])
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
          setMapCountries(data)
          setTableData(sortData(data));

        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //console.log(countryCode);
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
        setMapZoom(3);

      })
  }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid Tracker in React js </h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country,index) => {
                  return (<MenuItem key= {index} value={country.value}>{country.name}</MenuItem>)
                })
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox isRed active = {casesType === "cases"} onClick = {e => setCasesType("cases")} title="CoronaVirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox active = {casesType === "recovered"} onClick = {e => setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox isRed active = {casesType === "deaths"} onClick = {e => setCasesType("deaths")} title="Death" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
        </div>
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>worldwide total cases </h3>
          <Table countries ={tableData}/>
          <LineGraph  casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
