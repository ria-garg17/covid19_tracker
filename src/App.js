import { FormControl, MenuItem, Select, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import {sortData} from './util'
import LineGraph from './LineGraph';
import './App.css';
import 'leaflet/dist/leaflet.css';

function App() {
  // STATE = How to write a variable in react
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

  // https://disease.sh/v3/covid-19/countries

  // USEEFFECT - Runs a piece of code based on a given condition
  useEffect(() => {
    // IMP - The code inside here will run once when the component loads and not again
    // async -> send a request, wait for it, and then do something with the info

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        // map is like iterating through a loop
        const countries = data.map((country) => (
          // want only some stuff that is in the form of object from disease.sh
          {
            name: country.country,
            value: country.countryInfo.iso2         // UK, USA, INDIA
          }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);                            // In square brackets we have the consition

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;        // Grabbing the selected value from dropdown list
    setCountry(countryCode);                    // Displays the name of the selected country

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);         // All of the data from country-response
    });
  };
  // console.log("Country Info: ", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        {/* HEADER */}
        {/* TITLE + SELECT INPUT DROPDOWN FIELD */}

        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          {/* BEM naming convention is used */}
          {/* First is the component i.e in this case is app  */}
          {/* Second is the element i.e in this case is dropdown */}
          <FormControl className='app__dropdown'>
            <Select variant='outlined' onChange={onCountryChange} value={country}>
              {/* LOOP through all the countries and show a dropdown list of the options */}
              {/* Curly braces for writing JAVASCRIPT code in HTML */}

              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                // ESX Syntax
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        {/* INFO-BOXES */}
        <div className="app__stats">
          <InfoBox title='Coronavirus Cases' cases={countryInfo.todayCases} total={countryInfo.cases}/>

          <InfoBox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

          <InfoBox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          
        </div>

        {/* MAP */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          {/* TABLE */}
          <Table countries = {tableData}/>
          <h3>Worldwide new cases</h3>

          {/* GRAPH */}
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
